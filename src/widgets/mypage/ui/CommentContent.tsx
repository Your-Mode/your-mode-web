import ContentGrid from "./ContentGrid";
import { commentedContents } from "@/src/shared/api/mock";
import ContentCardComponent from "@/src/widgets/content/ui/content-card";
import { TabsContent } from "@/src/shared/components/ui/tabs";

const CommentContent = () => {
  return (
    <TabsContent value="comments">
      <ContentGrid>
        {commentedContents.map((content) => (
          <ContentCardComponent
            key={content.id}
            id={content.id}
            title={content.title}
            type={`${content.bodyType} 체형`}
            date={content.date}
            likes={content.likes}
            comments={content.comments}
            myComment={content.myComment}
            iconType="comment"
          />
        ))}
      </ContentGrid>
    </TabsContent>
  );
};

export default CommentContent;
