import { useCallback, useEffect, useRef, useState } from "react";

export function useProductSlider(productCount: number) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const threshold = 1;
    setCanScrollLeft(el.scrollLeft > threshold);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - threshold,
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || productCount === 0) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [productCount, updateScrollState]);

  const scrollProducts = useCallback((direction: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  }, []);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollProducts,
  };
}
