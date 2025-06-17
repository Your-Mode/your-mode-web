"use client";

import { useState } from "react";
import { Tabs } from "@/src/shared/components/ui/tabs";
import ProfileHeader from "@/src/widgets/mypage/ui/ProfileHeader";
import ContentTabs from "@/src/widgets/mypage/ui/ContentTabs";
import styled from "@emotion/styled";
import MyOwnContent from "@/src/widgets/mypage/ui/MyOwnContent";
import ProgressContent from "@/src/widgets/mypage/ui/ProgressContent";
import FavoritesContent from "@/src/widgets/mypage/ui/FavoritesContent";
import CommentContent from "@/src/widgets/mypage/ui/CommentContent";
import RecentContent from "@/src/widgets/mypage/ui/RecentContent";
import BodyAnalysis from "@/src/widgets/mypage/ui/BodyAnalysis";
import ThankYouModal from "@/src/widgets/mypage/ui/ThankYouModal";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("my-content");
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);

  // 샘플 데이터
  const userProfile = {
    name: "김정윤",
    bodyType: "웨이브",
    email: "yourmode@naver.com",
    stats: {
      customContents: 3,
      favorites: 5,
      comments: 2,
    },
  };

  return (
    <MainContainer>
      <MainContent>
        <ProfileHeader
          name={userProfile.name}
          bodyType={userProfile.bodyType}
          email={userProfile.email}
          stats={userProfile.stats}
        />
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab}>
            <MyOwnContent />
            <ProgressContent setThankYouModalOpen={setThankYouModalOpen} />
            <FavoritesContent />
            <CommentContent />
            <RecentContent />
            <BodyAnalysis />
          </ContentTabs>
        </Tabs>
        <ThankYouModal thankYouModalOpen={thankYouModalOpen} setThankYouModalOpen={setThankYouModalOpen} />
      </MainContent>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 2rem 0;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.75rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;
