import OrderConfirmationClient from "./OrderConfirmationClient";

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
  return <OrderConfirmationClient orderRef={ref} totalThb={totalThb} />;
}
