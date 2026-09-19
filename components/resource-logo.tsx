import {
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Clapperboard,
  Code,
  FileText,
  FlaskConical,
  Gem,
  GitBranch,
  GraduationCap,
  Headphones,
  Image,
  Landmark,
  Link,
  MessageSquare,
  Mic,
  Music,
  Palette,
  PenLine,
  Plug,
  Puzzle,
  Rocket,
  Search,
  Sparkles,
  Star,
  Terminal,
  Users,
  Wand2,
  Waves,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { TypeIcon } from "./type-icon";

/** 资源 logo 的语义键 → Lucide 图标（统一描边风格，替代 emoji） */
const LOGO_ICONS: Record<string, LucideIcon> = {
  chat: MessageSquare,
  sparkles: Sparkles,
  star: Star,
  search: Search,
  palette: Palette,
  image: Image,
  video: Clapperboard,
  git: GitBranch,
  code: Code,
  writing: PenLine,
  mic: Mic,
  music: Music,
  brain: Brain,
  audio: Headphones,
  link: Link,
  workflow: Workflow,
  users: Users,
  bot: Bot,
  puzzle: Puzzle,
  plug: Plug,
  terminal: Terminal,
  graduation: GraduationCap,
  book: BookOpen,
  chart: BarChart3,
  file: FileText,
  flask: FlaskConical,
  landmark: Landmark,
  zap: Zap,
  waves: Waves,
  rocket: Rocket,
  gem: Gem,
  wand: Wand2,
};

/** 渲染资源 logo：优先用 logo 语义键匹配图标，缺失时回退到类型图标 */
export function ResourceLogo({
  logo,
  type,
  className,
}: {
  logo: string | null;
  type: string;
  className?: string;
}) {
  const Icon = logo ? LOGO_ICONS[logo] : undefined;
  if (Icon) return <Icon className={className} aria-hidden="true" />;
  return <TypeIcon type={type} className={className} />;
}
