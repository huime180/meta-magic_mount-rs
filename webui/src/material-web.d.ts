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

import type { JSX } from "solid-js";

type BaseProps = JSX.HTMLAttributes<HTMLElement>;

interface MdDialogProps extends BaseProps {
  open?: boolean;
  onclose?: (e: Event) => void;
}

interface MdTextFieldProps extends BaseProps {
  "label"?: string;
  "placeholder"?: string;
  "value"?: string;
  "error"?: boolean;
  "supporting-text"?: string;
  "disabled"?: boolean;
  "type"?: string;
  "onInput"?: (e: InputEvent) => void;
}

interface MdButtonProps extends BaseProps {
  disabled?: boolean;
  type?: string;
  href?: string;
  target?: string;
  onClick?: (e: MouseEvent) => void;
}

interface MdIconButtonProps extends BaseProps {
  disabled?: boolean;
  type?: string;
  href?: string;
  target?: string;
  onClick?: (e: MouseEvent) => void;
}

interface MdChipProps extends BaseProps {
  "label"?: string;
  "selected"?: boolean;
  "elevated"?: boolean;
  "remove-only"?: boolean;
  "on:remove"?: (e: Event) => void;
}

interface MdListItemProps extends BaseProps {
  type?: string;
  href?: string;
  target?: string;
  disabled?: boolean;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-icon": BaseProps;
      "md-icon-button": MdIconButtonProps;
      "md-filled-tonal-icon-button": MdIconButtonProps;
      "md-filled-button": MdButtonProps;
      "md-text-button": MdButtonProps;
      "md-filled-tonal-button": MdButtonProps;
      "md-outlined-text-field": MdTextFieldProps;
      "md-dialog": MdDialogProps;
      "md-linear-progress": BaseProps & {
        value?: number;
        indeterminate?: boolean;
      };
      "md-chip-set": BaseProps;
      "md-filter-chip": MdChipProps;
      "md-input-chip": MdChipProps;
      "md-ripple": BaseProps;
      "md-list": BaseProps;
      "md-list-item": MdListItemProps;
      "md-switch": BaseProps & { selected?: boolean };
      "md-divider": BaseProps;
    }
  }
}
