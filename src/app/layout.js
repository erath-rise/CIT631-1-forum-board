import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "论坛留言板",
  description: "简单的论坛留言板系统 - 支持消息发布和回复功能",
  keywords: "论坛,留言板,消息,回复",
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8 max-w-4xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
