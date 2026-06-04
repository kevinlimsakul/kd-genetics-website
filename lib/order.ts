export type OrderItem = {
  id: string;
  name: string;
  size: string;
  quantity: number;
  unitPrice: number;
};

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type OrderPayload = {
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  shipping: number;
  total: number;
  note?: string;
};

export const SHIPPING_FLAT_THB = 80;

export const PAYMENT_DETAILS = {
  promptpay: {
    id: "084556801318025",
    name: "KD KOH TAO",
  },
  bank: {
    name: "Krungsri (Bank of Ayudhya)",
    branch: "Koh Tao (0780)",
    accountName: "KD Genetics Co., Ltd. (บจก. เคดี เจเนติคส์)",
    accountNumber: "780-1-05572-1",
  },
  receipt: {
    whatsapp: "https://wa.me/66988268290",
    whatsappDisplay: "+66 98 826 8290",
  },
};

export function generateOrderRef(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `KD-${yy}${mm}${dd}-${rand}`;
}

export function formatItemsForAirtable(items: OrderItem[]): string {
  return items
    .map(
      (i) =>
        `${i.quantity}× ${i.name}${i.size && i.size !== "One Size" ? ` (${i.size})` : ""} — ฿${(
          i.unitPrice * i.quantity
        ).toLocaleString()}`,
    )
    .join("\n");
}
