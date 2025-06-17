import ContentGrid from "./ContentGrid";
import { recentViewed } from "@/src/shared/api/mock";
import ContentCardComponent from "@/src/widgets/content/ui/content-card";
import { TabsContent } from "@/src/shared/components/ui/tabs";

const RecentContent = () => {
  return (
    <TabsContent value="recent">
      <ContentGrid>
        {recentViewed.map((content) => (
          <ContentCardComponent
            key={content.id}
            id={content.id}
            title={content.title}
            type={`${content.bodyType} 체형`}
            date={content.date}
            likes={content.likes}
            comments={content.comments}
            iconType="view"
          />
        ))}
      </ContentGrid>
    </TabsContent>
  );
};

export default RecentContent;
