import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "json" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b2926] shadow-[0_18px_50px_rgba(4,31,29,.18)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="text-[.62rem] font-bold uppercase tracking-[.14em] text-white/45">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-2 text-[.68rem] font-semibold text-[var(--color-mint)] transition hover:text-white"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[.72rem] leading-6 text-[#d8ebe6]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
