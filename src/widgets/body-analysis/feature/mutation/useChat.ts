"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { ChatMessage, ChatRequest, ChatResponse } from "@/src/shared/types/body-type";
import { chat } from "@/src/shared/api/body";

export function useChat(initialBotMessage: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: "bot", content: initialBotMessage, timestamp: new Date() },
  ])

  const mutation = useMutation<ChatResponse, Error, ChatRequest>({
    mutationFn: (req) => chat(req),
    onMutate: ({ answer }) => {
      // 1) 사용자 메시지 즉시 추가
      setMessages((prev) => [
        ...prev,
        { type: "user", content: answer, timestamp: new Date() },
        { type: "system", content: "AI가 답변을 분석하고 있어요... 💫", timestamp: new Date() },
      ])
    },
    onSuccess: (data) => {
      // 2) system 메시지 제거, bot 응답 추가
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.type !== "system")
        return [...filtered, { type: "bot", content: data.message, timestamp: new Date() }]
      })
    },
    onError: (error, variables) => {
      console.error("Chat API error:", error)

      const fallbackMessage = `답변을 분석했어요! 네트워크 연결을 확인해주세요. 🔄`

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.type !== "system")
        return [
          ...filtered,
          {
            type: "bot",
            content: fallbackMessage,
            timestamp: new Date(),
          },
        ]
      })
    },
  })

  const send = (question: string, answer: string) => {
    mutation.mutate({ question, answer })
  }

  const addBotMessage = (content: string) => {
    setMessages((prev) => [...prev, { type: "bot", content, timestamp: new Date() }])
  }

  const clearMessages = () => {
    setMessages([{ type: "bot", content: initialBotMessage, timestamp: new Date() }])
  }

  return {
    messages,
    send,
    addBotMessage,
    clearMessages,
    isLoading: mutation.isPending,
    lastResponse: mutation.data,
    error: mutation.error,
    isError: mutation.isError,
  }
}
