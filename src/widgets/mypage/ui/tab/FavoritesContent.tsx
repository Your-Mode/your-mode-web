import ContentGrid from "../ContentGrid";
import { favorites } from "@/src/shared/api/mock";
import ContentCardComponent from "@/src/widgets/content/ui/content-card";
import { TabsContent } from "@/src/shared/components/ui/tabs";

const FavoritesContent = () => {
  return (
    <TabsContent value="favorites">
      <ContentGrid>
        {favorites.map((fav) => (
          <ContentCardComponent
            key={fav.id}
            id={fav.id}
            title={fav.title}
            type={`${fav.bodyType} 체형`}
            date={fav.date}
            likes={fav.likes}
            comments={fav.comments}
            isLiked={fav.isLiked}
            iconType="like"
          />
        ))}
      </ContentGrid>
    </TabsContent>
  );
};

export default FavoritesContent;
