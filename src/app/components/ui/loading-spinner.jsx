import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function LoadingSpinner({ className, ...props }) {
  return <Loader2 className={cn("h-4 w-4 animate-spin", className)} {...props} />
}

export function LoadingCard({ text = "加载中..." }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center space-x-2">
        <LoadingSpinner className="h-5 w-5" />
        <span className="text-sm text-muted-foreground">{text}</span>
      </div>
    </div>
  )
}
