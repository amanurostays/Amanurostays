import Link from "next/link";
import { AlertCircle, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] px-4 py-16 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-800">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-emerald-950 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page or article you requested does not exist or may have been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/blog"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <BookOpen className="w-4 h-4" />
            Blog Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
