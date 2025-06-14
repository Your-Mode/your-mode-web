import { useCallback } from "react";

export const useSectionScroll = () => {
  return useCallback(() => {
    const sections = document.querySelectorAll("section");
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    let currentSectionIndex = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        currentScroll >= sectionTop - windowHeight / 2 &&
        currentScroll < sectionTop + sectionHeight - windowHeight / 2
      ) {
        currentSectionIndex = index;
      }
    });
    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex < sections.length) {
      const nextSection = sections[nextSectionIndex];
      const targetPosition = nextSection.offsetTop;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }, []);
}
