"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, X, Plus, Minus, ArrowRight, ChevronLeft } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  badge: string;
  images: string[];
};

type CartItem = Product & { size: string; quantity: number };

const SIZES = ["M", "L", "XL", "XXL"];

const PRODUCTS: Product[] = [
  {
    id: "tee-tanote-natural",
    name: "Tanote Bay Tee — Natural",
    description:
      "Hand-printed Tanote Bay map across the front, KD Genetics seal on the chest. Soft natural cotton, made on Koh Tao.",
    price: 800,
    sizes: SIZES,
    badge: "T-Shirt",
    images: [
      "/apparel-papa-graphic.jpg",
      "/apparel-kevin-graphic.jpg",
    ],
  },
  {
    id: "tee-tanote-sand",
    name: "Tanote Bay Tee — Sand",
    description:
      "The same Tanote Bay artwork in a warm sand colourway. KD Genetics seal on the chest, the bay drawn from the water up.",
    price: 800,
    sizes: SIZES,
    badge: "T-Shirt",
    images: [
      "/apparel-papa-plant.jpg",
      "/apparel-papa-rolling.jpg",
      "/apparel-papa-quote-back.jpg",
    ],
  },
  {
    id: "tee-seal-white",
    name: "KD Seal Tee — White",
    description:
      "Clean white tee with the KD Genetics seal on the chest. The everyday piece — worn by the whole family on the farm.",
    price: 800,
    sizes: SIZES,
    badge: "T-Shirt",
    images: [
      "/apparel-three-of-us.jpg",
      "/apparel-kevin.jpg",
      "/apparel-dog.jpg",
    ],
  },
  {
    id: "tee-kohtao-black",
    name: "Koh Tao Tee — Black",
    description:
      "Black tee with the KD Genetics · Koh Tao wordmark across the chest. Quiet, grounded, no hype.",
    price: 800,
    sizes: SIZES,
    badge: "T-Shirt",
    images: [
      "/apparel-papa-black.jpg",
      "/apparel-kevin-black.jpg",
      "/apparel-kevin-quote.jpg",
    ],
  },
];

