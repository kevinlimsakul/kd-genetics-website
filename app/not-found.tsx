import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F4EF] flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-md">
        <p className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
          404
        </p>
        <h1 className="font-display text-5xl text-[#1E1E1E]">
          Lost in the garden.
        </h1>
        <p className="text-[#6B6B6B] font-light leading-relaxed">
          This page doesn&apos;t exist — but the farm does. Head back and find
          what you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#1E1E1E] text-white rounded-full px-10 h-12 text-sm font-medium hover:bg-[#1E1E1E]/90 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
