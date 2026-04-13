"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function TourBookingForm() {
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
        <h3 className="font-display text-2xl mb-2">Book Your Tour</h3>
        <p className="text-sm text-[#6B6B6B]">
          Secure your spot in our guided farm experience.
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center space-y-4 py-8">
          <div className="text-3xl">✓</div>
          <h4 className="font-display text-xl">You're on the list.</h4>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Your booking request has been received. We'll reach out to confirm
            your spot and share everything you need to know before your visit.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs underline text-[#6B6B6B]/70 hover:text-[#6B6B6B] transition-colors"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Package selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              Package
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "standard", label: "Standard — 1,500 THB" },
                { value: "vip", label: "VIP — 3,000 THB" },
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
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              WhatsApp / Line
            </label>
            <input
              type="text"
              placeholder="+66 ..."
              value={form.contact}
              onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
              required
              className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
                Date
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
                People
              </label>
              <input
                type="number"
                min="1"
                max="10"
                placeholder="1"
                value={form.people}
                onChange={(e) => setForm((f) => ({ ...f, people: e.target.value }))}
                required
                className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              Notes{" "}
              <span className="normal-case tracking-normal font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="Any questions, dietary needs, or special requests?"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-500 text-center">
              Something went wrong. Please try again or message us directly on WhatsApp.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full h-12 font-medium rounded-full mt-4 transition-all text-sm bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/90 disabled:opacity-50"
          >
            {status === "loading" ? "Sending your request..." : "Request to Book"}
          </button>
          <p className="text-[10px] text-center text-[#6B6B6B]/50 tracking-wide">
            Limited to 10 people per tour
          </p>
        </form>
      )}
    </div>
  );
}
