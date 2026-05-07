"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus } from "lucide-react"

interface CounterCardProps {
  title: string
  value: number
  onIncrement: () => void
  onDecrement: () => void
  variant?: "primary" | "destructive" | "muted"
}

export function CounterCard({
  title,
  value,
  onIncrement,
  onDecrement,
  variant = "primary",
}: CounterCardProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    muted: "bg-muted text-muted-foreground hover:bg-muted/80",
  }

  const textVariants = {
    primary: "text-primary",
    destructive: "text-destructive",
    muted: "text-muted-foreground",
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4 space-y-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onDecrement}
            className="h-12 w-12 rounded-lg border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
          >
            <Minus className="w-5 h-5" />
          </Button>
          <span className={`text-3xl font-bold ${textVariants[variant]}`}>
            {value.toLocaleString("id-ID")}
          </span>
          <Button
            onClick={onIncrement}
            size="icon"
            className={`h-12 w-12 rounded-lg ${variants[variant]}`}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
