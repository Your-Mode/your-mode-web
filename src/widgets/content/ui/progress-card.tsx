"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Eye, ArrowRight } from "lucide-react"
import Link from "next/link"
import styled from "@emotion/styled"

const ProgressCardContainer = styled(Card)`
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: #ff3e6c;
  }
`

const StatusBadge = styled(Badge)<{ status: "pending" | "in-progress" | "completed" | "assigned" }>`
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#f59e0b"
      case "in-progress":
        return "#3b82f6"
      case "completed":
        return "#10b981"
      case "assigned":
        return "#a855f7"
      default:
        return "#f59e0b"
    }
  }};
`

interface ProgressCardProps {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "assigned"
  progress: number
  date: string
  editorName?: string
  items: string[]
  onViewDetails?: () => void
}

export default function ProgressCard({
  id,
  title,
  description,
  status,
  progress,
  date,
  editorName,
  items,
  onViewDetails,
}: ProgressCardProps) {
  const getStatusText = (status: "pending" | "in-progress" | "completed" | "assigned") => {
    switch (status) {
      case "pending":
        return "접수 완료"
      case "in-progress":
        return "진행 중"
      case "completed":
        return "완료"
      case "assigned":
        return "배정됨"
      default:
        return "접수 완료"
    }
  }

  return (
    <ProgressCardContainer>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <StatusBadge status={status}>{getStatusText(status)}</StatusBadge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>진행 상황</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="flex justify-between items-center text-sm text-gray-600">
            {editorName && <span>담당 에디터: {editorName}</span>}
            <span>{date}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {items.map((item, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          <Eye size={16} style={{ marginRight: "0.5rem" }} />
          상세 보기
        </Button>
        {status === "completed" && (
          <Link href={`/content-result/${id}`}>
            <Button size="sm">
              결과 확인
              <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
            </Button>
          </Link>
        )}
      </CardFooter>
    </ProgressCardContainer>
  )
}
