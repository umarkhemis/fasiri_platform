"use client";

import { useState, useCallback } from "react";
import {
  ArrowRight, Copy, Check, Zap, Globe, Mic, Volume2,
  ChevronRight, ExternalLink, AlertCircle,
  Loader, Terminal, Package, BookOpen, Play, GitBranch,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────

const LANGS = [
  { code:"lug", name:"Luganda",    native:"Luganda",    region:"Uganda",       caps:["Translate","STT","TTS"], provider:"Sunbird" },
  { code:"ach", name:"Acholi",     native:"Acholi",     region:"Uganda",       caps:["Translate","STT","TTS"], provider:"Sunbird" },
  { code:"teo", name:"Ateso",      native:"Ateso",      region:"Uganda",       caps:["Translate","STT","TTS"], provider:"Sunbird" },
  { code:"nyn", name:"Runyankore", native:"Runyankore", region:"Uganda",       caps:["Translate","STT","TTS"], provider:"Sunbird" },
  { code:"lgg", name:"Lugbara",    native:"Lugbara",    region:"Uganda",       caps:["Translate","STT","TTS"], provider:"Sunbird" },
  { code:"yo",  name:"Yoruba",     native:"Yoruba",     region:"Nigeria",      caps:["Translate"],             provider:"Khaya"   },
  { code:"tw",  name:"Twi",        native:"Twi",        region:"Ghana",        caps:["Translate"],             provider:"Khaya"   },
  { code:"ee",  name:"Ewe",        native:"Ewe",        region:"Ghana/Togo",   caps:["Translate"],             provider:"Khaya"   },
  { code:"gaa", name:"Ga",         native:"Ga",         region:"Ghana",        caps:["Translate"],             provider:"Khaya"   },
  { code:"dag", name:"Dagbani",    native:"Dagbani",    region:"Ghana",        caps:["Translate"],             provider:"Khaya"   },
  { code:"ki",  name:"Kikuyu",     native:"Gikuyu",     region:"Kenya",        caps:["Translate"],             provider:"Khaya"   },
  { code:"luo", name:"Luo",        native:"Dholuo",     region:"Kenya",        caps:["Translate"],             provider:"Khaya"   },
  { code:"mer", name:"Kimeru",     native:"Kimeru",     region:"Kenya",        caps:["Translate"],             provider:"Khaya"   },
  { code:"kus", name:"Kusaal",     native:"Kusaal",     region:"Ghana",        caps:["Translate"],             provider:"Khaya"   },
  { code:"sw",  name:"Swahili",    native:"Kiswahili",  region:"East Africa",  caps:["Translate","STT"],       provider:"HuggingFace" },
  { code:"fr",  name:"French",     native:"Francais",   region:"Francophone",  caps:["Translate"],             provider:"HuggingFace" },
  { code:"ar",  name:"Arabic",     native:"العربية",    region:"North Africa", caps:["Translate"],             provider:"HuggingFace" },
  { code:"af",  name:"Afrikaans",  native:"Afrikaans",  region:"South Africa", caps:["Translate"],             provider:"HuggingFace" },
];

const CAP_STYLE: Record<string, string> = {
  Translate: "cap-translate",
  STT:       "cap-stt",
  TTS:       "cap-tts",
};

const PROVIDERS = [
  {
    name: "Sunbird AI",
    icon: "🌻",
    iconBg: "#f0fdf4",
    desc: "Built specifically for Ugandan languages. Powers translation, speech-to-text, and text-to-speech for Luganda, Acholi, Ateso, Runyankore, and Lugbara.",
    caps: ["Translation", "Speech-to-Text", "Text-to-Speech"],
    langs: ["lug","ach","teo","nyn","lgg"],
    url: "https://sunbird.ai",
  },
  {
    name: "Khaya AI",
    icon: "🌍",
    iconBg: "#fffbeb",
    desc: "Purpose-built for West and East African languages. GhanaNLP's translation API v2 covering Yoruba, Twi, Ewe, Ga, Dagbani, Kikuyu, Luo, and more.",
    caps: ["Translation"],
    langs: ["yo","tw","ee","gaa","dag","ki","luo","mer","kus"],
    url: "https://translation.ghananlp.org",
  },
  {
    name: "HuggingFace",
    icon: "🤗",
    iconBg: "#eff6ff",
    desc: "Helsinki-NLP opus-mt models for Swahili, French, Arabic, and Afrikaans. Acts as the universal fallback layer when primary providers are unavailable.",
    caps: ["Translation"],
    langs: ["sw","fr","ar","af"],
    url: "https://huggingface.co/Helsinki-NLP",
  },
];

const CODE_EXAMPLES: Record<string, string> = {
  Python: `from fasiri import Fasiri

client = Fasiri(api_key="fsri_...")

# Translate English to Luganda
result = client.translate(
    "Good morning, how are you?",
    target="lug",
)
print(result.translated_text)
# Output: "Wasuze otya, oli otya?"
print(result.provider)      # "sunbird"
print(result.quality_score) # 0.92

# Batch translate
batch = client.translate_batch([
    {"id":"1", "text":"Thank you", "target":"yo"},
    {"id":"2", "text":"Welcome",   "target":"sw"},
    {"id":"3", "text":"Hello",     "target":"tw"},
])
for item in batch.successful():
    print(item.translated_text)`,

  cURL: `curl -X POST https://fasiri-bu9u.onrender.com/api/v1/translate \\
  -H "Authorization: Bearer fsri_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Good morning, how are you?",
    "target_lang": "lug",
    "source_lang": "en",
    "provider": "auto"
  }'

# Response:
# {
#   "translated_text": "Wasuze otya, oli otya?",
#   "provider": "sunbird",
#   "quality_score": 0.92,
#   "latency_ms": 1823
# }`,

  JavaScript: `const response = await fetch(
  "https://fasiri-bu9u.onrender.com/api/v1/translate",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer fsri_...",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: "Good morning, how are you?",
      target_lang: "lug",
      provider: "auto",
    }),
  }
);

const data = await response.json();
console.log(data.translated_text);
// "Wasuze otya, oli otya?"
console.log(data.provider);
// "sunbird"`,
};

const PRICING = [
  {
    plan: "Free",
    price: "0",
    period: "forever",
    desc: "Everything you need to build and experiment with African language AI.",
    features: [
      "60 requests per minute",
      "All 19+ African languages",
      "Translation, STT, and TTS",
      "Python SDK included",
      "Full API access",
      "Community support",
    ],
    cta: "Generate Free Key",
    featured: false,
  },
  {
    plan: "Pro",
    price: "Coming Soon",
    period: "",
    desc: "For production applications that need higher limits and dedicated support.",
    features: [
      "Higher rate limits",
      "Priority routing",
      "Dedicated support",
      "SLA guarantee",
      "Usage analytics",
      "Custom integrations",
    ],
    cta: "Join Waitlist",
    featured: true,
    badge: "Coming Soon",
  },
];

// ── Kente mark ────────────────────────────────────────────────────────────

function KenteMark({ size = 28 }: { size?: number }) {
  const b = Math.round(size * 0.27);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <rect x={0} y={0}         width={b}         height={size}       rx={2} fill="#2D7D46" />
      <rect x={0} y={0}         width={size}      height={b}          rx={2} fill="#C8860A" />
      <rect x={0} y={size*0.5}  width={size*0.78} height={b}          rx={2} fill="#B91C1C" />
      <rect x={b} y={b}         width={b}         height={size*0.5-b} rx={0} fill="#2D7D46" />
    </svg>
  );
}

