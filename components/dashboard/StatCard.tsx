import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
  period?: string;
  periodLabel?: string;
  iconBg?: string;
  iconColor?: string;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  change = "+0%",
  trend = "up",
  period = "month",
  periodLabel,
  iconBg = "#F3E8D4",
  iconColor = "#0F3028",
  color,
}: StatCardProps) {
  const isUp = trend === "up";
  const isDown = trend === "down";

  const displayPeriodLabel = periodLabel ?? `vs last ${period}`;

  return (
    <div
      className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      style={{
        background: "#FFFFFF",
        borderColor: "#E7DDD0",
        boxShadow: "0 1px 4px rgba(16,44,38,0.06)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#8A7E72" }}>
            {title}
          </p>
          <h2
            className="text-4xl font-black"
            style={{ color: "#0F3028", fontFamily: "var(--font-manrope)" }}
          >
            {value}
          </h2>
          <div className="flex items-center gap-1.5 pt-1">
            {isUp && <TrendingUp className="h-3.5 w-3.5" style={{ color: "#6B8F71" }} />}
            {isDown && <TrendingDown className="h-3.5 w-3.5" style={{ color: "#B85C3C" }} />}
            <span
              className="text-xs font-bold"
              style={{ color: isUp ? "#6B8F71" : isDown ? "#B85C3C" : "#8A7E72" }}
            >
              {change}
            </span>
            <span className="text-xs font-medium" style={{ color: "#8A7E72" }}>
              {displayPeriodLabel}
            </span>
          </div>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color ?? ""}`}
          style={color ? undefined : { background: iconBg }}
        >
          <div style={color ? undefined : { color: iconColor }}>{icon}</div>
        </div>
      </div>
    </div>
  );
}