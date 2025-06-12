import "@emotion/react"

declare module "@emotion/react" {
  import { ColorsType } from "@/src/shared/styles/colors";
  import { FontsType } from "@/src/shared/styles/fonts";

  export interface Theme extends Theme {
    colors: ColorsType;
    fonts: FontsType;
  }
}
