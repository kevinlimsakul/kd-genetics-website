import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PAYMENT_DETAILS } from "@/lib/order";

type Props = {
  searchParams: Promise<{ ref?: string; total?: string }>;
};

export const metadata = {
  title: "Order Received — KD Genetics",
  description: "Complete your KD Merch order with PromptPay or Thai bank transfer.",
};

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const { ref, total } = await searchParams;
  const totalThb = total ? Number(total) : null;

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <div className="space-y-3 mb-12">
          <p className="text-[#5A6A4F] font-bold text-[10px] uppercase tracking-[0.3em]">
            Order Received
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
            Thank you, the team has your order.
          </h1>
          <p className="text-base text-[#1E1E1E]/60 font-light leading-relaxed max-w-xl">
            We&apos;ve sent the details to the farm. Complete your payment below
            and the order ships within 3 to 5 business days once payment lands.
          </p>
        </div>

        <div className="border border-black/10 rounded-2xl p-6 md:p-8 bg-[#EAE6DE]/30 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1.5">
                Order Reference
              </p>
              <p className="font-display text-2xl text-[#1E1E1E]">
                {ref ?? "—"}
              </p>
              <p className="text-[11px] text-[#1E1E1E]/45 mt-2 leading-relaxed">
                Use this as the reference / note when you transfer.
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1.5">
                Total Due
              </p>
              <p className="font-display text-3xl text-[#1E1E1E]">
                {totalThb !== null ? `฿${totalThb.toLocaleString()}` : "—"}
              </p>
              <p className="text-[11px] text-[#1E1E1E]/45 mt-2 leading-relaxed">
                Including ฿{80} shipping inside Thailand.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="border border-black/10 rounded-2xl p-6 bg-white/40 flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A6A4F] font-bold mb-3">
              Option 1 · PromptPay / Thai QR
            </p>
            <h3 className="font-display text-xl text-[#1E1E1E] mb-4 leading-snug">
              Scan to pay.
            </h3>
            <div className="relative aspect-[5/8] w-full max-w-[260px] mx-auto rounded-xl overflow-hidden border border-black/5 bg-white">
              <Image
                src="/promptpay-qr.jpg"
                alt="PromptPay QR — KD Koh Tao"
                fill
                sizes="260px"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 space-y-1 text-[12px] text-[#1E1E1E]/70 font-light">
              <p>
                <span className="text-[#1E1E1E]/45">Name: </span>
                {PAYMENT_DETAILS.promptpay.name}
              </p>
              <p>
                <span className="text-[#1E1E1E]/45">PromptPay: </span>
                {PAYMENT_DETAILS.promptpay.id}
              </p>
            </div>
          </div>

          <div className="border border-black/10 rounded-2xl p-6 bg-white/40 flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A6A4F] font-bold mb-3">
              Option 2 · Bank Transfer
            </p>
            <h3 className="font-display text-xl text-[#1E1E1E] mb-4 leading-snug">
              Or transfer directly.
            </h3>
            <div className="space-y-3 text-[13px] text-[#1E1E1E]/80 font-light leading-relaxed">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1">
                  Bank
                </p>
                <p>{PAYMENT_DETAILS.bank.name}</p>
                <p className="text-[#1E1E1E]/55 text-[12px]">
                  Branch: {PAYMENT_DETAILS.bank.branch}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1">
                  Account Name
                </p>
                <p>{PAYMENT_DETAILS.bank.accountName}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1">
                  Account Number
                </p>
                <p className="font-display text-lg text-[#1E1E1E] tracking-wider">
                  {PAYMENT_DETAILS.bank.accountNumber}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-[#1E1E1E]/45 mt-4 leading-relaxed">
              Put your order reference ({ref ?? "—"}) in the transfer note so we
              can match it to your order.
            </p>
          </div>
        </div>

        <div className="border border-black/10 rounded-2xl p-6 md:p-8 bg-[#5A6A4F] text-white mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-semibold">
                Final Step
              </p>
              <h3 className="font-display text-xl text-white leading-snug">
                Send your payment receipt to WhatsApp.
              </h3>
              <p className="text-[13px] text-white/70 font-light leading-relaxed max-w-md">
                A quick screenshot is enough. We confirm payment, then dispatch
                your order within 3 to 5 business days.
              </p>
            </div>
            <a
              href={PAYMENT_DETAILS.receipt.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white text-[#1E1E1E] px-6 py-3 text-[13px] font-semibold tracking-wide hover:bg-white/90 transition-colors"
            >
              WhatsApp {PAYMENT_DETAILS.receipt.whatsappDisplay}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-black/5 pt-6">
          <Link
            href="/shop"
            className="text-[#1E1E1E]/60 hover:text-[#1E1E1E] text-sm font-light inline-flex items-center gap-1.5 transition-colors"
          >
            Continue browsing KD Merch
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <p className="text-[11px] text-[#1E1E1E]/40">
            Questions? Message us on WhatsApp.
          </p>
        </div>
      </section>
    </div>
  );
}
