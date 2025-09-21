import ContentGrid from "./ContentGrid";
import ContentCardComponent from "@/src/widgets/content/ui/content-card";
import { TabsContent } from "@/src/shared/components/ui/tabs";
import { useGetMyContentList } from "@/src/widgets/mypage/feature/useGetMyContentList";
import { useEffect, useMemo, useRef } from "react";
import EmptyState from "./EmptyState";
import { FileText } from "lucide-react";
import { formatDate } from "@/src/shared/utils/formatDate";

const FavoritesContent = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    isError,
  } = useGetMyContentList({ size: 6 }, '/likes');

  const list = useMemo(() => data?.flat ?? [], [data?.flat]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px 0px" }, // 미리 당겨서 로드
    );

    io.observe(el);
    return () => io.unobserve(el);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 로딩 상태
  if (isLoading) {
    return (
      <TabsContent value="favorites">
        <ContentGrid>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 320, background: "#f5f5f5", borderRadius: 12 }} />
          ))}
        </ContentGrid>
      </TabsContent>
    );
  }

  if (isError) {
    return (
      <TabsContent value="favorites">
        <EmptyState
          icon={<FileText size={64} />}
          title="불러오기에 실패했어요"
          description="네트워크 상태를 확인하고 다시 시도해 주세요."
          actionText="다시 시도"
          actionOnClick={() => refetch()}
        />
      </TabsContent>
    );
  }

  if (list.length === 0) {
    return (
      <TabsContent value="favorites">
        <EmptyState
          icon={<FileText size={64} />}
          title="아직 좋아요한 컨텐츠가 없습니다"
          description="좋아요를 누른 컨텐츠는 여기에서 확인할 수 있습니다."
          actionLink="/editor-contents"
          actionText="컨텐츠 보러 가기"
        />
      </TabsContent>
    );
  }

  return (
    <TabsContent value="favorites">
      <ContentGrid>
        {list.map((fav) => (
          <ContentCardComponent
            key={fav.id}
            id={String(fav.id)}
            title={fav.title}
            type={`${fav.bodyTypes} 체형`}
            date={formatDate(fav.publishAt || fav.createdAt)}
            likes={fav.likeCount}
            comments={fav.commentCount}
            isLiked={true}
            iconType="like"
            // onClick={() => router.push(`/contents/${c.id}`)}
          />
        ))}
      </ContentGrid>
      {/* 더보기 버튼(접근성/대체) */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          style={{
            margin: "16px auto",
            display: "block",
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #eee",
          }}
        >
          {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
        </button>
      )}

      {/* 자동 로드를 위한 센티넬 */}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </TabsContent>
  );
};

export default FavoritesContent;
