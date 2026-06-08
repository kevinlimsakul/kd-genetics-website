"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PAYMENT_DETAILS, SHIPPING_FLAT_THB } from "@/lib/order";
import { useLanguage } from "@/lib/i18n";

type Props = {
  orderRef: string | undefined;
  totalThb: number | null;
};

export default function OrderConfirmationClient({ orderRef, totalThb }: Props) {
  const { t } = useLanguage();
  const ref = orderRef ?? "—";

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <div className="space-y-3 mb-12">
          <p className="text-[#5A6A4F] font-bold text-[10px] uppercase tracking-[0.3em]">
            {t("confirm.eyebrow")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
            {t("confirm.heading")}
          </h1>
          <p className="text-base text-[#1E1E1E]/60 font-light leading-relaxed max-w-xl">
            {t("confirm.sub")}
          </p>
        </div>

        <div className="border border-black/10 rounded-2xl p-6 md:p-8 bg-[#EAE6DE]/30 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1.5">
                {t("confirm.ref.label")}
              </p>
              <p className="font-display text-2xl text-[#1E1E1E]">{ref}</p>
              <p className="text-[11px] text-[#1E1E1E]/45 mt-2 leading-relaxed">
                {t("confirm.ref.note")}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1.5">
                {t("confirm.total.label")}
              </p>
              <p className="font-display text-3xl text-[#1E1E1E]">
                {totalThb !== null ? `฿${totalThb.toLocaleString()}` : "—"}
              </p>
              <p className="text-[11px] text-[#1E1E1E]/45 mt-2 leading-relaxed">
                {t("confirm.total.notePrefix")} ฿{SHIPPING_FLAT_THB}{" "}
                {t("confirm.total.noteSuffix")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="border border-black/10 rounded-2xl p-6 bg-white/40 flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A6A4F] font-bold mb-3">
              {t("confirm.promptpay.eyebrow")}
            </p>
            <h3 className="font-display text-xl text-[#1E1E1E] mb-4 leading-snug">
              {t("confirm.promptpay.heading")}
            </h3>
            <div className="relative aspect-[5/8] w-full max-w-[260px] mx-auto rounded-xl overflow-hidden border border-black/5 bg-white">
              <Image
                src="/promptpay-qr.jpg"
                alt={t("confirm.promptpay.qrAlt")}
                fill
                sizes="260px"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 space-y-1 text-[12px] text-[#1E1E1E]/70 font-light">
              <p>
                <span className="text-[#1E1E1E]/45">
                  {t("confirm.promptpay.nameLabel")}{" "}
                </span>
                {PAYMENT_DETAILS.promptpay.name}
              </p>
              <p>
                <span className="text-[#1E1E1E]/45">
                  {t("confirm.promptpay.idLabel")}{" "}
                </span>
                {PAYMENT_DETAILS.promptpay.id}
              </p>
            </div>
          </div>

          <div className="border border-black/10 rounded-2xl p-6 bg-white/40 flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A6A4F] font-bold mb-3">
              {t("confirm.bank.eyebrow")}
            </p>
            <h3 className="font-display text-xl text-[#1E1E1E] mb-4 leading-snug">
              {t("confirm.bank.heading")}
            </h3>
            <div className="space-y-3 text-[13px] text-[#1E1E1E]/80 font-light leading-relaxed">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1">
                  {t("confirm.bank.bankLabel")}
                </p>
                <p>{PAYMENT_DETAILS.bank.name}</p>
                <p className="text-[#1E1E1E]/55 text-[12px]">
                  {t("confirm.bank.branchPrefix")} {PAYMENT_DETAILS.bank.branch}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1">
                  {t("confirm.bank.accountName")}
                </p>
                <p>{PAYMENT_DETAILS.bank.accountName}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1E1E1E]/40 font-semibold mb-1">
                  {t("confirm.bank.accountNumber")}
                </p>
                <p className="font-display text-lg text-[#1E1E1E] tracking-wider">
                  {PAYMENT_DETAILS.bank.accountNumber}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-[#1E1E1E]/45 mt-4 leading-relaxed">
              {t("confirm.bank.notePrefix")}
              {ref}
              {t("confirm.bank.noteSuffix")}
            </p>
          </div>
        </div>

        <div className="border border-black/10 rounded-2xl p-6 md:p-8 bg-[#5A6A4F] text-white mb-10">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-semibold">
              {t("confirm.next.eyebrow")}
            </p>
            <h3 className="font-display text-xl text-white leading-snug">
              {t("confirm.next.heading")}
            </h3>
            <ul className="space-y-2 pt-1 text-[13.5px] text-white/85 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 mt-[3px] shrink-0 text-white/70" />
                <span>{t("confirm.next.bullet1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 mt-[3px] shrink-0 text-white/70" />
                <span>{t("confirm.next.bullet2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 mt-[3px] shrink-0 text-white/70" />
                <span>{t("confirm.next.bullet3")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-black/5 pt-6">
          <Link
            href="/shop"
            className="text-[#1E1E1E]/60 hover:text-[#1E1E1E] text-sm font-light inline-flex items-center gap-1.5 transition-colors"
          >
            {t("confirm.continue")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={PAYMENT_DETAILS.receipt.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#1E1E1E]/40 hover:text-[#1E1E1E]/70 transition-colors"
          >
            {t("confirm.questionsCtaPrefix")} {PAYMENT_DETAILS.receipt.whatsappDisplay}
          </a>
        </div>
      </section>
    </div>
  );
}
