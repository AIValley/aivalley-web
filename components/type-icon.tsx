import {
  BookOpen,
  Bot,
  Brain,
  Wand2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const TYPE_ICONS: Record<string, LucideIcon> = {
  tool: Wrench,
  model: Brain,
  agent: Bot,
  learning: BookOpen,
  skill: Wand2,
};

/** 资源类型的 SVG 图标（替代 emoji），语义装饰性，故 aria-hidden；未知类型回退通用图标 */
export function TypeIcon({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  const Icon = TYPE_ICONS[type] ?? Wrench;
  return <Icon className={className} aria-hidden="true" />;
}
