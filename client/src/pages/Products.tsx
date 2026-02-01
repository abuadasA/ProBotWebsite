import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Products() {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-16 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black font-display text-white mb-6 uppercase tracking-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Fleet</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our cutting-edge robotics solutions engineered for performance, precision, and autonomous operation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-gray-400 font-display tracking-widest">LOADING SYSTEMS...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-32">
            <h3 className="text-2xl text-red-500 font-bold mb-4">System Error</h3>
            <p className="text-gray-400">Failed to load product catalog. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
