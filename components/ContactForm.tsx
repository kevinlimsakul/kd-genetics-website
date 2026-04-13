"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi KD Genetics!\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(`https://wa.me/66988268290?text=${msg}`, "_blank");
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
          Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
          className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
          Email
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
          Message
        </label>
        <textarea
          placeholder="Tell us what you're looking for..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className={`w-full h-12 rounded-full text-sm font-medium transition-all ${
          sent
            ? "bg-[#5A6A4F] text-white"
            : "bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/90"
        }`}
      >
        {sent ? "Opening WhatsApp..." : "Send Message"}
      </button>
    </form>
  );
}
