"use client";

import { useServerInsertedHTML } from "next/navigation";

const THEME_SCRIPT = `(function(){try{document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') !== 'light' ? 'dark' : 'light');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

/**
 * Injects the no-flash theme script outside the React component tree,
 * so React 19 never sees a <script> element and doesn't emit its
 * "Encountered a script tag while rendering" warning.
 */
export function ThemeInit() {
  useServerInsertedHTML(() => (
    <script key="theme-init" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
  ));
  return null;
}
