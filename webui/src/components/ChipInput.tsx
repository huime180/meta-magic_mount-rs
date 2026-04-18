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

import { For, Show, createSignal } from "solid-js";

import "@material/web/chips/chip-set.js";
import "@material/web/chips/input-chip.js";
import "@material/web/icon/icon.js";
import "@material/web/iconbutton/icon-button.js";
import "./ChipInput.css";

interface Props {
  values: string[];
  placeholder?: string;
  onValuesChange: (newValues: string[]) => void;
}

export default function ChipInput(props: Props) {
  const [inputValue, setInputValue] = createSignal("");
  let inputRef: any = null;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addChip();
    } else if (
      e.key === "Backspace" &&
      inputValue() === "" &&
      props.values.length > 0
    ) {
      removeChip(props.values.length - 1);
    }
  }

  function addChip() {
    const val = inputValue().trim();
    if (val) {
      if (!props.values.includes(val)) {
        const newValues = [...props.values, val];
        props.onValuesChange(newValues);
      }
      setInputValue("");
    }
  }

  function removeChip(index: number) {
    const newValues = props.values.filter((_, i) => i !== index);
    props.onValuesChange(newValues);
  }

  return (
    <div class="chip-input-wrapper">
      <md-chip-set
        classList={{ "chip-set-has-values": props.values.length > 0 }}
      >
        <For each={props.values}>
          {(val, i) => (
            <md-input-chip
              label={val}
              remove-only
              on:remove={() => removeChip(i())}
            />
          )}
        </For>
      </md-chip-set>

      <div class="input-row">
        <input
          ref={(el) => (inputRef = el)}
          type="text"
          class="chip-input-field"
          value={inputValue()}
          onInput={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          onBlur={addChip}
          onFocus={() => {
            setTimeout(() => {
              inputRef?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
          }}
          placeholder={props.placeholder ?? "Add item..."}
          enterkeyhint="done"
        />
        <Show when={inputValue().trim().length > 0}>
          <md-icon-button onClick={addChip} class="add-btn" title="Add tag">
            <md-icon>
              <svg viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            </md-icon>
          </md-icon-button>
        </Show>
      </div>
    </div>
  );
}
