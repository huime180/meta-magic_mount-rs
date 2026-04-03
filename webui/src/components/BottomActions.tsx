/**
 * Copyright 2025 Meta-Hybrid Mount Authors SPDX-License-Identifier:
 * GPL-3.0-or-later
 */

import type { ParentProps } from "solid-js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";

import "./BottomActions.css";

export default function BottomActions(props: ParentProps) {
  const [isActivePage, setIsActivePage] = createSignal(true);
  const [keyboardLift, setKeyboardLift] = createSignal(0);
  let anchorRef: HTMLDivElement | undefined;
  let rootRef: HTMLDivElement | undefined;

  function parsePixels(value: string): number {
    const parsed = Number.parseFloat(value);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  function getStaticBottomOffset(): number {
    const styles = window.getComputedStyle(document.documentElement);
    const navHeight = parsePixels(
      styles.getPropertyValue("--bottom-nav-height"),
    );
    const safeAreaBottom = parsePixels(
      styles.getPropertyValue("--safe-area-inset-bottom") ||
        styles.getPropertyValue("--window-inset-bottom"),
    );

    return navHeight + safeAreaBottom;
  }

  onMount(() => {
    const pageEl = anchorRef?.closest(".swipe-page");
    const rootEl = anchorRef?.closest(".main-content");
    if (!pageEl || !rootEl) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActivePage(entry.isIntersecting && entry.intersectionRatio >= 0.6);
      },
      {
        root: rootEl,
        threshold: [0.6],
      },
    );

    observer.observe(pageEl);
    onCleanup(() => observer.disconnect());
  });

  onMount(() => {
    const viewport = window.visualViewport;
    if (!viewport) {
      return;
    }
    const activeViewport = viewport;

    let rafId = 0;

    function updateKeyboardInset() {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const keyboardInset = Math.max(
          0,
          Math.round(
            window.innerHeight -
              activeViewport.height -
              activeViewport.offsetTop,
          ),
        );
        const nextLift = Math.max(
          0,
          keyboardInset - Math.round(getStaticBottomOffset()),
        );

        setKeyboardLift((prev) =>
          Math.abs(prev - nextLift) < 2 ? prev : nextLift,
        );
      });
    }

    updateKeyboardInset();
    activeViewport.addEventListener("resize", updateKeyboardInset);
    activeViewport.addEventListener("scroll", updateKeyboardInset);
    window.addEventListener("orientationchange", updateKeyboardInset);

    onCleanup(() => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      activeViewport.removeEventListener("resize", updateKeyboardInset);
      activeViewport.removeEventListener("scroll", updateKeyboardInset);
      window.removeEventListener("orientationchange", updateKeyboardInset);
    });
  });

  createEffect(() => {
    if (!rootRef) {
      return;
    }

    rootRef.style.setProperty(
      "--bottom-actions-keyboard-lift",
      `${keyboardLift()}px`,
    );
    rootRef.toggleAttribute("inert", !isActivePage());
  });

  return (
    <>
      <div class="bottom-actions-anchor" ref={anchorRef} aria-hidden="true" />
      <Portal>
        <div
          ref={rootRef}
          class="bottom-actions-root"
          classList={{ "is-active": isActivePage() }}
        >
          {props.children}
        </div>
      </Portal>
    </>
  );
}
