/*
 * Copyright (C) 2026 Tools-cx-app <localhost.hutao@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

export interface AppConfig {
  mountsource: string;
  umount: boolean;
  partitions: string[];
  ignoreList: string[];
}

export interface Module {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  is_mounted: boolean;
}

export interface SystemInfo {
  kernel: string;
  selinux: string;
}

export interface DeviceInfo {
  model: string;
}

export type ToastType = "info" | "success" | "error";

export interface ToastMessage {
  id: string;
  text: string;
  type: ToastType;
  visible: boolean;
}

export interface LanguageOption {
  code: string;
  name: string;
}

export interface AppAPI {
  loadConfig: () => Promise<AppConfig>;
  saveConfig: (config: AppConfig) => Promise<void>;
  scanModules: () => Promise<Module[]>;
  getSystemInfo: () => Promise<SystemInfo>;
  getDeviceStatus: () => Promise<DeviceInfo>;
  getVersion: () => Promise<string>;
  openLink: (url: string) => Promise<void>;
  reboot: () => Promise<void>;
}
