import { NextResponse } from "next/server"
import clientPromise from "@/src/lib/mongodb"
import { validateMessage, sanitizeContent } from "@/src/lib/utils/validation"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("forumdb")

    const messages = await db.collection("messages").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.error("获取消息列表失败:", error)
    return NextResponse.json(
      {
        success: false,
        message: "获取消息列表失败",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    // 数据验证
    const validation = validateMessage(body)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "数据验证失败",
          errors: validation.errors,
        },
        { status: 400 },
      )
    }
    const client = await clientPromise
    const db = client.db("forumdb")
    const newMessage = {
      title: sanitizeContent(body.title.trim()),
      content: sanitizeContent(body.content.trim()),
      author: {
        name: sanitizeContent(body.author.name.trim()),
        email: body.author.email.trim().toLowerCase(),
      },
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("messages").insertOne(newMessage)
    return NextResponse.json({
      success: true,
      data: { messageId: result.insertedId },
      message: "消息发布成功",
    })
  } catch (error) {
    console.error("发布消息失败:", error)
    return NextResponse.json(
      {
        success: false,
        message: "发布消息失败",
      },
      { status: 500 },
    )
  }
}
