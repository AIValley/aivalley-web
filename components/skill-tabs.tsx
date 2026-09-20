"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FileText, Tag } from "lucide-react";
import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";

type TabKey = "skillMd" | "files" | "versions";

export function SkillTabs({
  skillMd,
  files,
  versions,
}: {
  skillMd: string | null;
  files: string[];
  versions: string[];
}) {
  const t = useTranslations();
  const [active, setActive] = useState<TabKey>("skillMd");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "skillMd", label: t("skill.tabs.skillMd") },
    { key: "files", label: t("skill.tabs.files") },
    { key: "versions", label: t("skill.tabs.versions") },
  ];

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            aria-pressed={active === tab.key}
            className={cn(
              "relative px-3 py-2 text-sm font-medium transition-colors",
              active === tab.key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {active === tab.key && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {active === "skillMd" &&
          (skillMd ? (
            <Markdown content={skillMd} />
          ) : (
            <p className="text-sm text-muted-foreground">
              {t("skill.emptySkillMd")}
            </p>
          ))}

        {active === "files" &&
          (files.length > 0 ? (
            <ul className="space-y-1.5">
              {files.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-foreground/90"
                >
                  <FileText className="size-4 text-muted-foreground" />
                  <code className="text-xs">{f}</code>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              {t("skill.emptyFiles")}
            </p>
          ))}

        {active === "versions" &&
          (versions.length > 0 ? (
            <ul className="space-y-1.5">
              {versions.map((v) => (
                <li
                  key={v}
                  className="flex items-center gap-2 text-sm text-foreground/90"
                >
                  <Tag className="size-4 text-muted-foreground" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              {t("skill.emptyVersions")}
            </p>
          ))}
      </div>
    </div>
  );
}
