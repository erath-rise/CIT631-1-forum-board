"use client"

import { useState } from "react"
import { formatDate } from "@/src/lib/utils/formatDate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ReplyForm from "./ReplyForm"
import { MessageSquare, User, Mail, Clock, ChevronDown, ChevronUp, Reply, Trash2, AlertCircle } from "lucide-react"

export default function MessageItem({ message, onMessageUpdated, onMessageDeleted }) {
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replies, setReplies] = useState(message.replies || [])
  const [isDeleting, setIsDeleting] = useState(false)

  const handleReplyAdded = (newReply) => {
    setReplies((prev) => [...prev, newReply])
    setShowReplyForm(false)
    setShowReplies(true)
    if (onMessageUpdated) {
      onMessageUpdated()
    }
  }

  const handleDeleteMessage = async () => {
    if (!confirm("确定要删除这条消息吗？此操作不可撤销。")) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        if (onMessageDeleted) {
          onMessageDeleted(message._id)
        }
      } else {
        alert(result.message || "删除失败，请重试")
      }
    } catch (error) {
      console.error("删除消息失败:", error)
      alert("删除失败，请检查网络连接")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-semibold leading-tight">{message.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{message.author.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>{message.author.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatDate(message.createdAt)}</span>
              </div>
            </div>
          </div>
          <Button variant="destructive" size="sm" onClick={handleDeleteMessage} disabled={isDeleting} className="ml-4">
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "删除中..." : "删除"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-wrap leading-relaxed text-foreground">{message.content}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Collapsible open={showReplies} onOpenChange={setShowReplies}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {showReplies ? "隐藏回复" : `查看回复`}
                  {replies.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {replies.length}
                    </Badge>
                  )}
                  {showReplies ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>

            <Button
              variant={showReplyForm ? "secondary" : "default"}
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="mr-2 h-4 w-4" />
              {showReplyForm ? "取消回复" : "添加回复"}
            </Button>
          </div>

          {replies.length > 0 && <div className="text-sm text-muted-foreground">{replies.length} 条回复</div>}
        </div>

        {/* 回复表单 */}
        {showReplyForm && (
          <ReplyForm messageId={message._id} onReplyAdded={handleReplyAdded} onCancel={() => setShowReplyForm(false)} />
        )}

        {/* 回复列表 */}
        <Collapsible open={showReplies} onOpenChange={setShowReplies}>
          <CollapsibleContent className="space-y-3">
            {replies.length > 0 ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">回复列表</span>
                </div>
                {replies.map((reply) => (
                  <Card key={reply._id} className="bg-muted/30 border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{reply.author.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{reply.author.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(reply.createdAt)}</span>
                          </div>
                        </div>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{reply.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>还没有回复，成为第一个回复的人吧！</AlertDescription>
              </Alert>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
