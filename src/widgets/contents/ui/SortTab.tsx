import { tabs } from "@/src/shared/types/contents";
import styled from "@emotion/styled";
import { BodyType } from "@/src/shared/types/content";

interface SortTabProps {
  activeTab: BodyType;
  changeTab: (tabId: BodyType) => void;
}

const SortTab = ({ activeTab, changeTab }: SortTabProps) => {
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <Tab key={tab.id} active={activeTab === tab.id} onClick={() => changeTab(tab.id)}>
          {tab.label}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default SortTab;

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 640px) {
    flex: 1;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ active, theme }) => (active ? theme.colors.primary[500] : theme.colors.text.secondary)};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active, theme }) => (active ? theme.colors.primary[500] : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.75rem;
  }
`;
