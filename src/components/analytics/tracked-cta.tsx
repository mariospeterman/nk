"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type TrackedCtaProps = {
  href: string;
  children: ReactNode;
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
  className?: string;
  newTab?: boolean;
  external?: boolean;
} & VariantProps<typeof buttonVariants>;

export function TrackedCta({
  href,
  children,
  eventName,
  eventProps,
  className,
  newTab = false,
  external,
  variant,
  size,
}: TrackedCtaProps) {
  const treatAsExternal =
    external ?? /^(https?:\/\/|tel:|mailto:)/i.test(href);

  const onClick = () => {
    trackEvent(eventName, eventProps);
  };

  if (treatAsExternal) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <a
          href={href}
          onClick={onClick}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noreferrer noopener" : undefined}
        >
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href} onClick={onClick}>
        {children}
      </Link>
    </Button>
  );
}