export default function ShopClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details">("cart");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [activeImage, setActiveImage] = useState<Record<string, number>>({});
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    const size = selectedSizes[product.id] || "";
    if (!size) return;

    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQty = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && i.size === size
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleWhatsAppCheckout = () => {
    const itemList = cart
      .map((i) => `- ${i.name} (${i.size}) x${i.quantity} = ฿${(i.price * i.quantity).toLocaleString()}`)
      .join("\n");
    const msg = encodeURIComponent(
      `Hi KD Genetics! I'd like to order:\n\n${itemList}\n\nTotal: ฿${total.toLocaleString()}\n\nPlease let me know how to proceed with payment and shipping.`
    );
    window.open(`https://wa.me/66988268290?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Cart button (mobile/desktop) */}
      <div className="fixed top-5 right-8 lg:right-12 z-40">
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 text-[#1E1E1E]/70 hover:text-[#1E1E1E] transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#5A6A4F] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      <div className="pt-32 pb-24">
        {/* Header */}
        <section className="container mx-auto px-6 lg:px-12 mb-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-[#5A6A4F] font-bold text-[10px] uppercase tracking-[0.3em]">
              Merchandise
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-[#1E1E1E] leading-none">
              The Shop.
            </h1>
            <p className="text-lg text-[#1E1E1E]/60 font-light leading-relaxed max-w-xl">
              Four tees, printed by hand on Koh Tao. Each one carries the bay,
              the seal, or the island — worn by the family that grows here.
              Made with intention, not for mass consumption.
            </p>
          </div>
        </section>

        {/* Products grid — 4 designs */}
        <section className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-20">
            {PRODUCTS.map((product) => {
              const size = selectedSizes[product.id] || "";
              const needsSize = !size;
              const added = addedItems[product.id];
              const imgIndex = activeImage[product.id] ?? 0;

              return (
                <div key={product.id} className="group">
                  {/* Main image */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-[#EAE6DE]/40">
                    <Image
                      src={product.images[imgIndex]}
                      alt={`${product.name} — view ${imgIndex + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                      priority={product.id === "tee-tanote-natural"}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 mb-5">
                    {product.images.map((src, i) => (
                      <button
                        key={src}
                        onMouseEnter={() =>
                          setActiveImage((prev) => ({ ...prev, [product.id]: i }))
                        }
                        onClick={() =>
                          setActiveImage((prev) => ({ ...prev, [product.id]: i }))
                        }
                        className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          i === imgIndex
                            ? "border-[#1E1E1E]"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        aria-label={`${product.name} view ${i + 1}`}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display text-xl text-[#1E1E1E] leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-[13px] text-[#1E1E1E]/55 mt-1 leading-relaxed font-light">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1E1E1E] text-base">
                        ฿{product.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#1E1E1E]/40 uppercase tracking-widest">
                        THB
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#1E1E1E]/40 mb-2">
                        Size
                      </p>
                      <div className="flex gap-1.5 flex-wrap">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [product.id]: s,
                              }))
                            }
                            className={`min-w-[3rem] h-10 px-3 text-[12px] font-medium rounded-lg border transition-all ${
                              size === s
                                ? "bg-[#1E1E1E] text-white border-[#1E1E1E]"
                                : "bg-transparent text-[#1E1E1E]/60 border-black/10 hover:border-[#1E1E1E]/30 hover:text-[#1E1E1E]"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={needsSize}
                      className={`w-full rounded-full h-11 text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                        added
                          ? "bg-[#5A6A4F] text-white"
                          : needsSize
                          ? "bg-[#1E1E1E]/10 text-[#1E1E1E]/40 cursor-not-allowed"
                          : "bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/90"
                      }`}
                    >
                      {added
                        ? "Added to Cart"
                        : needsSize
                        ? "Select a Size"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Shipping info */}
        <section className="container mx-auto px-6 lg:px-12 mt-32">
          <div className="border border-black/5 rounded-2xl p-8 md:p-12 bg-[#EAE6DE]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5A6A4F]">
                Shipping Info
              </p>
              <h3 className="font-display text-2xl text-[#1E1E1E]">
                Thailand shipping only.
              </h3>
              <p className="text-[#1E1E1E]/50 font-light text-sm leading-relaxed max-w-md">
                We currently ship within Thailand. Orders are packed on Koh Tao
                and dispatched within 3–5 business days.
              </p>
            </div>
            <div className="shrink-0 space-y-1 text-right">
              <p className="text-[11px] text-[#1E1E1E]/40 uppercase tracking-widest">
                Questions?
              </p>
              <a
                href="https://wa.me/66988268290"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5A6A4F] text-sm font-medium hover:underline"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
            onClick={() => {
              setCartOpen(false);
              setCheckoutStep("cart");
            }}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#F6F4EF] z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div className="flex items-center gap-3">
                {checkoutStep === "details" && (
                  <button
                    onClick={() => setCheckoutStep("cart")}
                    className="text-[#1E1E1E]/50 hover:text-[#1E1E1E] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="font-display text-xl text-[#1E1E1E]">
                  {checkoutStep === "cart" ? "Your Cart" : "Checkout"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutStep("cart");
                }}
                className="text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="w-10 h-10 mx-auto text-[#1E1E1E]/20 mb-4" />
                  <p className="text-[#1E1E1E]/40 text-sm font-light">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 items-start py-4 border-b border-black/5 last:border-0"
                    >
                      <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 relative bg-[#EAE6DE]/40">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-[#1E1E1E] text-sm leading-tight">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-[#1E1E1E]/40 mt-0.5">
                              Size: {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-[#1E1E1E]/30 hover:text-[#1E1E1E]/70 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border border-black/10 rounded-full px-2 py-1">
                            <button
                              onClick={() => updateQty(item.id, item.size, -1)}
                              className="text-[#1E1E1E]/50 hover:text-[#1E1E1E] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-[12px] font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.size, 1)}
                              className="text-[#1E1E1E]/50 hover:text-[#1E1E1E] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-medium text-[#1E1E1E] text-sm">
                            ฿{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-black/5 space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-[#1E1E1E]/60 font-light">Total</span>
                  <span className="font-display text-xl text-[#1E1E1E]">
                    ฿{total.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full h-12 rounded-full bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2 transition-all"
                >
                  Order via WhatsApp
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
                <p className="text-center text-[10px] text-[#1E1E1E]/30 font-light">
                  We&apos;ll confirm your order and arrange payment via WhatsApp
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
