"use client";

import { useEffect, useRef, useState } from "react";

export type IconCardIcon =
  | "votes"
  | "clock"
  | "alert"
  | "gavel"
  | "chart"
  | "building"
  | "warning";

export interface IconCardItem {
  text: React.ReactNode;
  icon: IconCardIcon;
}

function ListIcon({ icon }: { icon: IconCardIcon }) {
  const className = "h-6 w-6";

  switch (icon) {
    case "votes":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case "alert":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      );
    case "gavel":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a45.263 45.263 0 0 1-9.172.102 1.07 1.07 0 0 1-.589-1.202L5.25 5.47m13.5 0L18 15.75" />
        </svg>
      );
    case "chart":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      );
    case "building":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18" />
        </svg>
      );
    case "warning":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      );
  }
}

export function IconCardList({
  items,
  dark = false,
  theme = "default",
}: {
  items: IconCardItem[];
  dark?: boolean;
  theme?: "default" | "dark" | "onGold" | "goldFill" | "list";
}) {
  const resolvedTheme = theme === "default" && dark ? "dark" : theme;
  const animateEntrance =
    resolvedTheme === "onGold" || resolvedTheme === "goldFill";
  const isList = resolvedTheme === "list";

  const listRef = useRef<HTMLUListElement>(null);
  const [inView, setInView] = useState(!animateEntrance);

  useEffect(() => {
    if (!animateEntrance || !listRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [animateEntrance]);

  const gridClass = isList
    ? "flex flex-col divide-y divide-[#012555]/10"
    : items.length === 4
      ? "grid gap-5 sm:grid-cols-2"
      : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul ref={listRef} className={gridClass}>
      {items.map((item, index) => {
        const fromLeft = index % 2 === 0;
        const entranceClass = animateEntrance
          ? inView
            ? fromLeft
              ? "animate-gold-slide-left"
              : "animate-gold-slide-right"
            : "opacity-0"
          : "";

        return (
          <li
            key={`${item.icon}-${index}`}
            className={`${
              resolvedTheme === "list"
                ? "flex items-start gap-3 bg-white py-2.5 text-left first:pt-0 last:pb-0"
                : resolvedTheme === "onGold"
                  ? "group flex flex-col items-center rounded-2xl border border-white/30 bg-white p-6 text-center shadow-[0_8px_30px_rgba(1,37,85,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(1,37,85,0.22)]"
                  : resolvedTheme === "goldFill"
                    ? "flex flex-col items-center rounded-xl border border-[#a67828]/40 bg-gradient-to-br from-[#d4a84a] via-[#b98934] to-[#8f6924] p-5 text-center shadow-sm transition hover:border-white/30 hover:shadow-md"
                    : resolvedTheme === "dark"
                      ? "flex flex-col items-center rounded-xl border border-[#ba8831]/25 bg-[#ba8831]/5 p-5 text-center shadow-sm transition hover:border-[#ba8831]/40 hover:shadow-md"
                      : "flex flex-col items-center rounded-xl border border-[#012555]/10 bg-white p-5 text-center shadow-sm transition hover:border-[#ba8831]/30 hover:shadow-md"
            } ${entranceClass}`}
            style={
              animateEntrance && inView
                ? { animationDelay: `${index * 0.12}s` }
                : undefined
            }
          >
            {resolvedTheme === "onGold" && (
              <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ba8831]">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <div
              className={`flex shrink-0 items-center justify-center rounded-xl ${
                isList
                  ? "h-11 w-11 bg-[#012555]/8 text-[#012555]"
                  : `mb-4 h-14 w-14 rounded-2xl ${
                      resolvedTheme === "onGold"
                        ? "bg-[#012555] text-[#ba8831] shadow-md"
                        : resolvedTheme === "goldFill"
                          ? "bg-[#012555] text-white shadow-md"
                          : resolvedTheme === "dark"
                            ? "bg-[#ba8831]/20 text-[#ba8831]"
                            : "bg-[#012555]/8 text-[#012555]"
                    }`
              }`}
            >
              <ListIcon icon={item.icon} />
            </div>
            <p
              className={`leading-snug ${
                isList
                  ? "pt-1.5 text-[1.09rem] font-medium leading-snug text-zinc-700 md:text-[1.24rem] [&_strong]:font-semibold [&_strong]:text-[#012555]"
                  : resolvedTheme === "onGold"
                    ? "text-[1.05rem] font-medium md:text-[1.2rem] [&_strong]:font-bold [&_strong]:text-[#012555]"
                    : resolvedTheme === "goldFill"
                      ? "text-[1.00625rem] font-light md:text-[1.15rem] [&_strong]:font-semibold"
                      : "text-sm font-medium md:text-base"
              } ${
                isList
                  ? ""
                  : resolvedTheme === "onGold"
                    ? "text-[#012555]"
                    : resolvedTheme === "goldFill"
                      ? "text-white"
                      : resolvedTheme === "dark"
                        ? "text-zinc-200"
                        : "text-zinc-700"
              }`}
            >
              {item.text}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
