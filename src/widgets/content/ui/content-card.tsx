"use client";

import type React from "react";

import { Card, CardContent } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Heart, MessageCircle, Eye, CheckCircle } from "lucide-react";
import styled from "@emotion/styled";

interface ContentCardProps {
  id: string;
  title: string;
  type: string;
  date?: string;
  likes?: number;
  comments?: number;
  isLiked?: boolean;
  isCompleted?: boolean;
  completedText?: string;
  viewedAt?: string;
  myComment?: string;
  editorName?: string;
  items?: string[];
  iconType?: "like" | "view" | "comment";
  onClick?: () => void;
  imageUrl?: string;
}

export default function ContentCardComponent({
                                               id,
                                               title,
                                               type,
                                               date,
                                               likes,
                                               comments,
                                               isLiked = false,
                                               isCompleted = false,
                                               completedText,
                                               viewedAt,
                                               myComment,
                                               editorName,
                                               items = [],
                                               iconType = "like",
                                               onClick,
                                               imageUrl,
                                             }: ContentCardProps) {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 좋아요 로직 구현
    console.log("Like clicked for content:", id);
  };

  const getIcon = () => {
    switch (iconType) {
      case "view":
        return <Eye size={16} color="#ff3e6c" />;
      case "comment":
        return <MessageCircle size={16} color="#ff3e6c" />;
      case "like":
      default:
        return <Heart size={16} color={isLiked ? "white" : "#ff3e6c"} fill={isLiked ? "white" : "none"} />;
    }
  };

  return (
    <ContentCardContainer onClick={onClick}>
      <ContentImage imageUrl={imageUrl}>
        <LikeButton isLiked={isLiked} onClick={handleLikeClick}>
          {getIcon()}
        </LikeButton>
      </ContentImage>
      <ContentInfo>
        <ContentType>{type}</ContentType>
        <ContentTitle>{title}</ContentTitle>

        {isCompleted && completedText && (
          <div className="text-xs text-green-600 mb-2 flex items-center">
            <CheckCircle size={10} className="inline mr-1" />
            {completedText}
          </div>
        )}

        {viewedAt && (
          <div className="text-xs text-blue-600 mb-2">
            <Eye size={10} className="inline mr-1" />
            {viewedAt} 조회
          </div>
        )}

        {myComment && (
          <div className="bg-gray-50 p-1.5 rounded-lg mb-2 text-xs">
            <span className="text-gray-600">내 댓글: </span>
            <span>"{myComment}"</span>
          </div>
        )}

        {editorName && <div className="text-xs mb-2">에디터: {editorName}</div>}

        {items && items.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {items.slice(0, 2).map((item, i) => (
              <Badge key={i} variant="outline" className="text-xs py-0 px-1.5">
                {item}
              </Badge>
            ))}
            {items.length > 2 && (
              <Badge variant="outline" className="text-xs py-0 px-1.5">
                +{items.length - 2}
              </Badge>
            )}
          </div>
        )}

        <ContentMeta>
          {date && <span>{date}</span>}
          {(likes !== undefined || comments !== undefined) && (
            <ContentStats>
              {likes !== undefined && (
                <StatItem>
                  <Heart size={10} />
                  <span>{likes}</span>
                </StatItem>
              )}
              {comments !== undefined && (
                <StatItem>
                  <MessageCircle size={10} />
                  <span>{comments}</span>
                </StatItem>
              )}
            </ContentStats>
          )}
        </ContentMeta>
      </ContentInfo>
    </ContentCardContainer>
  );
}

const ContentCardContainer = styled(Card)`
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #ff3e6c;
  }
`;

const ContentImage = styled.div<{ imageUrl?: string }>`
  height: 240px;
  background-color: #f3f4f6;
  background-image: ${({ imageUrl }) =>
    imageUrl
      ? `url('${imageUrl}')`
      : `url('/placeholder.svg?height=240&width=220')`};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const LikeButton = styled.button<{ isLiked?: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: ${(props) => (props.isLiked ? "rgba(255, 62, 108, 0.9)" : "rgba(255, 255, 255, 0.9)")};
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => (props.isLiked ? "#ff3e6c" : "white")};
  }
`;

const ContentInfo = styled(CardContent)`
  padding: 1rem;
`;

const ContentTitle = styled.h3`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const ContentType = styled.p`
  font-size: 0.8rem;
  color: #ff3e6c;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ContentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  color: #666;
`;

const ContentStats = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
