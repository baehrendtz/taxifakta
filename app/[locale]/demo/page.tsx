"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { useState } from "react"

export default function DemoPage() {
  const { theme } = useTheme()
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "assistant",
      content:
        "Hej! Det här är en demo av Chatbot UI. Backend är inte kopplad än, så jag kan inte svara på riktigt. Men du kan se hur gränssnittet fungerar!"
    }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      { role: "user" as const, content: input },
      {
        role: "assistant" as const,
        content:
          "Detta är ett demo-svar. För att få riktiga svar behöver du koppla Firebase och AI-backend enligt FIREBASE_SETUP.md"
      }
    ]

    setMessages(newMessages)
    setInput("")
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChatbotUISVG
              theme={theme === "dark" ? "dark" : "light"}
              scale={0.1}
            />
            <h1 className="text-xl font-bold">Chatbot UI - Demo Mode</h1>
          </div>
          <div className="rounded-md bg-yellow-500/20 px-3 py-1 text-sm">
            Demo Mode (No Backend)
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-muted"
                }`}
              >
                <div className="mb-1 text-xs font-semibold opacity-70">
                  {message.role === "user" ? "Du" : "Assistent"}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="mx-auto max-w-3xl">
          <div className="bg-muted mb-2 rounded-md p-3 text-sm">
            <strong>OBS:</strong> Detta är en frontend-demo. Meddelanden sparas
            inte och AI svarar inte på riktigt. Se FIREBASE_SETUP.md för att
            koppla backend.
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Skriv ett meddelande... (Enter för att skicka)"
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim()}>
              Skicka
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
