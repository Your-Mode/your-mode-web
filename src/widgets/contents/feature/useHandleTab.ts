import { useState } from "react";
import { BodyType } from "@/src/shared/types/content";

export const useHandleTab = () => {
  const [activeTab, setActiveTab] = useState<BodyType>("all");

  const changeTab = (id: BodyType) => {
    setActiveTab(id)
  }

  return { activeTab, changeTab }
}
