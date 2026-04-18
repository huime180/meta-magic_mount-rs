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

import { For, createEffect } from "solid-js";
import { uiStore } from "../lib/stores/uiStore";
import { ICONS } from "../lib/constants";
import "./NavBar.css";
import "@material/web/icon/icon.js";
import "@material/web/ripple/ripple.js";

interface Props {
  activeTab: string;
  onTabChange: (id: string) => void;
  tabs: readonly { id: string }[];
}

export default function NavBar(props: Props) {
  let navContainer: HTMLElement | undefined;
  const tabRefs: Record<string, HTMLDivElement> = {};

  const iconMap: Record<string, { regular: string; filled: string }> = {
    status: { regular: ICONS.home, filled: ICONS.home_filled },
    config: { regular: ICONS.settings, filled: ICONS.settings_filled },
    modules: { regular: ICONS.modules, filled: ICONS.modules_filled },
    info: { regular: ICONS.info, filled: ICONS.info_filled },
  };

  createEffect(() => {
    const active = props.activeTab;
    const tab = tabRefs[active];
    if (tab && navContainer) {
      const containerWidth = navContainer.clientWidth;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.clientWidth;
      const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;
      navContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  });

  return (
    <nav class="bottom-nav" ref={navContainer}>
      <For each={props.tabs}>
        {(tab) => (
          <div
            class={`nav-tab ${props.activeTab === tab.id ? "active" : ""}`}
            onClick={() => props.onTabChange(tab.id)}
            ref={(el) => (tabRefs[tab.id] = el)}
          >
            <div class="icon-container">
              <md-icon>
                <svg viewBox="0 0 24 24">
                  <path
                    d={
                      props.activeTab === tab.id
                        ? iconMap[tab.id]?.filled
                        : iconMap[tab.id]?.regular || ICONS.description
                    }
                  />
                </svg>
              </md-icon>
            </div>
            <span class="label">
              {uiStore.L.tabs?.[tab.id as keyof typeof uiStore.L.tabs] ||
                tab.id}
            </span>
          </div>
        )}
      </For>
    </nav>
  );
}
