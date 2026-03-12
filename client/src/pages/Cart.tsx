import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertOrder } from "@shared/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Full name is required"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { customerName: "", phone: "", email: "", address: "", notes: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: CheckoutForm) => {
      const payload: InsertOrder = {
        customerName: data.customerName,
        phone: data.phone,
        email: data.email || null,
        address: data.address,
        notes: data.notes || null,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
        })),
        totalPrice,
      };
      return apiRequest("POST", "/api/orders", payload);
    },
    onSuccess: () => {
      clearCart();
      setOrderSuccess(true);
    },
  });

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 pt-40 pb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle size={80} className="text-primary mx-auto mb-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black font-display text-white mb-4"
          >
            Order Request Received!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg mb-10 max-w-md"
          >
            Thank you for your order. Our team will contact you shortly to confirm the details.
          </motion.p>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-black font-bold rounded-xl uppercase tracking-wide"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 pt-40 pb-32 flex flex-col items-center text-center">
          <ShoppingCart size={64} className="text-gray-600 mb-6" />
          <h1 className="text-3xl font-black font-display text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Browse our products and add items to your cart.</p>
          <Link href="/products">
            <button className="px-8 py-3 bg-primary text-black font-bold rounded-xl uppercase tracking-wide">
              Browse Products
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Header */}
          <div className="mb-10">
            <Link href="/products">
              <span className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm cursor-pointer mb-4">
                <ArrowLeft size={16} /> Back to Products
              </span>
            </Link>
            <h1 className="text-4xl font-black font-display text-white">
              Your <span className="text-primary">Cart</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="flex items-center gap-5 p-5 rounded-xl bg-white/5 border border-white/10"
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    {/* Image */}
                    <img
                      src={Array.isArray(item.product.imageUrls) ? item.product.imageUrls[0] : ""}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-lg truncate">{item.product.name}</p>
                      {item.product.category && (
                        <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                          {item.product.category}
                        </p>
                      )}
                      <p data-testid={`price-${item.product.id}`} className="text-gray-300 font-semibold">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        data-testid={`button-decrease-${item.product.id}`}
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-primary hover:text-black flex items-center justify-center transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        data-testid={`quantity-${item.product.id}`}
                        className="text-white font-bold w-8 text-center"
                      >
                        {item.quantity}
                      </span>
                      <button
                        data-testid={`button-increase-${item.product.id}`}
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-primary hover:text-black flex items-center justify-center transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      data-testid={`button-remove-${item.product.id}`}
                      onClick={() => removeFromCart(item.product.id)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Column: Summary + Checkout Form */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-400 truncate mr-2">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-white whitespace-nowrap">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-white font-bold">Total</span>
                  <span data-testid="text-total-price" className="text-primary text-xl font-black">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-lg font-bold text-white mb-5">Checkout Details</h2>
                <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      data-testid="input-customer-name"
                      {...register("customerName")}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 text-sm"
                    />
                    {errors.customerName && (
                      <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      data-testid="input-phone"
                      {...register("phone")}
                      placeholder="+1 555 000 0000"
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 text-sm"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Email <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      data-testid="input-email"
                      {...register("email")}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Address <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      data-testid="input-address"
                      {...register("address")}
                      placeholder="123 Main St, City, Country"
                      rows={2}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 text-sm resize-none"
                    />
                    {errors.address && (
                      <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Notes <span className="text-gray-500">(optional)</span>
                    </label>
                    <textarea
                      data-testid="input-notes"
                      {...register("notes")}
                      placeholder="Any special requirements..."
                      rows={2}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 text-sm resize-none"
                    />
                  </div>

                  {mutation.isError && (
                    <p className="text-red-400 text-sm text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <motion.button
                    data-testid="button-place-order"
                    type="submit"
                    disabled={mutation.isPending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-primary text-black font-bold text-lg rounded-xl uppercase tracking-wide hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? "Placing Order..." : "Place Order"}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
