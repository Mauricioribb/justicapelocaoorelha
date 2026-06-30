"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import "altcha";
import "altcha/i18n/pt-br";

export interface AltchaWidgetHandle {
  getPayload: () => string | null;
  reset: () => void;
}

interface Props {
  onVerifiedChange?: (verified: boolean, payload?: string | null) => void;
}

export const AltchaWidget = forwardRef<AltchaWidgetHandle, Props>(
  function AltchaWidget({ onVerifiedChange }, ref) {
    const widgetRef = useRef<HTMLElement & { reset?: () => void }>(null);
    const payloadRef = useRef<string | null>(null);

    useImperativeHandle(ref, () => ({
      getPayload: () => payloadRef.current,
      reset: () => {
        payloadRef.current = null;
        onVerifiedChange?.(false, null);
        widgetRef.current?.reset?.();
      },
    }));

    useEffect(() => {
      const widget = widgetRef.current;
      if (!widget) return;

      const setPayload = (payload: string | null, verified: boolean) => {
        payloadRef.current = payload;
        onVerifiedChange?.(verified, payload);
      };

      const onStateChange = (event: Event) => {
        const detail = (
          event as CustomEvent<{ state?: string; payload?: string }>
        ).detail;

        if (detail?.state === "verified") {
          setPayload(detail.payload ?? payloadRef.current, true);
          return;
        }

        if (
          detail?.state === "unverified" ||
          detail?.state === "error" ||
          detail?.state === "expired"
        ) {
          setPayload(null, false);
        }
      };

      const onVerified = (event: Event) => {
        const payload = (event as CustomEvent<{ payload?: string }>).detail
          ?.payload;
        if (payload) {
          setPayload(payload, true);
        }
      };

      widget.addEventListener("statechange", onStateChange);
      widget.addEventListener("verified", onVerified);

      return () => {
        widget.removeEventListener("statechange", onStateChange);
        widget.removeEventListener("verified", onVerified);
      };
    }, [onVerifiedChange]);

    return (
      <altcha-widget
        ref={widgetRef}
        challenge="/api/altcha/challenge"
        language="pt-br"
        name="altcha"
        style={{ "--altcha-max-width": "100%" }}
      />
    );
  }
);
