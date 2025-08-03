"use client"

import { useState } from "react"
import MessageList from "./components/MessageBoard/MessageList"
import MessageForm from "./components/MessageBoard/MessageForm"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleMessageAdded = () => {
    // 触发消息列表刷新
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-4xl font-bold text-black">
            欢迎来到前端学习论坛
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          在这里分享您的学习经验，与其他用户进行交流讨论。让我们一起构建一个友好的社区！
        </p>
      </div>

      <Separator />

      <div className="flex justify-center">
        <MessageForm onMessageAdded={handleMessageAdded} />
      </div>

      <Separator />

      <MessageList refreshTrigger={refreshTrigger} />
    </div>
  )
}