// ── Copy button ───────────────────────────────────────────────────────────

function CopyBtn({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="code-copy"
      onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); }}
    >
      {done ? <Check size={12} /> : <Copy size={12} />}
      {done ? "Copied" : label}
    </button>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────

function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <Check size={15} color="#86efac" />
      {message}
    </div>
  );
}

// ── Key reveal ────────────────────────────────────────────────────────────

function KeyReveal({ apiKey }: { apiKey: string }) {
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
        Save this key - it will not be shown again. Pass it as{" "}
        <code style={{ fontFamily: "var(--font-mono)", background: "#e5e7eb", padding: "1px 5px", borderRadius: 4 }}>
          Authorization: Bearer fsri_...
        </code>
      </p>
    </div>
  );
}

// ── Generate key button ───────────────────────────────────────────────────

function GenerateKeyBtn({ size = "lg", label = "Generate Free Key" }: { size?: string; label?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [apiKey, setApiKey] = useState("");
  const [error, setError]   = useState("");

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

  if (state === "done") {
    return <KeyReveal apiKey={apiKey} />;
  }

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
            Generating...
          </>
        ) : (
          <>
            <Zap size={16} />
            {label}
          </>
        )}
      </button>
      {state === "error" && (
        <p style={{ marginTop: 10, fontSize: 13, color: "#b91c1c", display: "flex", alignItems: "center", gap: 6 }}>
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Code block ────────────────────────────────────────────────────────────

function CodeBlock({ lang, code }: { lang: string; code: string }) {
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

// ── Main page ─────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState("Python");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ── Nav ── */}
      <div className="kente" />
      <nav>
        <div className="container">
          <div className="nav-inner">
            <a href="/" className="nav-brand">
              <KenteMark size={26} />
              fasiri
            </a>

            <div className="nav-links">
              <a href="#how-it-works" className="nav-link">How it works</a>
              <a href="#languages"    className="nav-link">Languages</a>
              <a href="#providers"    className="nav-link">Providers</a>
              <a
                href="https://umarkhemis.github.io/fasiri"
                target="_blank" rel="noopener noreferrer"
                className="nav-link"
              >
                Docs
              </a>
            </div>

            <div className="nav-actions">
              <a
                href="https://github.com/umarkhemis/fasiri"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ padding: "7px 12px" }}
              >
                <GitBranch size={16} />
              </a>
              <a
                href="https://fasiri-bu9u.onrender.com/docs"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline"
              >
                API Docs
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <div className="fade-up">
            <div className="hero-eyebrow">
              <Zap size={12} />
              Now available on PyPI - pip install fasiri
            </div>
          </div>

          <h1 className="hero-headline fade-up delay-1">
            African language AI,<br />
            <mark>one API away.</mark>
          </h1>

          <p className="hero-sub fade-up delay-2">
            Translate, transcribe, and synthesise speech across 19+ African languages.
            Powered by Sunbird AI, Khaya AI, and HuggingFace - all behind a single,
            consistent interface.
          </p>

          <div className="hero-actions fade-up delay-3">
            <GenerateKeyBtn size="xl" label="Generate Free Key" />
            <a
              href="https://fasiri.readthedocs.io/"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-outline btn-xl"
            >
              <BookOpen size={16} />
              Read the docs
            </a>
          </div>

          {/* Live code preview */}
          <div className="fade-up delay-3" style={{ maxWidth: 600 }}>
            <div className="code-block">
              <div className="code-header">
                <div className="code-dots">
                  <div className="code-dot" style={{ background: "#ef4444" }} />
                  <div className="code-dot" style={{ background: "#f59e0b" }} />
                  <div className="code-dot" style={{ background: "#22c55e" }} />
                </div>
                <span className="code-title">Quick start</span>
                <CopyBtn text={`pip install fasiri\n\nfrom fasiri import Fasiri\n\nclient = Fasiri(api_key="fsri_...")\nresult = client.translate("Good morning", target="lug")\nprint(result)  # Wasuze otya`} />
              </div>
              <div className="code-body">
                <pre>
                  <span className="tok-comment"># Install</span>{"\n"}
                  <span className="tok-op">$</span> <span className="tok-fn">pip install</span> fasiri{"\n\n"}
                  <span className="tok-keyword">from</span> fasiri <span className="tok-keyword">import</span> Fasiri{"\n\n"}
                  client <span className="tok-op">=</span> <span className="tok-fn">Fasiri</span>(api_key<span className="tok-op">=</span><span className="tok-string">"fsri_..."</span>){"\n"}
                  result <span className="tok-op">=</span> client.<span className="tok-fn">translate</span>(<span className="tok-string">"Good morning"</span>, target<span className="tok-op">=</span><span className="tok-string">"lug"</span>){"\n"}
                  <span className="tok-fn">print</span>(result)  <span className="tok-comment"># Wasuze otya</span>
                </pre>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-bar fade-up delay-3">
            {[
              { num: "19",  sup: "+", desc: "African languages" },
              { num: "3",   sup: "",  desc: "AI providers, 1 API" },
              { num: "100", sup: "%", desc: "Free to start" },
            ].map((s) => (
              <div key={s.desc} className="stat-cell">
                <div className="stat-num">
                  {s.num}<span>{s.sup}</span>
                </div>
                <div className="stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── How it works ── */}
      <section className="section" id="how-it-works">
        <div className="container">
          <span className="section-label">How it works</span>
          <h2 className="section-title">Three steps to African language AI</h2>
          <p className="section-sub">
            Fasiri handles provider selection, fallback routing, and error recovery
            automatically. You just write the code.
          </p>

          <div className="steps-grid">
            {[
              {
                n: "1",
                icon: <Zap size={18} color="var(--green-mid)" />,
                title: "Generate a key",
                desc: "Click the button above. Your API key is ready instantly - no account required, no credit card, no waitlist.",
              },
              {
                n: "2",
                icon: <Terminal size={18} color="var(--green-mid)" />,
                title: "Install the SDK",
                desc: "Run pip install fasiri. The Python SDK comes with full type hints, sync and async support, and comprehensive error handling.",
              },
              {
                n: "3",
                icon: <Globe size={18} color="var(--green-mid)" />,
                title: "Translate anything",
                desc: "Pass your text and target language. Fasiri picks the best provider automatically and falls back if anything goes wrong.",
              },
            ].map((s) => (
              <div key={s.n} className="step-cell">
                <div className="step-num">{s.n}</div>
                <div style={{ marginBottom: 12 }}>{s.icon}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Languages ── */}
      <section className="section" id="languages" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <span className="section-label">Languages</span>
          <h2 className="section-title">19+ African languages and counting</h2>
          <p className="section-sub">
            From Uganda to Ghana to Kenya to North Africa. Every language shows
            which capabilities are supported and which provider serves it.
          </p>

          <div className="langs-grid">
            {LANGS.map((l) => (
              <div key={l.code} className="lang-card">
                <div className="lang-name">{l.name}</div>
                <div className="lang-native">{l.native} - {l.region}</div>
                <div className="lang-caps">
                  {l.caps.map((c) => (
                    <span key={c} className={`cap-badge ${CAP_STYLE[c]}`}>{c}</span>
                  ))}
                </div>
                <div className="lang-provider">{l.provider}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Providers ── */}
      <section className="section" id="providers">
        <div className="container">
          <span className="section-label">Providers</span>
          <h2 className="section-title">Best-in-class providers, unified</h2>
          <p className="section-sub">
            Fasiri routes each request to the provider with the deepest expertise
            for that language. If one fails, the next takes over automatically.
          </p>

          <div className="providers-grid">
            {PROVIDERS.map((p) => (
              <div key={p.name} className="provider-card">
                <div className="provider-icon" style={{ background: p.iconBg }}>
                  {p.icon}
                </div>
                <h3 className="provider-name">{p.name}</h3>
                <p className="provider-desc">{p.desc}</p>
                <div style={{ marginBottom: 16 }}>
                  {p.caps.map((c) => (
                    <span key={c} style={{
                      display:"inline-block", marginRight:6, marginBottom:6,
                      fontSize:11, fontWeight:600, padding:"3px 9px",
                      borderRadius:99, background:"var(--gray-100)", color:"var(--gray-600)"
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
                <div className="provider-langs">
                  {p.langs.map((c) => (
                    <span key={c} className="plang">{c}</span>
                  ))}
                </div>
                <a
                  href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:"inline-flex", alignItems:"center", gap:5,
                    marginTop:18, fontSize:13, color:"var(--gray-500)",
                    transition:"color 0.15s"
                  }}
                >
                  <ExternalLink size={12} />
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Code examples ── */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <span className="section-label">Code examples</span>
          <h2 className="section-title">Works with every stack</h2>
          <p className="section-sub" style={{ marginBottom: 32 }}>
            Use the Python SDK for the best experience, or call the REST API
            directly from any language.
          </p>

          <div className="code-tabs">
            {Object.keys(CODE_EXAMPLES).map((tab) => (
              <button
                key={tab}
                className={`code-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <CodeBlock lang={activeTab} code={CODE_EXAMPLES[activeTab]} />

          <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:24, flexWrap:"wrap" }}>
            <a
              href="https://fasiri.readthedocs.io/"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <BookOpen size={14} />
              Full API reference
            </a>
            <a
              href="https://pypi.org/project/fasiri/"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <Package size={14} />
              PyPI package
            </a>
          </div>
        </div>
      </section>


      <div className="divider" />

      {/* ── Demo CTA ── */}
      <section className="section">
        <div className="container" style={{ textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <span className="section-label">Live demo</span>
          <h2 className="section-title" style={{ maxWidth:560, textAlign:"center" }}>
            See Fasiri in action
          </h2>
          <p style={{ fontSize:17, color:"var(--gray-500)", maxWidth:440, lineHeight:1.65, marginBottom:32 }}>
            Try the interactive demo - translate English to any African language,
            hear the audio, and chat with an AI that responds in your chosen language.
          </p>
          <a
            href="https://fasiri-site.vercel.app/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary btn-xl"
          >
            <Play size={16} />
            Try the live demo
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">
            Ready to build for African users?
          </h2>
          <p className="cta-sub">
            Join developers building the next generation of African language applications.
            Your API key is ready in seconds.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <GenerateKeyBtn size="xl" label="Generate Free Key" />
            <a
              href="https://github.com/umarkhemis/fasiri"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-xl"
              style={{
                background:"rgba(255,255,255,0.1)",
                color:"white",
                border:"1px solid rgba(255,255,255,0.15)"
              }}
            >
              <GitBranch size={16} />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <KenteMark size={24} />
                <span className="footer-brand-name">fasiri</span>
              </div>
              <p className="footer-brand-desc">
                Unified translation and speech API for African languages.
                Powered by Sunbird AI, Khaya AI, and HuggingFace.
              </p>
              <div style={{ display:"flex", gap:10, marginTop:8 }}>
                <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer"
                  style={{ color:"var(--gray-500)", transition:"color 0.15s" }}>
                  <GitBranch size={18} />
                </a>
              </div>
            </div>

            <div>
              <p className="footer-col-title">Product</p>
              <ul className="footer-links-list">
                <li><a href="#how-it-works">How it works</a></li>
                <li><a href="#languages">Languages</a></li>
                <li><a href="#providers">Providers</a></li>
              </ul>
            </div>

            <div>
              <p className="footer-col-title">Developers</p>
              <ul className="footer-links-list">
                <li><a href="https://fasiri.readthedocs.io/" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                <li><a href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer">API Reference</a></li>
                <li><a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer">Python SDK</a></li>
                <li><a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>

            <div>
              <p className="footer-col-title">Resources</p>
              <ul className="footer-links-list">
                <li><a href="https://fasiri-site.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a></li>
                <li><a href="https://sunbird.ai" target="_blank" rel="noopener noreferrer">Sunbird AI</a></li>
                <li><a href="https://translation.ghananlp.org" target="_blank" rel="noopener noreferrer">Khaya AI</a></li>
                <li><a href="https://github.com/umarkhemis/fasiri/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">Changelog</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Beta-Tech Labs. Built for African language developers.
            </p>
            <div className="footer-bottom-links">
              <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer">PyPI</a>
              <a href="https://fasiri.readthedocs.io/" target="_blank" rel="noopener noreferrer">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
