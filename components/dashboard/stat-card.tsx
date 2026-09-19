import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="glass rounded-xl p-5">
      <div
        className={cn(
          "text-3xl font-bold",
          accent ? "text-gradient" : "text-foreground"
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
