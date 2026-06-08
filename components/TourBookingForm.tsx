"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";

export default function TourBookingForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    date: "",
    people: "",
    package: "standard",
    notes: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/book-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("API error");

      setStatus("success");
      setForm({ name: "", contact: "", date: "", people: "", package: "standard", notes: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      id="tour-booking"
      className="max-w-md mx-auto mt-20 bg-white text-[#1E1E1E] p-10 rounded-2xl shadow-lg space-y-8"
    >
      <div className="text-center">
        <h3 className="font-display text-2xl mb-2">{t("tour.form.heading")}</h3>
        <p className="text-sm text-[#6B6B6B]">{t("tour.form.sub")}</p>
      </div>

      {status === "success" ? (
        <div className="text-center space-y-4 py-8">
          <div className="text-3xl">✓</div>
          <h4 className="font-display text-xl">{t("tour.form.success.heading")}</h4>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            {t("tour.form.success.body")}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs underline text-[#6B6B6B]/70 hover:text-[#6B6B6B] transition-colors"
          >
            {t("tour.form.success.again")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.package")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "standard", labelKey: "tour.form.package.standard" as const },
                { value: "vip", labelKey: "tour.form.package.vip" as const },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, package: opt.value }))}
                  className={`py-2 px-3 rounded-lg border text-[11px] font-medium transition-all ${
                    form.package === opt.value
                      ? "bg-[#1E1E1E] text-white border-[#1E1E1E]"
                      : "bg-transparent text-[#1E1E1E]/60 border-black/10 hover:border-[#1E1E1E]/30"
                  }`}
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.name")}
            </label>
            <input
              type="text"
              placeholder={t("tour.form.placeholder.name")}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.contact")}
            </label>
            <input
              type="text"
              placeholder={t("tour.form.placeholder.contact")}
              value={form.contact}
              onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
              required
              className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
                {t("tour.form.label.date")}
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
                className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
                {t("tour.form.label.people")}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                placeholder={t("tour.form.placeholder.people")}
                value={form.people}
                onChange={(e) => setForm((f) => ({ ...f, people: e.target.value }))}
                required
                className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.notes")}{" "}
              <span className="normal-case tracking-normal font-normal">
                {t("tour.form.label.optional")}
              </span>
            </label>
            <textarea
              placeholder={t("tour.form.placeholder.notes")}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-500 text-center">{t("tour.form.error")}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full h-12 font-medium rounded-full mt-4 transition-all text-sm bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/90 disabled:opacity-50"
          >
            {status === "loading"
              ? t("tour.form.submit.sending")
              : t("tour.form.submit")}
          </button>
          <p className="text-[10px] text-center text-[#6B6B6B]/50 tracking-wide">
            {t("tour.form.limit")}
          </p>
        </form>
      )}
    </div>
  );
}
