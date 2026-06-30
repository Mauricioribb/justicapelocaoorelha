import type { CSSProperties } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "altcha-widget": {
        ref?: React.Ref<HTMLElement>;
        challenge?: string;
        language?: string;
        name?: string;
        style?: CSSProperties & Record<string, string | number>;
      };
    }
  }
}

export {};
