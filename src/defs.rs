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

pub const MODULE_PATH: &str = "/data/adb/modules/";
pub const IGNORE_LIST_PATH: &str = "/data/adb/magic_mount/ignore.list";
pub const SELINUX_XATTR: &str = "security.selinux";
pub const DISABLE_FILE_NAME: &str = "disable";
pub const REMOVE_FILE_NAME: &str = "remove";
pub const SKIP_MOUNT_FILE_NAME: &str = "skip_mount";
pub const REPLACE_DIR_XATTR: &str = "trusted.overlay.opaque";
pub const REPLACE_DIR_FILE_NAME: &str = ".replace";
pub const CONFIG_FILE: &str = "/data/adb/magic_mount/config.toml";
pub const MODULE_PROP: &str = "/data/adb/modules/magic_mount_rs/module.prop";
