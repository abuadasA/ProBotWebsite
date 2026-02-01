import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Cpu, Globe, Shield, Zap } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary tracking-widest uppercase">Next Gen Robotics</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black font-display leading-tight mb-6">
                FUTURE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">IS NOW.</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed border-l-2 border-primary pl-6">
                Advanced autonomous systems designed to redefine industrial precision. 
                Seamless integration of AI and mechanical engineering.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <button className="px-8 py-4 bg-primary text-black font-bold text-lg rounded hover:bg-white hover:scale-105 transition-all duration-300 box-glow flex items-center justify-center gap-2">
                    EXPLORE UNITS <ArrowRight />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg rounded hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center">
                    CONTACT SALES
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-20 pointer-events-none" />
                {/* robotic arm manufacturing high tech */}
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                  alt="Advanced Robotic Arm" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating tech cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-black/80 backdrop-blur-xl p-6 rounded-xl border border-primary/30 z-30 box-glow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg text-primary">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white font-display">99.9%</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Precision Rate</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Units", value: "500+" },
              { label: "Countries", value: "32" },
              { label: "Uptime", value: "99.9%" },
              { label: "Awards", value: "15" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold font-display text-white mb-2">{stat.value}</div>
                <div className="text-sm text-primary uppercase tracking-widest font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">LATEST <span className="text-primary">MODELS</span></h2>
              <p className="text-gray-400 max-w-xl">Discover our flagship autonomous units designed for heavy industrial applications.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors uppercase font-bold tracking-widest text-sm">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[500px] bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products?.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 text-primary uppercase font-bold tracking-widest text-sm">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 bg-card/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: Globe, 
                title: "Global Connectivity", 
                desc: "Real-time monitoring and control from anywhere in the world via our secure cloud infrastructure." 
              },
              { 
                icon: Shield, 
                title: "Industrial Durability", 
                desc: "Built with aerospace-grade alloys to withstand the harshest environments and continuous operation." 
              },
              { 
                icon: Zap, 
                title: "AI Optimization", 
                desc: "Self-learning algorithms that improve efficiency and predictive maintenance over time." 
              },
            ].map((feature, i) => (
              <div key={i} className="group p-8 border border-white/5 rounded-2xl hover:bg-white/5 hover:border-primary/30 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white font-display mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
