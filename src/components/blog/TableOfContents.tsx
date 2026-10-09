"use client";

import { useEffect, useState } from "react";
import { ListOrdered, ChevronDown, ChevronUp } from "lucide-react";
import { BlogHeading } from "@/types/blog";

interface TableOfContentsProps {
  headings: BlogHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    // Observe heading elements as they intersect the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-emerald-100/90 shadow-sm p-4 sm:p-5">
      {/* Header / Mobile Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer lg:cursor-default"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <div className="flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-teal-950">
            Table of Contents
          </span>
        </div>

        {/* Mobile toggle indicator */}
        <button
          className="lg:hidden text-slate-500 hover:text-slate-800 p-1"
          aria-label="Toggle Table of Contents"
        >
          {isMobileOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Heading List: always visible on desktop, toggleable on mobile */}
      <nav
        className={`mt-4 pt-3 border-t border-slate-100 ${
          isMobileOpen ? "block" : "hidden lg:block"
        }`}
      >
        <ul className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1 text-xs">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isH3 = heading.level === 3;

            return (
              <li
                key={heading.id}
                className={`${isH3 ? "ml-3.5" : "ml-0"}`}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block py-1 px-2.5 rounded-lg transition-colors leading-snug ${
                    isActive
                      ? "text-emerald-800 bg-emerald-50/80 font-bold border-l-2 border-emerald-600"
                      : "text-slate-600 hover:text-teal-950 hover:bg-slate-50 font-medium"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
