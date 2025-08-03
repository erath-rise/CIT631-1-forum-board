import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/src/lib/mongodb"

export async function GET(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("forumdb")

    const message = await db.collection("messages").findOne({ _id: new ObjectId(params.id) })

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "消息不存在",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: message,
    })
  } catch (error) {
    console.error("获取消息详情失败:", error)
    return NextResponse.json(
      {
        success: false,
        message: "获取消息详情失败",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("forumdb")

    const result = await db.collection("messages").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "消息不存在或已被删除",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "消息删除成功",
    })
  } catch (error) {
    console.error("删除消息失败:", error)
    return NextResponse.json(
      {
        success: false,
        message: "删除消息失败",
      },
      { status: 500 },
    )
  }
}
