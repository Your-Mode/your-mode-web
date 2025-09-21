import styled from "@emotion/styled";
import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface FeatureSectionProps {
  bgColor: string;
  icon: ReactNode;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: ReactNode;
  onScrollNext?: () => void;
  showScrollIndicator?: boolean;
}

export default function FeatureSection({
                                 bgColor,
                                 icon,
                                 imageSrc,
                                 imageAlt,
                                 title,
                                 description,
                                 onScrollNext,
                                 showScrollIndicator = true,
                               }: FeatureSectionProps) {
  return (
    <FeatureSectionWrap bgColor={bgColor}>
      <FeatureContent>
        <FeatureImageContainer>
          <FeatureIcon>{icon}</FeatureIcon>
          <PlaceholderImage
            src={imageSrc}
            alt={imageAlt}
            style={{ position: "absolute", opacity: 0.3 }}
          />
        </FeatureImageContainer>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureContent>
      {showScrollIndicator && onScrollNext && (
        <FeatureScrollIndicator onClick={onScrollNext}>
          <ChevronDown size={32} />
        </FeatureScrollIndicator>
      )}
    </FeatureSectionWrap>
  );
}

const FeatureSectionWrap = styled.section<{ bgColor: string }>`
  min-height: 100vh;
  width: 100%;
  background: ${(props) => props.bgColor};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
  @media (max-width: 768px) {
    min-height: 80vh;
    padding: 1rem 0.5rem;
  }
`;

const FeatureContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const FeatureImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  @media (max-width: 768px) {
    width: 120px; height: 120px; margin-bottom: 1rem;
  }
  @media (max-width: 480px) {
    width: 100px; height: 100px; margin-bottom: 0.8rem;
  }
`;

const PlaceholderImage = styled.img`
  width: 100%; height: 100%; object-fit: cover; border-radius: 24px;
`;

const FeatureIcon = styled.div`
  color: white; z-index: 2; position: relative;
  @media (max-width: 768px) {
    svg { width: 40px; height: 40px; }
  }
  @media (max-width: 480px) {
    svg { width: 35px; height: 35px; }
  }
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  max-width: 1000px;
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
    max-width: 100%;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.4;
  }
`;

const FeatureScrollIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  color: #333;
  cursor: pointer;
  z-index: 5;
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-20px) translateX(-50%); }
    60% { transform: translateY(-10px) translateX(-50%); }
  }
  @media (max-width: 768px) {
    bottom: 0.5rem;
  }
`;
