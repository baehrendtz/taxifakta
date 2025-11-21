"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div>
        <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
      </div>

      <div className="mt-2 text-4xl font-bold">Chatbot UI</div>

      <div className="mt-4 flex flex-col gap-3">
        <Link
          className="flex w-[200px] items-center justify-center rounded-md bg-blue-500 p-2 font-semibold"
          href="/login"
        >
          Login
          <IconArrowRight className="ml-1" size={20} />
        </Link>

        <Link
          className="flex w-[200px] items-center justify-center rounded-md bg-green-500 p-2 font-semibold"
          href="/demo"
        >
          Try Demo
          <IconArrowRight className="ml-1" size={20} />
        </Link>
      </div>
    </div>
  )
}
