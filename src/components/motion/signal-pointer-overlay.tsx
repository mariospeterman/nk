"use client";

import { useEffect, useRef, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export function SignalPointerOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const host = overlay?.parentElement;
    if (!overlay || !host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarsePointer) return;

    let nextId = 1;

    const setPosition = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      overlay.style.setProperty("--signal-x", `${x}px`);
      overlay.style.setProperty("--signal-y", `${y}px`);
      return { x, y };
    };

    const onMove = (event: PointerEvent) => {
      setPosition(event.clientX, event.clientY);
      overlay.style.setProperty("--signal-opacity", "1");
    };

    const onLeave = () => {
      overlay.style.setProperty("--signal-opacity", "0");
    };

    const onClick = (event: PointerEvent) => {
      const point = setPosition(event.clientX, event.clientY);
      const id = nextId++;
      setRipples((prev) => [...prev, { id, x: point.x, y: point.y }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 560);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    host.addEventListener("click", onClick);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={overlayRef} className="signal-pointer-overlay" aria-hidden="true">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="signal-click-impulse"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  );
}
