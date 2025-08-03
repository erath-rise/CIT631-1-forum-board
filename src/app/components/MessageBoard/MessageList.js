"use client"

import { useState, useEffect } from "react"
import MessageItem from "./MessageItem"
import { LoadingCard } from "../ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, RefreshCw, AlertCircle, Inbox } from "lucide-react"

export default function MessageList({ refreshTrigger }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/messages", {
        cache: "no-store",
      })

      const result = await response.json()

      if (result.success) {
        setMessages(result.data)
      } else {
        setError(result.message || "获取消息列表失败")
      }
    } catch (error) {
      console.error("获取消息列表失败:", error)
      setError("获取消息列表失败，请检查网络连接")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [refreshTrigger])

  const handleMessageDeleted = (messageId) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== messageId))
  }

  const handleMessageUpdated = () => {
    fetchMessages()
  }

  if (loading) {
    return <LoadingCard text="正在加载消息列表..." />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={fetchMessages} className="ml-4 bg-transparent">
            <RefreshCw className="mr-2 h-4 w-4" />
            重试
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">还没有任何消息</h3>
          <p className="text-muted-foreground mb-4">成为第一个发布消息的人吧！</p>
          <Button onClick={fetchMessages} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新列表
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">留言板</h2>
        </div>
        <Button variant="outline" size="sm" onClick={fetchMessages}>
          <RefreshCw className="mr-2 h-4 w-4" />
          刷新
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={message._id}
            className="animate-in slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MessageItem
              message={message}
              onMessageUpdated={handleMessageUpdated}
              onMessageDeleted={handleMessageDeleted}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
