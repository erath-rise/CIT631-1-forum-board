import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/src/lib/mongodb"
import { validateReply, sanitizeContent } from "@/src/lib/utils/validation"

export async function POST(request, { params }) {
  try {
    const body = await request.json()

    // 数据验证
    const validation = validateReply(body)
    if (!validation.isValid) {
      return NextResponse.json({success: false,message: "数据验证失败",errors: validation.errors}, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("forumdb")

    const reply = {
      _id: new ObjectId(),
      content: sanitizeContent(body.content.trim()),
      author: {
        name: sanitizeContent(body.author.name.trim()),
        email: body.author.email.trim().toLowerCase(),
      },
      createdAt: new Date(),
    }

    const result = await db.collection("messages").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $push: { replies: reply },
        $set: { updatedAt: new Date() },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({success: false,message: "消息不存在"}, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "回复成功",
      data: reply,
    })
  } catch (error) {
    console.error("回复失败:", error)
    return NextResponse.json({success: false,message: "回复失败"}, { status: 500 })
  }
}
