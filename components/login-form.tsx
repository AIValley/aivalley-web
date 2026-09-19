"use client";

import { useState, useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { login, register, type ActionResult } from "@/lib/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function LoginForm() {
  const t = useTranslations();
  const locale = useLocale();
  const [mode, setMode] = useState<"login" | "register">("login");
  const action = mode === "login" ? login : register;
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    action,
    { ok: true }
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />

      {mode === "register" && (
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">
            {t("login.name")}
          </label>
          <Input name="name" placeholder={t("login.name")} />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">
          {t("login.email")}
        </label>
        <Input name="email" type="email" required placeholder="you@example.com" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground">
          {t("login.password")}
        </label>
        <Input
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="••••••••"
        />
      </div>

      {!state.ok && state.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {mode === "login" ? t("login.submit") : t("login.register")}
      </Button>

      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="block w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {mode === "login"
          ? t("login.switchToRegister")
          : t("login.switchToLogin")}
      </button>
    </form>
  );
}
