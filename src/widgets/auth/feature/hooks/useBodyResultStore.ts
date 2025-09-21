import { BodyResultResponse } from "@/src/shared/types/body-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BodyResultStore {
  bodyResult: BodyResultResponse | null;
  setBodyResult: (bodyResult: BodyResultResponse) => void;
}

export const useBodyResultStore = create<BodyResultStore>()(
  persist(
    (set) => ({
      bodyResult: null,
      setBodyResult: (bodyResult: BodyResultResponse) => set({ bodyResult }),
    }),
    {
      name: 'bodyResult-storage', // localStorage key
    }
  )
);
