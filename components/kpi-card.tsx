import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  trend?: "up" | "down" | "neutral"
}

export function KPICard({ title, value, change, changeLabel, icon: Icon, trend = "neutral" }: KPICardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
        {Icon && (
          <div className="p-2 bg-secondary rounded-md">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-4 flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === "up" && "text-success",
              trend === "down" && "text-destructive",
              trend === "neutral" && "text-muted-foreground",
            )}
          >
            <TrendIcon className="h-4 w-4" />
            <span>
              {change > 0 ? "+" : ""}
              {change.toFixed(1)}%
            </span>
          </div>
          {changeLabel && <span className="text-sm text-muted-foreground">{changeLabel}</span>}
        </div>
      )}
    </div>
  )
}
