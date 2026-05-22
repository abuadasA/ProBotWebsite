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
  customerName: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().min(5),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
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

  /* ================= SUCCESS ================= */
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 pt-40 pb-32 flex flex-col items-center text-center">
          <CheckCircle size={80} className="text-primary mb-6" />

          <h1 className="text-4xl font-black text-white mb-4">
            Order Received!
          </h1>

          <p className="text-gray-400 mb-10 max-w-md">
            We will contact you soon.
          </p>

          <Link href="/products">
            <button className="px-8 py-3 bg-primary text-black font-bold rounded-xl">
              Continue Shopping
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 pt-40 pb-32 flex flex-col items-center text-center">
          <ShoppingCart size={60} className="text-gray-600 mb-6" />
          <h1 className="text-3xl font-black text-white mb-3">
            Your Cart is Empty
          </h1>
          <Link href="/products">
            <button className="px-6 py-3 bg-primary text-black font-bold rounded-xl">
              Browse Products
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  /* ================= MAIN ================= */
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4 lg:px-6">

          {/* HEADER */}
          <div className="mb-8">
            <Link href="/products">
              <span className="inline-flex items-center gap-2 text-gray-400 text-sm mb-3">
                <ArrowLeft size={16} /> Back
              </span>
            </Link>

            <h1 className="text-4xl font-black text-white">
              Your <span className="text-primary">Cart</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">

            {/* ================= ITEMS ================= */}
            <div className="lg:col-span-2 space-y-4">

              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden w-full"
                  >

                    {/* IMAGE */}
                    <img
                      src={Array.isArray(item.product.imageUrls) ? item.product.imageUrls[0] : ""}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />

                    {/* INFO */}
                    <div className="flex-1 min-w-0 w-full">
                      <p className="text-white font-bold text-lg break-words whitespace-normal">
                        {item.product.name}
                      </p>

                      <p className="text-primary text-xs uppercase">
                        {item.product.category}
                      </p>

                      <p className="text-gray-300 font-semibold">
                        {(item.product.price * item.quantity).toLocaleString()} JOD
                      </p>
                    </div>

                    {/* CONTROLS */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-3 shrink-0">

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="text-white w-6 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

            </div>

            {/* ================= SUMMARY ================= */}
            <div className="space-y-6">

              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h2 className="text-white font-bold mb-4">Order Summary</h2>

                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-white">
                      {(item.product.price * item.quantity).toLocaleString()} JOD
                    </span>
                  </div>
                ))}

                <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-primary font-black">
                    {totalPrice.toLocaleString()} JOD
                  </span>
                </div>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-3"
              >

                <input
                  {...register("customerName")}
                  placeholder="Full Name"
                  className="w-full p-3 bg-black/30 text-white rounded-lg"
                />

                <input
                  {...register("phone")}
                  placeholder="Phone"
                  className="w-full p-3 bg-black/30 text-white rounded-lg"
                />

                <input
                  {...register("email")}
                  placeholder="Email"
                  className="w-full p-3 bg-black/30 text-white rounded-lg"
                />

                <textarea
                  {...register("address")}
                  placeholder="Address"
                  className="w-full p-3 bg-black/30 text-white rounded-lg"
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-black font-bold rounded-xl"
                >
                  Place Order
                </button>

              </form>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}