"use client";

import { track, plausible, type EventSource } from "@/lib/analytics";

interface BookingLinkProps {
  href: string;
  source: EventSource;
  metadata?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}

export default function BookingLink({
  href,
  source,
  metadata,
  className,
  children,
}: BookingLinkProps) {
  function handleClick() {
    track("booking_click", { source, metadata });
    plausible("Booking", {
      source,
      ...(typeof metadata?.holiday_name === "string"
        ? { holiday: metadata.holiday_name }
        : {}),
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener nofollow sponsored"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
