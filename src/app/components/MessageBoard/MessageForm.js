"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "../ui/loading-spinner"
import { Send, AlertCircle, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function MessageForm({ onMessageAdded }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
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

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      author: {
        name: "",
        email: "",
      },
    })
    setErrors({})
    setSubmitError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitError("")

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // 重置表单并关闭弹窗
        resetForm()
        setIsOpen(false)

        // 通知父组件刷新消息列表
        if (onMessageAdded) {
          onMessageAdded()
        }
      } else {
        if (result.errors) {
          setErrors(result.errors)
        } else {
          setSubmitError(result.message || "发布失败，请重试")
        }
      }
    } catch (error) {
      console.error("发布消息失败:", error)
      setSubmitError("发布失败，请检查网络连接")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (open) => {
    setIsOpen(open)
    if (!open) {
      // 关闭弹窗时重置表单
      resetForm()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-black/80">
          <Plus className="mr-2 h-4 w-4" />
          发布新想法
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border-2 border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle>发布新消息</DialogTitle>
          <DialogDescription>
            分享您的想法，与其他用户进行交流讨论
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">
              消息标题 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="请输入消息标题"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              消息内容 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="请输入消息内容"
              rows={4}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="authorName">
                您的姓名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="authorName"
                value={formData.author.name}
                onChange={(e) => handleChange("author.name", e.target.value)}
                placeholder="请输入您的姓名"
                className={errors.authorName ? "border-red-500" : ""}
              />
              {errors.authorName && <p className="text-sm text-destructive">{errors.authorName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorEmail">
                您的邮箱 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="authorEmail"
                type="email"
                value={formData.author.email}
                onChange={(e) => handleChange("author.email", e.target.value)}
                placeholder="请输入您的邮箱"
                className={errors.authorEmail ? "border-red-500" : ""}
              />
              {errors.authorEmail && <p className="text-sm text-destructive">{errors.authorEmail}</p>}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px] bg-black text-white hover:bg-black/80"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  发布中...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  发布消息
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
