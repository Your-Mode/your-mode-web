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
  height: 100%;
`

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 320px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  flex-shrink: 0;
  overflow: hidden;
  background-color: #f8f9fa;
`

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const LikeButton = styled.button<{ isLiked?: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${({ isLiked }) => (isLiked ? "rgba(255, 62, 108, 0.2)" : "rgba(255, 255, 255, 0.9)")};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ isLiked }) => (isLiked ? "rgba(255, 62, 108, 0.3)" : "rgba(255, 255, 255, 1)")};
    transform: scale(1.1);
  }
`

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 140px;
  justify-content: space-between;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 8px;
`

const BodyTypeBadge = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  background-color: rgba(255, 62, 108, 0.1);
  color: #ff3e6c;
  border-radius: 12px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
`

const DateText = styled.span`
  font-size: 12px;
  color: #999999;
  white-space: nowrap;
  flex-shrink: 0;
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: #333333;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`

const StatsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
  padding: 8px 0 0;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666666;
  font-size: 14px;
  font-weight: 500;
`

const StatNumber = styled.span`
  color: #666666;
  font-size: 14px;
  font-weight: 500;
`

export default function ContentCardWide({
  id = "1",
  title,
  image,
  bodyType,
  likes = 0,
  comments = 0,
  isLiked = false,
  date,
}: ContentCardProps) {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Like clicked")
  }

  return (
    <CardLink href={`/content/${id}`}>
      <Card>
        <ImageContainer>
          <CardImage src={image || "/placeholder.svg?height=180&width=280"} alt={title} width={280} height={180} />
          <LikeButton isLiked={isLiked} onClick={handleLikeClick}>
            <Heart size={16} color={isLiked ? "#ff3e6c" : "#666"} fill={isLiked ? "#ff3e6c" : "none"} />
          </LikeButton>
        </ImageContainer>

        <CardContent>
          <div>
            <CardHeader>
              <BodyTypeBadge>{bodyType}</BodyTypeBadge>
              {date && <DateText>{date}</DateText>}
            </CardHeader>
            <Title>{title}</Title>
          </div>

          <StatsContainer>
            <StatItem>
              <Heart size={16} color="#999999" fill="none" />
              <StatNumber>{likes}</StatNumber>
            </StatItem>
            <StatItem>
              <MessageCircle size={16} color="#999999" fill="none" />
              <StatNumber>{comments}</StatNumber>
            </StatItem>
          </StatsContainer>
        </CardContent>
      </Card>
    </CardLink>
  )
}
