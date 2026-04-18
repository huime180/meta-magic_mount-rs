// Copyright (C) 2026 Tools-cx-app <localhost.hutao@gmail.com>
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

use std::{
    path::Path,
    sync::{LazyLock, Mutex, atomic::AtomicBool},
};

#[cfg(any(target_os = "linux", target_os = "android"))]
use anyhow::Result;
#[cfg(any(target_os = "linux", target_os = "android"))]
use ksu::{TryUmount, TryUmountFlags};

static KSU: AtomicBool = AtomicBool::new(false);

pub fn check_ksu() {
    let status = ksu::version().is_some_and(|v| {
        log::info!("KernelSU Version: {v}");
        true
    });

    KSU.store(status, std::sync::atomic::Ordering::Relaxed);
}

static FLAG: AtomicBool = AtomicBool::new(false);
static LIST: LazyLock<Mutex<TryUmount>> = LazyLock::new(|| Mutex::new(TryUmount::new()));

pub fn send_unmountable<P>(target: P)
where
    P: AsRef<Path>,
{
    if !KSU.load(std::sync::atomic::Ordering::Relaxed) {
        return;
    }

    if FLAG.load(std::sync::atomic::Ordering::Relaxed) {
        return;
    }

    LIST.lock().unwrap().add(target);
}

#[cfg(any(target_os = "linux", target_os = "android"))]
pub fn unmount() -> Result<()> {
    if KSU.load(std::sync::atomic::Ordering::Relaxed) {
        let mut control = LIST.lock().unwrap();

        control.flags(TryUmountFlags::MNT_DETACH);
        control.format_msg(|p| format!("umount {p:?} successful"));
        control.umount()?;
    }

    Ok(())
}
