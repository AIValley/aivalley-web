"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

function readStoredTheme(): "light" | "dark" {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeToggle() {
  const t = useTranslations();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // 首次加载和每次路由变化（如切换语言）时，从 localStorage 恢复主题，
  // 避免导航后主题被重置回默认深色。
  useEffect(() => {
    const next = readStoredTheme();
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  }, [pathname]);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage 不可用时忽略（如隐私模式）
    }
    setTheme(next);
  }

  const isDark = theme === "dark";
  const label = isDark ? t("theme.toLight") : t("theme.toDark");

  return (
    <button
      type="button"
      onClick={toggle}
      title={label}
      aria-label={label}
      className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
