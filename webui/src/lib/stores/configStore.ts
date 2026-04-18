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

import { createRoot, createSignal } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import type { AppConfig } from "../../types";
import { API } from "../api";
import { DEFAULT_CONFIG } from "../constants";
import { uiStore } from "./uiStore";

function createConfigStore() {
  const [config, setConfigStore] = createStore<AppConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = createSignal(false);
  const [saving, setSaving] = createSignal(false);

  function setConfig(next: AppConfig) {
    setConfigStore(reconcile(next));
  }

  async function loadConfig() {
    setLoading(true);
    try {
      setConfigStore(reconcile(await API.loadConfig()));
    } catch {
      uiStore.showToast(
        uiStore.L.config.loadError ?? "Failed to load config",
        "error",
      );
    }
    setLoading(false);
  }

  async function saveConfig() {
    setSaving(true);
    try {
      await API.saveConfig(config);
      uiStore.showToast(
        uiStore.L.config.saveSuccess ?? "Configuration saved",
        "success",
      );
    } catch {
      uiStore.showToast(
        uiStore.L.config.saveFailed ?? "Failed to save configuration",
        "error",
      );
    }
    setSaving(false);
  }

  return {
    get config() {
      return config;
    },
    setConfig,
    get loading() {
      return loading();
    },
    get saving() {
      return saving();
    },
    loadConfig,
    saveConfig,
  };
}

export const configStore = createRoot(createConfigStore);
