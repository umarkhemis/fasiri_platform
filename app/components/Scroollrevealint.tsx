
"use client";

import { useScrollReveal } from "../hooks/UseScrollreveal";

/**
 * Drop <ScrollRevealInit /> anywhere inside the page (or layout).
 * It renders nothing — just boots the IntersectionObserver.
 */
export function ScrollRevealInit() {
  useScrollReveal();
  return null;
}