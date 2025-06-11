"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle } from "lucide-react"
import styled from "@emotion/styled"

interface ContentCardProps {
  id?: string
  title: string
  image: string
  bodyType: string
  likes: number
  comments: number
  isLiked?: boolean
  date?: string
}

const CardLink = styled(Link)`
text-decoration: none;
color: inherit;
display: block;
`

const Card = styled.div`
background-color: ${({ theme }) => theme.colors.background.primary};
border-radius: 8px;
overflow: hidden;
box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow.light};
transition: transform 0.3s ease, box-shadow 0.3s ease;
cursor: pointer;

&:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px ${({ theme }) => theme.colors.shadow.medium};
}
`

const ImageContainer = styled.div`
position: relative;
height: 240px;
overflow: hidden;
`

const CardImage = styled(Image)`
object-fit: cover;
transition: transform 0.5s ease;

${Card}:hover & {
  transform: scale(1.05);
}
`

const LikeButton = styled.button<{ isLiked?: boolean }>`
position: absolute;
top: 0.5rem;
right: 0.5rem;
background-color: ${({ isLiked, theme }) =>
  isLiked ? `${theme.colors.primary[500]}33` : `${theme.colors.background.primary}cc`};
border: none;
border-radius: 50%;
width: 2rem;
height: 2rem;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.2s ease;
z-index: 2;

&:hover {
  background-color: ${({ isLiked, theme }) =>
    isLiked ? `${theme.colors.primary[500]}4d` : theme.colors.background.primary};
  transform: scale(1.1);
}
`

const CardContent = styled.div`
padding: 1rem;
`

const CardHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 0.5rem;
`

const BodyTypeBadge = styled.span`
font-size: ${({ theme }) => theme.fonts.size.xs};
padding: 0.25rem 0.5rem;
background-color: ${({ theme }) => theme.colors.background.tertiary};
color: ${({ theme }) => theme.colors.primary[500]};
border-radius: 1rem;
font-weight: ${({ theme }) => theme.fonts.weight.medium};

@media (max-width: 640px) {
  font-size: 0.6rem;
  padding: 0.15rem 0.35rem;
  line-height: 1.2;
  word-break: keep-all;
}
`

const DateText = styled.span`
font-size: ${({ theme }) => theme.fonts.size.xs};
color: ${({ theme }) => theme.colors.text.tertiary};
`

const Title = styled.h3`
font-family: ${({ theme }) => theme.fonts.family.primary};
font-size: ${({ theme }) => theme.fonts.size.sm};
font-weight: ${({ theme }) => theme.fonts.weight.semibold};
margin-bottom: 0.75rem;
line-height: 1.4;
min-height: 2.8rem; /* 2줄 높이 고정 (1.4 * 2 = 2.8rem) */
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
color: ${({ theme }) => theme.colors.text.primary};
word-break: break-word;
`

const StatsContainer = styled.div`
display: flex;
gap: 0.75rem;
`

const StatItem = styled.div`
display: flex;
align-items: center;
gap: 0.25rem;
font-size: ${({ theme }) => theme.fonts.size.xs};
color: ${({ theme }) => theme.colors.text.secondary};
`

export default function ContentCard({
  id = "1",
  title,
  image,
  bodyType,
  likes,
  comments,
  isLiked = false,
  date,
}: ContentCardProps) {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // 좋아요 로직 구현
    console.log("Like clicked")
  }

  return (
    <CardLink href={`/content/${id}`}>
      <Card>
        <ImageContainer>
          <CardImage
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
          <LikeButton isLiked={isLiked} onClick={handleLikeClick}>
            <Heart size={14} color={isLiked ? "#ff3e6c" : "#666"} fill={isLiked ? "#ff3e6c" : "none"} />
          </LikeButton>
        </ImageContainer>

        <CardContent>
          <CardHeader>
            <BodyTypeBadge>{bodyType}</BodyTypeBadge>
            {date && <DateText>{date}</DateText>}
          </CardHeader>

          <Title>{title}</Title>

          <StatsContainer>
            <StatItem>
              <Heart size={12} />
              <span>{likes}</span>
            </StatItem>
            <StatItem>
              <MessageCircle size={12} />
              <span>{comments}</span>
            </StatItem>
          </StatsContainer>
        </CardContent>
      </Card>
    </CardLink>
  )
}
