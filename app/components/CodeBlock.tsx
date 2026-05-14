
"use client";

import { CopyBtn } from "./copy-btn";

export function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          <div className="code-dot" style={{ background: "#ef4444" }} />
          <div className="code-dot" style={{ background: "#f59e0b" }} />
          <div className="code-dot" style={{ background: "#22c55e" }} />
        </div>
        <span className="code-title">{lang}</span>
        <CopyBtn text={code} />
      </div>
      <div className="code-body">
        <pre>{code}</pre>
      </div>
    </div>
  );
}