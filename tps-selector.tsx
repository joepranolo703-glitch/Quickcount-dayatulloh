"use client"

import { TPSData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TPSSelectorProps {
  tpsData: TPSData[]
  selectedTPS: number
  onSelect: (id: number) => void
}

export function TPSSelector({ tpsData, selectedTPS, onSelect }: TPSSelectorProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-17 gap-2">
      {tpsData.map((tps) => {
        const hasData = tps.calon1 + tps.calon2 + tps.tidakSah > 0
        const isSelected = selectedTPS === tps.id

        return (
          <button
            key={tps.id}
            onClick={() => onSelect(tps.id)}
            className={cn(
              "relative p-3 rounded-lg font-medium text-sm transition-all duration-200",
              "border border-border hover:border-primary/50",
              isSelected
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                : hasData
                ? "bg-accent/20 text-accent border-accent/30"
                : "bg-card text-muted-foreground hover:bg-secondary"
            )}
          >
            {tps.id}
            {hasData && !isSelected && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
            )}
          </button>
        )
      })}
    </div>
  )
}
