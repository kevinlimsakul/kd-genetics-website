"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `${t("contact.waMsg.greeting")}\n\n${t("contact.waMsg.nameLabel")}: ${form.name}\n${t("contact.waMsg.emailLabel")}: ${form.email}\n\n${t("contact.waMsg.messageLabel")}:\n${form.message}`
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
          {t("contact.label.name")}
        </label>
        <input
          type="text"
          placeholder={t("contact.placeholder.name")}
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
          className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
          {t("contact.label.email")}
        </label>
        <input
          type="email"
          placeholder={t("contact.placeholder.email")}
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
          {t("contact.label.message")}
        </label>
        <textarea
          placeholder={t("contact.placeholder.message")}
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
        {sent ? t("contact.cta.opening") : t("contact.cta.send")}
      </button>
    </form>
  );
}
