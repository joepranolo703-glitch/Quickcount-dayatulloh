interface ProgressBarProps {
  label: string
  percentage: number
  variant?: "primary" | "destructive"
}

export function ProgressBar({ label, percentage, variant = "primary" }: ProgressBarProps) {
  const variants = {
    primary: "bg-primary",
    destructive: "bg-destructive",
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-lg font-bold text-foreground">{percentage}%</span>
      </div>
      <div className="h-4 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${variants[variant]} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}
