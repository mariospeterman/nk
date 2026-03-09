import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  description: string;
  kicker?: string;
  children?: ReactNode;
};

export function PageHero({ title, description, kicker, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_8%_0%,rgba(47,143,78,0.16),transparent_36%),radial-gradient(circle_at_90%_6%,rgba(14,74,123,0.14),transparent_42%),linear-gradient(180deg,#fcfcfa_0%,#f9f8f4_100%)]">
      <div className="site-container section-shell">
        {kicker ? <p className="eyebrow">{kicker}</p> : null}
        <h1 className="mt-4 max-w-4xl font-heading text-3xl leading-[1.06] md:text-5xl lg:text-[3.3rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-body md:text-lg">
          {description}
        </p>
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
