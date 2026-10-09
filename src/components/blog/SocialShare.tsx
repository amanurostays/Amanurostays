"use client";

import { useState } from "react";
import {
  Share2,
  Check,
  Copy,
  MessageCircle,
} from "lucide-react";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    title + " - " + shareUrl
  )}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  return (
    <div className="py-6 border-y border-slate-200 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Share2 className="w-4 h-4 text-emerald-700" />
          <span>Share this Guide</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp Share */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] transition-colors border border-[#25D366]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Twitter / X */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X (Twitter)"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
          >
            <TwitterIcon className="w-4 h-4" />
            <span className="hidden sm:inline">X / Twitter</span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] transition-colors border border-[#0A66C2]/20"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors border border-[#1877F2]/20"
          >
            <FacebookIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Facebook</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            aria-label="Copy link to clipboard"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              copied
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
