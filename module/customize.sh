#!/system/bin/sh
# Copyright (C) 2026 Tools-cx-app <localhost.hutao@gmail.com>
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

if [ -z "$APATCH" ] && [ -z "$KSU" ]; then
  abort "! unsupported root platform"
fi

if [ -n "$KSU_LATE_LOAD" ] && [ -n "$KSU" ]; then
  abort "! unsupported late load mode"
fi

VERSION=$(grep_prop version "${MODPATH}/module.prop")
ui_print "- mmrs version ${VERSION}"

ui_print "- Detecting device architecture..."

ABI=$(getprop ro.product.cpu.abi)

if [ -z "$ABI" ]; then
  abort "! Failed to detect device architecture"
fi

ui_print "- Device platform: $ABI"

case "$ABI" in
arm64-v8a)
  ui_print "- Selected architecture: arm64-v8a"
  ARCH_BINARY="magic_mount_rs.aarch64"
  ;;
armeabi-v7a)
  ui_print "- Selected architecture: armeabi-v7a"
  ARCH_BINARY="magic_mount_rs.armv7"
  ;;
*)
  abort "! Unsupported platform: $ABI"
  ;;
esac

ui_print "- Installing architecture-specific binary"

# Rename the selected binary to the generic name
mv "$MODPATH/bin/$ARCH_BINARY" "$MODPATH/meta-mm" || abort "! Failed to rename binary"
rm -rf "$MODPATH/bin"

# Ensure the binary is executable
chmod 755 "$MODPATH/meta-mm" || abort "! Failed to set permissions"

ui_print "- mmrs binary installed"

mkdir -p "/data/adb/magic_mount"

if [ ! -f "/data/adb/magic_mount/config.toml" ]; then
  ui_print "- Add default config"
  if [ -n "${APATCH:-}" ]; then
    cat "$MODPATH/config_apatch.toml" >"/data/adb/magic_mount/config.toml"
  fi

  if [ -n "${KSU:-}" ]; then
    cat "$MODPATH/config.toml" >"/data/adb/magic_mount/config.toml"
  fi

fi

rm -f "$MODPATH/config_apatch.toml"

ui_print "- Installation complete"
ui_print "- Welcome to mmrs!"
