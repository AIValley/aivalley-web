"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { deleteUser, setUserRole } from "@/lib/actions";

export type UserItem = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
};

export function UsersClient({
  items,
  currentUserId,
}: {
  items: UserItem[];
  currentUserId: string;
}) {
  const t = useTranslations();
  const router = useRouter();
  const [, startTransition] = useTransition();

  function run(fn: () => Promise<unknown>) {
    startTransition(async () => {
      await fn();
      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      {items.map((u) => (
        <div
          key={u.id}
          className="glass flex items-center justify-between gap-3 rounded-xl p-4"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {u.email}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {u.name ?? "—"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              {u.role === "ADMIN"
                ? t("dashboard.users.roleAdmin")
                : t("dashboard.users.roleUser")}
            </span>
            {u.id !== currentUserId && (
              <>
                <button
                  onClick={() =>
                    run(() =>
                      setUserRole(u.id, u.role === "ADMIN" ? "USER" : "ADMIN")
                    )
                  }
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-foreground/5"
                >
                  {u.role === "ADMIN"
                    ? t("dashboard.users.makeUser")
                    : t("dashboard.users.makeAdmin")}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(t("dashboard.users.confirmDelete")))
                      run(() => deleteUser(u.id));
                  }}
                  className="rounded-lg border border-rose-400/30 px-3 py-1.5 text-xs text-rose-300 transition-colors hover:bg-rose-400/10"
                >
                  {t("dashboard.users.delete")}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
