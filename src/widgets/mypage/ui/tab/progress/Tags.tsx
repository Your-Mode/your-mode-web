import styled from "@emotion/styled";
import { Badge } from "@/src/shared/components/ui/badge";
import { Tag } from "lucide-react";
import { MyContentItem } from "@/src/shared/types/content";

interface TagsProps {
  content: MyContentItem;
}

const Tags = ({ content }: TagsProps) => {
  return (
    <ItemTags>
      {content.items.map((item, index) => (
        <ItemTag key={index} variant="outline">
          <Tag size={12} />
          {item}
        </ItemTag>
      ))}
    </ItemTags>
  );
};

export default Tags;

const ItemTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ItemTag = styled(Badge)`
  background-color: rgba(255, 62, 108, 0.1);
  color: #ff3e6c;
  border: 1px solid rgba(255, 62, 108, 0.2);

  &:hover {
    background-color: rgba(255, 62, 108, 0.15);
  }
`;
