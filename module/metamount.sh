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

# meta-overlayfs Module Mount Handler
# This script is the entry point for dual-directory module mounting

MODDIR="${0%/*}"

# Binary path (architecture-specific binary selected during installation)
BINARY="$MODDIR/meta-mm"

if [ ! -f "$BINARY" ]; then
  log "ERROR: Binary not found: $BINARY"
  exit 1
fi

nohup $BINARY 2>&1

EXIT_CODE=$?

if [ "$EXIT_CODE" = 0 ]; then
  /data/adb/ksud kernel notify-module-mounted
fi

exit 0
