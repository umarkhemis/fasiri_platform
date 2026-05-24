
"use client";

import { useState } from "react";
import {
  ArrowRight, Globe, Volume2, Mic,
  ChevronRight, ExternalLink,
  Terminal, Package, BookOpen, Play, GitBranch, Zap,
} from "lucide-react";




import { KenteMark } from "./components/KentMark";
import { GenerateKeyBtn, ScrollToKeyBtn } from "./components/GenerateKeyBtn";
import { BackToTop } from "./components/BackToTop";
import { CodeBlock } from "./components/CodeBlock";
import { CopyBtn } from "./components/copy-btn";
import { ScrollRevealInit } from "./components/Scroollrevealint";
import { LANGS, CAP_STYLE, PROVIDERS, CODE_EXAMPLES } from "./data/constants";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Python");

  return (
    <>
      {/* Boots the IntersectionObserver for all [data-reveal] elements */}
      <ScrollRevealInit />
      <BackToTop />

      {/* ── Kente bar ── */}
      <div className="kente-bar" aria-hidden />

      {/* ════════════════════════════ NAV ════════════════════════════ */}
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <a href="/" className="nav-brand">
              <KenteMark size={26} />
              <span className="nav-brand-name">fasiri</span>
            </a>
            <div className="nav-links">
              <a href="#how-it-works" className="nav-link">How it works</a>
              <a href="#languages"    className="nav-link">Languages</a>
              <a href="#providers"    className="nav-link">Providers</a>
              <a href="https://umarkhemis.github.io/fasiri"
                target="_blank" rel="noopener noreferrer"
                className="nav-link">Docs</a>
            </div>
            <div className="nav-actions">
              <a href="https://github.com/umarkhemis/fasiri"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost nav-github" aria-label="GitHub">
                <GitBranch size={16} /><span>GitHub</span>
              </a>
              <a href="https://fasiri-bu9u.onrender.com/docs"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline">API Docs</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════ HERO ════════════════════════════ */}
      {/* Hero uses existing fade-up CSS animations (not scroll-reveal)
          because it's above the fold on page load */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid" aria-hidden />
        <div className="hero-bg-glow"  aria-hidden />

        <div className="container">
          <div className="hero-inner">

            {/* Left column */}
            <div className="hero-copy">
              <div className="hero-eyebrow fade-up">
                <Zap size={11} />
                Now Available on PyPI - pip install fasiri
              </div>
              <h1 className="hero-headline fade-up delay-1">
                African language AI,{" "}
                <span className="hero-headline-accent">one API away.</span>
              </h1>
              <p className="hero-sub fade-up delay-2">
                Translate, transcribe, and synthesise speech across 19+ African
                languages. Sunbird AI, Khaya AI, and HuggingFace - unified
                behind a single, consistent interface.
              </p>
              <div className="hero-caps fade-up delay-2">
                {[
                  { icon: <Globe size={13}/>,   label:"Translation"    },
                  { icon: <Mic size={13}/>,     label:"Speech-to-Text" },
                  { icon: <Volume2 size={13}/>, label:"Text-to-Speech" },
                ].map(c => (
                  <span key={c.label} className="hero-cap-pill">
                    {c.icon}{c.label}
                  </span>
                ))}
              </div>
              <div id="hero-key-generator" className="hero-key-area fade-up delay-3">
                <GenerateKeyBtn size="xl" label="Generate Free Key" />
                <a href="https://fasiri.readthedocs.io/"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost btn-xl">
                  <BookOpen size={15} />Read the docs
                </a>
              </div>
              <div className="hero-stats fade-up delay-3">
                {[
                  { num:"19+",  label:"African languages"  },
                  { num:"3",    label:"AI providers, 1 API" },
                  { num:"Free", label:"to start, no card"  },
                ].map(s => (
                  <div key={s.label} className="hero-stat">
                    <span className="hero-stat-num">{s.num}</span>
                    <span className="hero-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — code block */}
            <div className="hero-code-col fade-up delay-2">
              <div className="code-block hero-code-block">
                <div className="code-header">
                  <div className="code-dots">
                    <div className="code-dot" style={{ background:"#ef4444" }} />
                    <div className="code-dot" style={{ background:"#f59e0b" }} />
                    <div className="code-dot" style={{ background:"#22c55e" }} />
                  </div>
                  <span className="code-title">Quick start</span>
                  <CopyBtn text={`pip install fasiri\n\nfrom fasiri import Fasiri\n\nclient = Fasiri(api_key="fsri_...")\nresult = client.translate("Good morning", target="lug")\nprint(result)  # Wasuze otya`} />
                </div>
                <div className="code-body">
                  <pre>
<span className="tok-comment"># 1 · Install</span>{"\n"}
<span className="tok-op">$</span> <span className="tok-fn">pip install</span> fasiri{"\n\n"}
<span className="tok-comment"># 2 · Import</span>{"\n"}
<span className="tok-keyword">from</span> fasiri <span className="tok-keyword">import</span> Fasiri{"\n\n"}
<span className="tok-comment"># 3 · Translate</span>{"\n"}
client <span className="tok-op">=</span> <span className="tok-fn">Fasiri</span>(api_key<span className="tok-op">=</span><span className="tok-string">"fsri_..."</span>){"\n"}
result <span className="tok-op">=</span> client.<span className="tok-fn">translate</span>({"\n"}
{"    "}<span className="tok-string">"Good morning"</span>,{"\n"}
{"    "}target<span className="tok-op">=</span><span className="tok-string">"lug"</span>,{"\n"}
){"\n"}
<span className="tok-fn">print</span>(result){"\n"}
<span className="tok-comment"># → Wasuze otya</span>
                  </pre>
                </div>
              </div>
              <div className="hero-provider-badges" aria-hidden>
                <span className="provider-badge">🌻 Sunbird AI</span>
                <span className="provider-badge">🌍 Khaya AI</span>
                <span className="provider-badge">🤗 HuggingFace</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════════════ HOW IT WORKS ══════════════════════════ */}
      <section className="section" id="how-it-works">
        <div className="container">

          <div className="section-header" data-reveal>
            <span className="section-eyebrow">How it works</span>
            <h2 className="section-title">Three steps to African language AI</h2>
            <p className="section-sub">
              Fasiri handles provider selection, fallback routing, and error
              recovery automatically. You just write the code.
            </p>
          </div>

          <div className="steps-grid">
            {[
              {
                n:"01", icon:<Zap size={20}/>,
                title:"Generate a key",
                desc:"Click the button above. Your API key is ready instantly - no account, no credit card, no waitlist.",
              },
              {
                n:"02", icon:<Terminal size={20}/>,
                title:"Install the SDK",
                desc:"Run pip install fasiri. Full type hints, sync/async support, and comprehensive error handling included.",
              },
              {
                n:"03", icon:<Globe size={20}/>,
                title:"Translate anything",
                desc:"Pass your text and target language. Fasiri picks the best provider and falls back automatically if anything fails.",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className="step-card"
                data-reveal="fade-up"
                data-reveal-delay={String(i + 1)}
              >
                <div className="step-number">{s.n}</div>
                <div className="step-icon">{s.icon}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
                {i < 2 && <div className="step-arrow" aria-hidden><ChevronRight size={18} /></div>}
              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════ LANGUAGES ════════════════════════════ */}
      <section className="section section-tinted" id="languages">
        <div className="container">

          <div className="section-header" data-reveal>
            <span className="section-eyebrow">Languages</span>
            <h2 className="section-title">19+ African languages and counting</h2>
            <p className="section-sub">
              From Uganda to Ghana to Kenya to North Africa. Every card shows
              which capabilities are supported and which provider serves it.
            </p>
          </div>

          <div className="langs-grid">
            {LANGS.map((l, i) => (
              <div
                key={l.code}
                className="lang-card"
                data-reveal="scale"
                data-reveal-delay={String(i % 6)}
              >
                <div className="lang-card-top">
                  <span className="lang-code">{l.code}</span>
                  <span className="lang-provider-badge">{l.provider}</span>
                </div>
                <div className="lang-name">{l.name}</div>
                <div className="lang-native">{l.native} · {l.region}</div>
                <div className="lang-caps">
                  {l.caps.map(c => (
                    <span key={c} className={`cap-badge ${CAP_STYLE[c]}`}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════ PROVIDERS ════════════════════════════ */}
      <section className="section" id="providers">
        <div className="container">

          <div className="section-header" data-reveal>
            <span className="section-eyebrow">Providers</span>
            <h2 className="section-title">Best-in-class providers, unified</h2>
            <p className="section-sub">
              Fasiri routes each request to the provider with the deepest
              expertise for that language. If one fails, the next takes over.
            </p>
          </div>

          <div className="providers-grid">
            {PROVIDERS.map((p, i) => (
              <div
                key={p.name}
                className="provider-card"
                data-reveal="fade-up"
                data-reveal-delay={String(i + 1)}
              >
                <div className="provider-card-header">
                  <div className="provider-icon" style={{ background: p.iconBg }}>
                    {p.icon}
                  </div>
                  <h3 className="provider-name">{p.name}</h3>
                </div>
                <p className="provider-desc">{p.desc}</p>
                <div className="provider-caps">
                  {p.caps.map(c => (
                    <span key={c} className="provider-cap-tag">{c}</span>
                  ))}
                </div>
                <div className="provider-lang-codes">
                  {p.langs.map(code => (
                    <span key={code} className="plang">{code}</span>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="provider-link">
                  <ExternalLink size={12} />Learn more
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════ CODE EXAMPLES ════════════════════════ */}
      <section className="section section-tinted" id="code">
        <div className="container">

          <div className="section-header" data-reveal>
            <span className="section-eyebrow">Code examples</span>
            <h2 className="section-title">Works with every stack</h2>
            <p className="section-sub">
              Use the Python SDK for the best experience, or call the REST API
              directly from any language.
            </p>
          </div>

          <div className="code-tabs" data-reveal="slide-left">
            {Object.keys(CODE_EXAMPLES).map(tab => (
              <button
                key={tab}
                className={`code-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div data-reveal="slide-right">
            <CodeBlock lang={activeTab} code={CODE_EXAMPLES[activeTab]} />
          </div>

          <div className="code-actions" data-reveal data-reveal-delay="1">
            <a href="https://fasiri.readthedocs.io/"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-outline">
              <BookOpen size={14} />Full API reference
            </a>
            <a href="https://pypi.org/project/fasiri/"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost">
              <Package size={14} />PyPI package
            </a>
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════ LIVE DEMO ════════════════════════════ */}
      <section className="section demo-section">
        <div className="container demo-container">

          <span
            className="section-eyebrow"
            style={{ textAlign:"center", display:"block", marginBottom:16 }}
            data-reveal="fade"
          >
            Live demo
          </span>

          <h2
            className="section-title"
            style={{ textAlign:"center", maxWidth:540, margin:"0 auto 16px" }}
            data-reveal
          >
            See Fasiri in action
          </h2>

          <p
            style={{
              textAlign:"center", maxWidth:420, margin:"0 auto 36px",
              fontSize:16, color:"var(--gray-500)", lineHeight:1.7,
            }}
            data-reveal
            data-reveal-delay="1"
          >
            Try the interactive demo - translate English to any African language,
            hear the audio, and chat with an AI that responds in your chosen language.
          </p>

          <div data-reveal="scale" data-reveal-delay="2">
            <a href="https://fasiri-site.vercel.app/"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary btn-xl">
              <Play size={15} />
              Try the live demo
              <ArrowRight size={15} />
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════════════ FINAL CTA ════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-inner-grid" aria-hidden />
        <div className="container cta-content">

          <h2 className="cta-title" data-reveal="slide-left">
            Ready to build for African users?
          </h2>

          <p className="cta-sub" data-reveal data-reveal-delay="1">
            Join developers building the next generation of African language
            applications. Your API key is ready in seconds.
          </p>

          <div className="cta-actions" data-reveal data-reveal-delay="2">
            <ScrollToKeyBtn size="xl" label="Get Your Free Key" />
            <a href="https://github.com/umarkhemis/fasiri"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-xl cta-github-btn">
              <GitBranch size={16} />Star on GitHub
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════════════════ FOOTER ════════════════════════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">

            <div className="footer-brand-col" data-reveal="fade">
              <div className="footer-brand">
                <KenteMark size={22} />
                <span className="footer-brand-name">fasiri</span>
              </div>
              <p className="footer-brand-desc">
                Unified translation and speech API for African languages.
                Powered by Sunbird AI, Khaya AI, and HuggingFace.
              </p>
              <a href="https://github.com/umarkhemis/fasiri"
                target="_blank" rel="noopener noreferrer"
                className="footer-github-link" aria-label="GitHub">
                <GitBranch size={16} />
              </a>
            </div>

            {[
              {
                title: "Product",
                links: [
                  { label:"How it works", href:"#how-it-works", external:false },
                  { label:"Languages",    href:"#languages",    external:false },
                  { label:"Providers",    href:"#providers",    external:false },
                ],
              },
              {
                title: "Developers",
                links: [
                  { label:"Documentation", href:"https://fasiri.readthedocs.io/",        external:true },
                  { label:"API Reference", href:"https://api.fasiri-ai.com/docs", external:true },
                  { label:"Python SDK",    href:"https://pypi.org/project/fasiri/",      external:true },
                  { label:"GitHub",        href:"https://github.com/umarkhemis/fasiri",  external:true },
                ],
              },
              {
                title: "Resources",
                links: [
                  { label:"Live Demo",  href:"https://fasiri-site.vercel.app/",                                         external:true },
                  { label:"Sunbird AI", href:"https://sunbird.ai",                                                      external:true },
                  { label:"Khaya AI",   href:"https://translation.ghananlp.org",                                        external:true },
                  { label:"Changelog",  href:"https://github.com/umarkhemis/fasiri/blob/main/CHANGELOG.md",external:true },
                ],
              },
            ].map((col, i) => (
              <div key={col.title} data-reveal="fade-up" data-reveal-delay={String(i + 1)}>
                <p className="footer-col-title">{col.title}</p>
                <ul className="footer-links-list">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <a href={l.href}
                        {...(l.external ? { target:"_blank", rel:"noopener noreferrer" } : {})}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          <div className="footer-bottom" data-reveal="fade" data-reveal-delay="2">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Beta-Tech Labs. Built for African language developers.
            </p>
            <div className="footer-bottom-links">
              <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://pypi.org/project/fasiri/"     target="_blank" rel="noopener noreferrer">PyPI</a>
              <a href="https://fasiri.readthedocs.io/"        target="_blank" rel="noopener noreferrer">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

