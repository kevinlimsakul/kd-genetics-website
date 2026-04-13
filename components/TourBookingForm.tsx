"use client";

import { useState } from "react";

export default function TourBookingForm() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    date: "",
    people: "",
    package: "standard",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi KD Genetics! I'd like to book a farm tour.\n\nName: ${form.name}\nPackage: ${form.package === "vip" ? "VIP — The Full Immersion (3,000 THB)" : "Standard — The Guided Tour (1,500 THB)"}\nDate: ${form.date}\nGuests: ${form.people}\nContact: ${form.contact}`
    );
    window.open(`https://wa.me/66988268290?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
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

        <button
          type="submit"
          className={`w-full h-12 font-medium rounded-full mt-4 transition-all text-sm ${
            sent
              ? "bg-[#5A6A4F] text-white"
              : "bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/90"
          }`}
        >
          {sent ? "Opening WhatsApp..." : "Request Booking via WhatsApp"}
        </button>
        <p className="text-[10px] text-center text-[#6B6B6B]/50 tracking-wide">
          Limited to 10 people per tour
        </p>
      </form>
    </div>
  );
}
