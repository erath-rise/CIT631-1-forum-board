import { LoadingCard } from "./components/ui/loading-spinner"

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingCard text="正在加载页面..." />
    </div>
  )
}
