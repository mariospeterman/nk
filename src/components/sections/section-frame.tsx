import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionFrameProps = {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
  tone?: "default" | "section";
  kicker?: string;
  className?: string;
  contentClassName?: string;
};

export function SectionFrame({
  title,
  description,
  children,
  id,
  tone = "default",
  kicker,
  className,
  contentClassName,
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className={cn(
        tone === "section" &&
          "border-y border-border/70 bg-[linear-gradient(180deg,#f4f2ec_0%,#f8f6f1_100%)]",
        className,
      )}
    >
      <div className={cn("site-container section-shell", contentClassName)}>
        <div className="mb-8 max-w-3xl md:mb-10">
          {kicker ? <p className="text-kicker">{kicker}</p> : null}
          <h2 className="mt-2 font-heading text-[1.95rem] leading-[1.08] md:text-[2.5rem]">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-text-body/95">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
