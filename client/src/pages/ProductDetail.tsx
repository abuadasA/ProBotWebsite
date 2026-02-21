import { useRoute } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Activity, Cpu, Zap, ArrowLeft, Shield, Globe } from "lucide-react";
import { Link } from "wouter";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const { data: products, isLoading } = useProducts();
  
  const product = products?.find(p => p.id === parseInt(params?.id || "0"));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-primary hover:underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  const features = Array.isArray(product.features) ? product.features : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors uppercase font-bold tracking-widest text-sm mb-12">
            <ArrowLeft size={16} /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Product Visuals */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square lg:aspect-auto lg:h-[600px]"
            >
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold font-display uppercase tracking-wider backdrop-blur-md mb-4">
                  <Zap size={16} /> Series X Advanced
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white font-display uppercase tracking-tight">
                  {product.name}
                </h1>
              </div>
            </motion.div>

            {/* Product Info & Specs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <div className="mb-12">
                <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4">Description</h2>
                <p className="text-xl text-gray-300 leading-relaxed italic">
                  "{product.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <Cpu className="text-primary mb-4" size={32} />
                  <h3 className="text-white font-bold mb-1">Architecture</h3>
                  <p className="text-sm text-gray-400">Next-gen neural processing</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <Shield className="text-primary mb-4" size={32} />
                  <h3 className="text-white font-bold mb-1">Security</h3>
                  <p className="text-sm text-gray-400">Military-grade protection</p>
                </div>
              </div>

              <div>
                <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-6 border-b border-white/10 pb-4">
                  Full Technical Specifications
                </h2>
                <div className="grid gap-4">
                  {features.map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                        <Activity size={20} />
                      </div>
                      <span className="text-gray-200 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-white transition-all transform hover:scale-105 box-glow">
                    INQUIRE NOW
                  </button>
                </Link>
                <div className="flex items-center gap-3 px-6 py-4 rounded-lg border border-white/10 text-gray-400">
                  <Globe size={20} />
                  <span className="text-sm font-medium">Global Support Available</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}