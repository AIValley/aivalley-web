"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  changePassword,
  updateProfile,
  type ActionResult,
} from "@/lib/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function AccountClient({
  currentName,
}: {
  currentName: string | null;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [profileState, profileAction, profilePending] = useActionState<
    ActionResult,
    FormData
  >(updateProfile, { ok: true });
  const [pwState, pwAction, pwPending] = useActionState<ActionResult, FormData>(
    changePassword,
    { ok: true }
  );

  return (
    <div className="space-y-6">
      <section className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold">
          {t("dashboard.account.profile")}
        </h2>
        <form action={profileAction} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              {t("dashboard.account.name")}
            </label>
            <Input name="name" defaultValue={currentName ?? ""} />
          </div>
          {profileState.message && (
            <p
              className={
                profileState.ok ? "text-sm text-green-400" : "text-sm text-red-400"
              }
            >
              {profileState.message}
            </p>
          )}
          <Button type="submit" disabled={profilePending}>
            {t("dashboard.account.save")}
          </Button>
        </form>
      </section>

      <section className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold">
          {t("dashboard.account.password")}
        </h2>
        <form action={pwAction} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              {t("dashboard.account.currentPassword")}
            </label>
            <Input
              name="currentPassword"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              {t("dashboard.account.newPassword")}
            </label>
            <Input
              name="newPassword"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          {pwState.message && (
            <p
              className={
                pwState.ok ? "text-sm text-green-400" : "text-sm text-red-400"
              }
            >
              {pwState.message}
            </p>
          )}
          <Button type="submit" disabled={pwPending}>
            {t("dashboard.account.changePassword")}
          </Button>
        </form>
      </section>
    </div>
  );
}
