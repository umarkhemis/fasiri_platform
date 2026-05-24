
"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";

export function KeyReveal({ apiKey }: { apiKey: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="key-reveal">
      <p className="key-reveal-title">Your API Key</p>
      <div className="key-box">
        <span className="key-value">{apiKey}</span>
        <button className="key-copy-btn" onClick={copy}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="key-reveal-warning">
        <AlertCircle size={12} style={{ flexShrink: 0, marginTop: 1 }} />
        Save this key - it won&apos;t be shown again. Pass as{" "}
        <code style={{
          fontFamily: "var(--font-mono)",
          background: "rgba(0,0,0,0.08)",
          padding: "1px 6px",
          borderRadius: 4,
        }}>
          Authorization: Bearer fsri_...
        </code>
      </p>
    </div>
  );
}