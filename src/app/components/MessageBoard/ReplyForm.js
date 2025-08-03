"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "../ui/loading-spinner"
import { Reply, AlertCircle, X } from "lucide-react"

export default function ReplyForm({ messageId, onReplyAdded, onCancel }) {
  const [formData, setFormData] = useState({
    content: "",
    author: {
      name: "",
      email: "",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState("")

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    // 清除对应字段的错误
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
    setSubmitError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitError("")

    try {
      const response = await fetch(`/api/messages/${messageId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // 重置表单
        setFormData({
          content: "",
          author: {
            name: "",
            email: "",
          },
        })

        // 通知父组件刷新
        if (onReplyAdded) {
          onReplyAdded(result.data)
        }
      } else {
        if (result.errors) {
          setErrors(result.errors)
        } else {
          setSubmitError(result.message || "回复失败，请重试")
        }
      }
    } catch (error) {
      console.error("回复失败:", error)
      setSubmitError("回复失败，请检查网络连接")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mt-4 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center space-x-2">
            <Reply className="h-4 w-4" />
            <span>添加回复</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="replyContent">
              回复内容 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="replyContent"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="请输入回复内容"
              rows={3}
              className={errors.content ? "border-destructive" : ""}
            />
            {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="replyAuthorName">
                您的姓名 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="replyAuthorName"
                value={formData.author.name}
                onChange={(e) => handleChange("author.name", e.target.value)}
                placeholder="请输入您的姓名"
                className={errors.authorName ? "border-destructive" : ""}
              />
              {errors.authorName && <p className="text-sm text-destructive">{errors.authorName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="replyAuthorEmail">
                您的邮箱 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="replyAuthorEmail"
                type="email"
                value={formData.author.email}
                onChange={(e) => handleChange("author.email", e.target.value)}
                placeholder="请输入您的邮箱"
                className={errors.authorEmail ? "border-destructive" : ""}
              />
              {errors.authorEmail && <p className="text-sm text-destructive">{errors.authorEmail}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  提交中...
                </>
              ) : (
                <>
                  <Reply className="mr-2 h-4 w-4" />
                  提交回复
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
