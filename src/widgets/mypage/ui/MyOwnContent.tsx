import { TabsContent } from "@/src/shared/components/ui/tabs";
import ContentGrid from "@/src/widgets/mypage/ui/ContentGrid";
import ContentCardComponent from "@/src/widgets/content/ui/content-card";
import EmptyState from "@/src/widgets/mypage/ui/EmptyState";
import { FileText } from "lucide-react";
import { useGetMyContentList } from "@/src/widgets/mypage/feature/useGetMyContentList";
import { useEffect, useMemo, useRef } from "react";
import { formatDate } from "@/src/shared/utils/formatDate";

const MyOwnContent = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    isError,
  } = useGetMyContentList({ size: 6 });
  // const completedContents = myCustomContents.filter((content) => content.status === "completed");
  const list = useMemo(() => data?.flat ?? [], [data?.flat]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // 교차 관찰자: 맨 아래 닿으면 다음 페이지 자동 로드
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
      <TabsContent value="my-content">
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
      <TabsContent value="my-content">
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

  // 비어있는 상태
  if (!list.length) {
    return (
      <TabsContent value="my-content">
        <EmptyState
          icon={<FileText size={64} />}
          title="아직 완료된 맞춤형 컨텐츠가 없습니다"
          description="신청한 컨텐츠가 완료되면 여기에서 확인할 수 있습니다."
          actionLink="/content-application"
          actionText="맞춤형 컨텐츠 신청하기"
        />
      </TabsContent>
    );
  }

  return (
    <TabsContent value="my-content">
      <ContentGrid>
        {list.map((c) => (
          <ContentCardComponent
            key={c.id}
            id={String(c.id)}
            title={c.title}
            type="맞춤형 컨텐츠"
            isCompleted={true}
            completedText={`완료됨 · ${formatDate(c.publishAt || c.createdAt)}`}
            // 서버 이미지도 보여주고 싶으면 아래 prop 추가 (3번 변경 반영)
            imageUrl={c.mainImgUrl}
            items={(c.categories ?? []).map((x) => x.name)}
            iconType="view"
            // 필요 시 onClick으로 상세 이동
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

export default MyOwnContent;
