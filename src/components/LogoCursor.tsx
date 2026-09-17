import { useEffect, useRef, useState } from "react";
import logoUrl from "../imports/logo.png";
import "./LogoCursor.css";

export default function LogoCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, input, textarea, select, [role='button'], .group, .cursor-pointer")
        );
        setHovering(isInteractive);
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    const updatePosition = () => {
      // Ultra-responsive lerp for fluid 1:1 motion
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;

      if (el) {
        el.style.transform = `translate3d(${currentX - 28}px, ${currentY - 28}px, 0)`;
      }
      raf = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);
    raf = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`logo-cursor-container ${hovering ? "hovering" : ""} ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <img src={logoUrl} alt="" className="logo-cursor-img" />
    </div>
  );
}
