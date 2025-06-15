"use client"

import type React from "react"

import { Button } from "@/src/shared/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import styled from "@emotion/styled"

const EmptyContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const EmptyIcon = styled.div`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.neutral[300]};
`

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.neutral[700]};
`

const EmptyDescription = styled.p`
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
`

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  actionLink?: string
  actionText?: string
}

export default function EmptyState({ icon, title, description, actionLink, actionText }: EmptyStateProps) {
  return (
    <EmptyContainer>
      <EmptyIcon>{icon}</EmptyIcon>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
      {actionLink && actionText && (
        <Link href={actionLink}>
          <Button>
            {actionText}
            <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
          </Button>
        </Link>
      )}
    </EmptyContainer>
  )
}
