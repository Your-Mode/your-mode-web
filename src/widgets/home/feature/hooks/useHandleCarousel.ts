import { useCallback, useEffect, useState } from "react";

interface SlideData {
  title: string
  subtitle: string
  buttonText: string
  link?: string;
  backgroundImage: string
}

export const slides: SlideData[] = [
  {
    title: "내 체형이 궁금하다면?",
    subtitle: "AI 기반 체형 분석으로 나만의 스타일을 찾아보세요",
    buttonText: "체형 분석 바로가기",
    link: "/body-analysis",
    backgroundImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "맞춤 스타일링을 원한다면?",
    subtitle: "전문 에디터가 제안하는 개인 맞춤형 패션 컨텐츠",
    buttonText: "컨텐츠 신청하기",
    link: "/content-application",
    backgroundImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "나만의 스타일을 찾고 싶다면?",
    subtitle: "AI 기반 개인 맞춤형 스타일링 서비스로 나만의 패션을 완성하세요",
    buttonText: "더 알아보기",
    backgroundImage:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  },
]

export const useHandleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState(0)

  const goToPrevSlide = useCallback(() => {
    setSlideDirection(1) // 좌에서 우로 (양수)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToNextSlide = useCallback(() => {
    setSlideDirection(-1) // 우에서 좌로 (음수)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const handleIndicatorClick = useCallback(
    (index: number) => {
      setSlideDirection(index > currentSlide ? -1 : 1)
      setCurrentSlide(index)
    },
    [currentSlide],
  )

  // 자동 슬라이드 - currentSlide가 변경될 때마다 타이머 리셋
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection(-1) // 우에서 좌로 (음수)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  return { currentSlide, slideDirection, goToNextSlide, goToPrevSlide, handleIndicatorClick }
}
