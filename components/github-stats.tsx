"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, GitFork, RefreshCw, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { refreshSkillGithubStats } from "@/lib/actions";

export function GithubStats({
  resourceId,
  githubRepo,
  githubStars,
  githubForks,
  canRefresh,
}: {
  resourceId: string;
  githubRepo: string | null;
  githubStars: number | null;
  githubForks: number | null;
  canRefresh: boolean;
}) {
  const t = useTranslations();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onRefresh() {
    if (pending) return;
    setPending(true);
    await refreshSkillGithubStats(resourceId);
    setPending(false);
    router.refresh();
  }

  const repoUrl = githubRepo ? `https://github.com/${githubRepo}` : null;

  return (
    <div className="glass rounded-xl p-4">
      <h2 className="text-sm font-semibold text-muted-foreground">
        {t("skill.github")}
      </h2>

      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary"
        >
          <GitBranch className="size-4" />
          <span className="font-mono">{githubRepo}</span>
        </a>
      )}

      <div className="mt-3 flex items-center gap-4">
        <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
          <Star className="size-4 text-amber-300" />
          <span className="font-medium">{githubStars ?? "—"}</span>
          <span className="text-muted-foreground">{t("skill.stars")}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
          <GitFork className="size-4 text-muted-foreground" />
          <span className="font-medium">{githubForks ?? "—"}</span>
          <span className="text-muted-foreground">{t("skill.forks")}</span>
        </span>
      </div>

      {canRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={pending}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw className={pending ? "size-3.5 animate-spin" : "size-3.5"} />
          {t("skill.refresh")}
        </button>
      )}
    </div>
  );
}
