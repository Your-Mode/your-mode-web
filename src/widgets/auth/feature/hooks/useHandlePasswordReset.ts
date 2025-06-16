import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useHandlePasswordReset = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handlePhoneNext = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setStep(2);
    setTimer(60);
    setIsLoading(false);
  };

  const handleCodeNext = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setStep(3);
    setIsLoading(false);
  };

  const handlePasswordNext = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    // 완료 처리 등
    setIsLoading(false);
    router.push("/");
  };

  return { step, isLoading, timer, handleCodeNext, handlePasswordNext, handlePhoneNext };
};
