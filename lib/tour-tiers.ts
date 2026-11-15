// Tour tier contents, shared by the /farm-tour page cards and the homepage
// tour tiles. Keys are i18n keys (lib/translations.ts).

export const standardKeys = [
  "tour.std.1",
  "tour.std.7",
  "tour.std.2",
  "tour.std.3",
  "tour.std.4",
  "tour.std.5",
  "tour.std.6",
] as const;

// THB values shown struck through next to each VIP take-home. Prices are
// currency, not language, so they stay hardcoded. Sum = 3,045 (= "over
// 3,000" in the subtitle). The homemade product (tea / capsules / oil drops /
// massage oil) is picked in person at the shop, valued at the priciest
// option (capsules, 900 THB). The 10% flower discount has no fixed value.
export const vipExtras = [
  { key: "tour.vip.1", value: "800 THB" },
  { key: "tour.vip.2", value: "875 THB" },
  { key: "tour.vip.3", value: "900 THB" },
  { key: "tour.vip.4", value: "140 THB" },
  { key: "tour.vip.5", value: "330 THB" },
  { key: "tour.vip.6", value: null, note: "tour.vip.6.note" },
] as const;
