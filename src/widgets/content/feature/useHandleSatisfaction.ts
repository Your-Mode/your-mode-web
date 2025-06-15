import { useState } from "react";

export const useHandleSatisfaction = () => {
  const [isSatisfied, setIsSatisfied] = useState<boolean | null>(null);
  const [satisfactionCount, setSatisfactionCount] = useState(124);

  const handleSatisfaction = (satisfied: boolean) => {
    if (isSatisfied === satisfied) {
      setIsSatisfied(null);
      if (satisfied) setSatisfactionCount((prev) => prev - 1);
    } else {
      if (isSatisfied !== null && isSatisfied !== satisfied) {
        setSatisfactionCount((prev) => (satisfied ? prev + 1 : prev - 1));
      } else if (isSatisfied === null && satisfied) {
        setSatisfactionCount((prev) => prev + 1);
      }
      setIsSatisfied(satisfied);
    }
  };

  return { isSatisfied, satisfactionCount, handleSatisfaction };
}
