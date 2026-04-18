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

import { For, Show } from "solid-js";

import { ICONS } from "../lib/constants";
import { uiStore } from "../lib/stores/uiStore";

import "./TopBar.css";
import "@material/web/icon/icon.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/dialog/dialog.js";
import "@material/web/list/list.js";
import "@material/web/list/list-item.js";
import "@material/web/button/text-button.js";

interface MdDialogElement extends HTMLElement {
  show: () => void;
  close: () => void;
}

export default function TopBar() {
  let langDialogRef: MdDialogElement | undefined;

  function openLangDialog() {
    langDialogRef?.show();
  }

  function closeLangDialog() {
    langDialogRef?.close();
  }

  function setLang(code: string) {
    uiStore.setLang(code);
    closeLangDialog();
  }

  return (
    <>
      <header class="top-bar">
        <div class="top-bar-content">
          <h1 class="screen-title">{uiStore.L?.common?.appName}</h1>
          <div class="top-actions">
            <md-icon-button
              onClick={openLangDialog}
              title={uiStore.L?.common?.language}
            >
              <md-icon>
                <svg viewBox="0 0 24 24">
                  <path d={ICONS.translate} />
                </svg>
              </md-icon>
            </md-icon-button>
          </div>
        </div>
      </header>

      <div class="dialog-container">
        <md-dialog ref={langDialogRef} class="lang-dialog">
          <div slot="headline">{uiStore.L.common.language}</div>

          <div slot="content" class="lang-list-container">
            <md-list>
              <For each={uiStore.availableLanguages}>
                {(l) => (
                  <md-list-item
                    class="lang-option"
                    type="button"
                    onClick={() => setLang(l.code)}
                  >
                    <div slot="headline">{l.name}</div>
                    <Show when={uiStore.lang === l.code}>
                      <md-icon slot="end">
                        <svg viewBox="0 0 24 24">
                          <path d={ICONS.check} />
                        </svg>
                      </md-icon>
                    </Show>
                  </md-list-item>
                )}
              </For>
            </md-list>
          </div>

          <div slot="actions">
            <md-text-button onClick={closeLangDialog}>
              {uiStore.L.common.cancel}
            </md-text-button>
          </div>
        </md-dialog>
      </div>
    </>
  );
}
