"use client";

import { useState, useCallback } from "react";
import { Zap, Loader2, Copy, Check, AlertCircle } from "lucide-react";

export function GenerateKeyButton() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(async () => {
    if (state === "loading") return;
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/generate-key", { method: "POST" });
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

  if (state === "done") {
    return (
      <div id="hero-key-generator" className="max-w-md rounded-lg border border-line bg-white p-3">
        <p className="text-xs font-semibold text-ink-2 mb-2">Your API key</p>
        <div className="flex items-center gap-2 rounded-md bg-surface2 px-3 py-2 font-mono text-xs text-ink-1 break-all">
          <span className="flex-1">{apiKey}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(apiKey);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-1 text-brand-green font-semibold"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="mt-2 flex gap-1.5 text-[11px] text-ink-3">
          <AlertCircle size={12} className="mt-0.5 shrink-0" />
          Save this key, it will not be shown again. Use it as Authorization: Bearer fsri_...
        </p>
      </div>
    );
  }

  return (
    <div id="hero-key-generator">
      <button
        onClick={generate}
        disabled={state === "loading"}
        className="bg-brand-green text-white font-semibold text-sm px-5 py-3 rounded-lg hover:bg-brand-green-dark transition-colors flex items-center gap-2 disabled:opacity-70"
      >
        {state === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
        {state === "loading" ? "Generating..." : "Generate Free Key"}
      </button>
      {state === "error" && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-700">
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}
