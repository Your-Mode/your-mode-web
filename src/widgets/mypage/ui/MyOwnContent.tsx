import { TabsContent } from "@/src/shared/components/ui/tabs";
import ContentGrid from "@/src/widgets/mypage/ui/ContentGrid";
import ContentCardComponent from "@/src/widgets/content/ui/content-card";
import EmptyState from "@/src/widgets/mypage/ui/EmptyState";
import { FileText } from "lucide-react";
import { myCustomContents } from "@/src/shared/api/mock";

const MyOwnContent = () => {
  const completedContents = myCustomContents.filter((content) => content.status === "completed");

  return (
    <TabsContent value="my-content">
      {completedContents.length > 0 ? (
        <ContentGrid>
          {completedContents.map((content) => (
            <ContentCardComponent
              key={content.id}
              id={content.id}
              title={content.title}
              type="맞춤형 컨텐츠"
              isCompleted={true}
              completedText={`완료됨 · ${content.applicationDate}`}
              editorName={content.editorName}
              items={content.items}
              iconType="view"
            />
          ))}
        </ContentGrid>
      ) : (
        <EmptyState
          icon={<FileText size={64} />}
          title="아직 완료된 맞춤형 컨텐츠가 없습니다"
          description="신청한 컨텐츠가 완료되면 여기에서 확인할 수 있습니다."
          actionLink="/content-application"
          actionText="맞춤형 컨텐츠 신청하기"
        />
      )}
    </TabsContent>
  );
};

export default MyOwnContent;
