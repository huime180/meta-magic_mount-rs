export type MountMode = "magic" | "overlay" | "ignore";

export interface AppConfig {
  mountsource: string;
  umount: boolean;
  partitions: string[];
  ignoreList: string[];
}

export interface ModuleRules {
  default_mode: MountMode | string;
  paths: Record<string, unknown>;
}

export interface Module {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  is_mounted: boolean;
  mode: MountMode | string;
  disabledByFlag?: boolean;
  skipMount?: boolean;
  rules: ModuleRules;
}

export interface StorageStatus {
  used: string;
  size: string;
  percent: string;
  type: string | null;
}

export interface SystemInfo {
  kernel: string;
  selinux: string;
  mountBase: string;
  activeMounts: string[];
}

export interface DeviceInfo {
  model: string;
  android: string;
  kernel: string;
  selinux: string;
}

export interface ModeStats {
  overlay: number;
  magic: number;
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
  getStorageUsage: () => Promise<StorageStatus>;
  getSystemInfo: () => Promise<SystemInfo>;
  getDeviceStatus: () => Promise<DeviceInfo>;
  getVersion: () => Promise<string>;
  openLink: (url: string) => Promise<void>;
  reboot: () => Promise<void>;
}
