"use client";

import type React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import styled from "@emotion/styled";

interface ContentTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

export default function ContentTabs({ activeTab, onTabChange, children }: ContentTabsProps) {
  return (
    <StyledTabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="tabs-list">
        <TabsTrigger value="my-content" className="tabs-trigger">
          나만의 컨텐츠
        </TabsTrigger>
        <TabsTrigger value="progress" className="tabs-trigger">
          진행 상황
        </TabsTrigger>
        {/*<TabsTrigger value="favorites" className="tabs-trigger">
          내가 찜한 컨텐츠
        </TabsTrigger>
        <TabsTrigger value="comments" className="tabs-trigger">
          댓글 단 컨텐츠
        </TabsTrigger>*/}
        {/*<TabsTrigger value="recent" className="tabs-trigger">
          최근 본 컨텐츠
        </TabsTrigger>*/}
        <TabsTrigger value="body-analysis" className="tabs-trigger">
          체형분석 결과
        </TabsTrigger>
      </TabsList>
      {children}
    </StyledTabs>
  );
}

const StyledTabs = styled(Tabs)`
  .tabs-list {
    background-color: ${({ theme }) => theme.colors.background.primary};
    border-radius: 12px;
    padding: 0.5rem;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow.light};
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-around;

    @media (max-width: 768px) {
      overflow-x: auto;
      overflow-y: hidden;
      justify-content: flex-start;
      gap: 0.5rem;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .tabs-trigger {
    flex: 1;
    padding: 1rem 1.5rem;
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    border-radius: 8px;
    transition: all 0.2s ease;
    white-space: nowrap;

    &[data-state="active"] {
      background-color: ${({ theme }) => theme.colors.primary[500]};
      color: ${({ theme }) => theme.colors.text.inverse};
      box-shadow: 0 4px 8px ${({ theme }) => theme.colors.primary[300]};
    }

    @media (max-width: 768px) {
      flex: none;
      min-width: 100px;
      padding: 0.75rem 0.75rem;
      font-size: 0.875rem;
      white-space: nowrap;
    }
  }
`;
