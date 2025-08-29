"use client";

import { useState } from "react";
import { Tabs } from "@/src/shared/components/ui/tabs";
import ContentTabs from "@/src/widgets/mypage/ui/ContentTabs";
import styled from "@emotion/styled";
import MyOwnContent from "@/src/widgets/mypage/ui/MyOwnContent";
import ProgressContent from "@/src/widgets/mypage/ui/ProgressContent";
import FavoritesContent from "@/src/widgets/mypage/ui/FavoritesContent";
import CommentContent from "@/src/widgets/mypage/ui/CommentContent";
import RecentContent from "@/src/widgets/mypage/ui/RecentContent";
import BodyAnalysis from "@/src/widgets/mypage/ui/BodyAnalysis";
import ThankYouModal from "@/src/widgets/mypage/ui/ThankYouModal";
import Error from "@/app/error";
import { useAuthStore } from "@/src/shared/store/auth";
import { ProfileHeader } from "@/src/widgets/mypage";
import { useGetMyPageInfo } from "@/src/widgets/mypage/feature/useGetMyPageInfo";

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

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("my-content");
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);
  const { userQuery, contentApplicationListQuery } = useGetMyPageInfo();
  const email = useAuthStore().user?.email;
  if (userQuery.isError || contentApplicationListQuery.isError) {
    return <Error />;
  }

  if ((userQuery.data !== undefined && userQuery.isLoading) || (contentApplicationListQuery.data !== undefined && contentApplicationListQuery.isLoading)) {
    return <div>Loading...</div>;
  }

  const bodyTypeName = userQuery.data?.bodyTypeId === 1 ? "스트레이트" : userQuery.data?.bodyTypeId === 2 ? "웨이브" : userQuery.data?.bodyTypeId === 3 ? "내추럴" : "체형 진단하러 가기";

  return (
    <MainContainer>
      <MainContent>
        <ProfileHeader
          name={userQuery.data?.name}
          bodyType={bodyTypeName}
          email={email}
          stats={userProfile.stats}
        />
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab}>
            <MyOwnContent />
            <ProgressContent setThankYouModalOpen={setThankYouModalOpen} data={contentApplicationListQuery?.data} />
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
