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

import type en from "../locales/en.json";

export type Locale = typeof en;

const localeModules = import.meta.glob("../locales/*.json", { eager: true });

export const locales: Record<string, Locale> = Object.fromEntries(
  Object.entries(localeModules).map(([path, mod]) => {
    const code = path.match(/\/([^/]+)\.json$/)?.[1] ?? "en";

    return [code, (mod as { default: Locale }).default];
  }),
);

export const availableLanguages = Object.entries(locales)
  .map(([code, locale]) => ({
    code,
    name: locale.lang.display || code.toUpperCase(),
  }))
  .sort((a, b) => {
    if (a.code === "en") {
      return -1;
    }
    if (b.code === "en") {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });
