"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface SiteCustomScriptsProps {
  head?: string;
  body?: string;
  footer?: string;
}

function injectHtml(html: string, target: "head" | "body") {
  const container = document.createElement("div");
  container.innerHTML = html;
  const parent = target === "head" ? document.head : document.body;

  Array.from(container.childNodes).forEach((node) => {
    if (node.nodeName === "SCRIPT") {
      const old = node as HTMLScriptElement;
      const script = document.createElement("script");
      if (old.src) script.src = old.src;
      if (old.async) script.async = true;
      if (old.defer) script.defer = true;
      if (old.type) script.type = old.type;
      script.textContent = old.textContent;
      parent.appendChild(script);
    } else {
      parent.appendChild(node.cloneNode(true));
    }
  });
}

export function SiteCustomScripts({ head, body, footer }: SiteCustomScriptsProps) {
  const pathname = usePathname();
  const injected = useRef(false);

  useEffect(() => {
    if (pathname.startsWith("/painelpro") || injected.current) return;

    if (head?.trim()) injectHtml(head, "head");
    if (body?.trim()) injectHtml(body, "body");
    if (footer?.trim()) injectHtml(footer, "body");

    injected.current = true;
  }, [head, body, footer, pathname]);

  return null;
}
