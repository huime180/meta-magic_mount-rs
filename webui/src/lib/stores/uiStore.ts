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

import { createMemo, createRoot, createSignal } from "solid-js";

import type { LanguageOption, ToastMessage } from "../../types";
import { availableLanguages, locales } from "../i18n";

function createUiStore() {
  const [lang, setLangSignal] = createSignal("en");
  const [toast, setToast] = createSignal<ToastMessage>({
    id: "init",
    text: "",
    type: "info",
    visible: false,
  });
  const [isReady, setIsReady] = createSignal(false);

  const L = createMemo(() => locales[lang()] ?? locales.en);
  const toasts = createMemo(() => {
    const t = toast();

    return t.visible ? [t] : [];
  });

  function showToast(text: string, type: ToastMessage["type"] = "info"): void {
    const id = Date.now().toString();
    setToast({ id, text, type, visible: true });
    setTimeout(() => {
      if (toast().id === id) {
        setToast((prev) => ({ ...prev, visible: false }));
      }
    }, 3000);
  }

  function setLang(code: string) {
    setLangSignal(code);
    localStorage.setItem("mm-lang", code);
  }

  async function init() {
    const savedLang = localStorage.getItem("mm-lang") ?? "en";
    setLangSignal(savedLang);
    localStorage.removeItem("mm-fix-nav");
    setIsReady(true);
  }

  return {
    get lang() {
      return lang();
    },
    get availableLanguages(): LanguageOption[] {
      return availableLanguages;
    },
    get L() {
      return L();
    },
    get toasts() {
      return toasts();
    },
    get isReady() {
      return isReady();
    },
    showToast,
    setLang,
    init,
  };
}

export const uiStore = createRoot(createUiStore);
