import { TabsContent } from "@/src/shared/components/ui/tabs";
import { myCustomContents } from "@/src/shared/api/mock";
import { useState } from "react";
import ProgressContentList from "@/src/widgets/mypage/ui/tab/progress/ProgressContentList";
import ProgressFilter from "@/src/widgets/mypage/ui/tab/progress/ProgressFilter";
import NewContentButton from "@/src/widgets/mypage/ui/tab/progress/NewContentButton";

interface ProgressContentProps {
  setThankYouModalOpen: (open: boolean) => void;
}

const ProgressContent = ({ setThankYouModalOpen }: ProgressContentProps) => {
  const [activeCustomTab, setActiveCustomTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 필터링 로직
  const filteredContents = myCustomContents.filter((content) => {
    const matchesSearch = searchQuery
      ? content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesTab = activeCustomTab === "all" ? true : content.status === activeCustomTab;

    return matchesSearch && matchesTab;
  });

  return (
    <TabsContent value="progress">
      <ProgressFilter
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        activeCustomTab={activeCustomTab}
        setActiveCustomTab={setActiveCustomTab}
      />
      <ProgressContentList
        setThankYouModalOpen={setThankYouModalOpen}
        filteredContents={filteredContents}
      />
      {filteredContents.length > 0 && <NewContentButton />}
    </TabsContent>
  );
};

export default ProgressContent;
