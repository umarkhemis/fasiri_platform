
"use client";

import { useState, useCallback } from "react";
import { Zap, Loader, AlertCircle } from "lucide-react";
import { KeyReveal } from "./Keyreveal";

// ── Primary hero button — generates an actual key ─────────────────────────
export function GenerateKeyBtn({
  size = "lg",
  label = "Generate Free Key",
}: {
  size?: string;
  label?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");

  const generate = useCallback(async () => {
    if (state === "loading") return;
    setState("loading");
    setError("");

    try {
      const res  = await fetch("/api/generate-key", { method: "POST" });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Failed to generate key. Please try again.");
        setState("error");
        return;
      }

      setApiKey(data.api_key);
      setState("done");
    } catch {
      setError("Network error. Please check your connection.");
      setState("error");
    }
  }, [state]);

  if (state === "done") return <KeyReveal apiKey={apiKey} />;

  return (
    <div>
      <button
        className={`btn btn-primary ${size === "xl" ? "btn-xl" : "btn-lg"}`}
        onClick={generate}
        disabled={state === "loading"}
      >
        {state === "loading" ? (
          <>
            <Loader size={16} className="spin" />
            Generating…
          </>
        ) : (
          <>
            <Zap size={16} />
            {label}
          </>
        )}
      </button>

      {state === "error" && (
        <p style={{
          marginTop: 10, fontSize: 13, color: "#b91c1c",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Scroll-only button — used in the CTA section so only ONE key is created ─
export function ScrollToKeyBtn({
  size = "xl",
  label = "Get Your Free Key",
}: {
  size?: string;
  label?: string;
}) {
  const scrollToHero = () => {
    const el = document.getElementById("hero-key-generator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // Brief visual pulse so user knows where to look
      el.classList.add("key-highlight");
      setTimeout(() => el.classList.remove("key-highlight"), 1800);
    }
  };

  return (
    <button
      className={`btn btn-primary ${size === "xl" ? "btn-xl" : "btn-lg"}`}
      onClick={scrollToHero}
    >
      <Zap size={16} />
      {label}
    </button>
  );
}