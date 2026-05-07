import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  variant?: "default" | "primary" | "destructive" | "accent"
}

export function StatsCard({ title, value, icon: Icon, variant = "default" }: StatsCardProps) {
  const variants = {
    default: "text-foreground",
    primary: "text-primary",
    destructive: "text-destructive",
    accent: "text-accent",
  }

  return (
    <Card className="border-border bg-card hover:bg-card/80 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold ${variants[variant]}`}>
              {typeof value === "number" ? value.toLocaleString("id-ID") : value}
            </p>
          </div>
          <div className={`p-3 rounded-lg bg-secondary ${variants[variant]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
