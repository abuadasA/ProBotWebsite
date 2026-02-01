import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Cpu, Globe, Shield, Zap } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
//import hero1 from "attached_assets/heroImages/WhatsApp Image 2026-02-02 at 12.06.14 AM.jpeg";


export default function Home() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <Navbar />

        {/* Slideshow Placeholder Images */}
        <div className="absolute inset-0 z-0">
          {[
            "https://images.unsplash.com/photo-1601758123927-3c0f9c30a78c?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1581091012184-1b4b2f13c1e8?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1579710750436-9b1323d3b38c?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1591696331117-8e58c2d3e2b1?auto=format&fit=crop&w=1000&q=80"
          ].map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Slide ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover opacity-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 25,   // full loop duration
                repeat: Infinity,
                delay: i * 5,   // stagger images
                ease: "easeInOut"
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" /> {/* overlay for text readability */}
        </div>

        {/* Hero Text & Buttons */}
        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary tracking-widest uppercase">Next Gen Robotics</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black font-display leading-tight mb-6 text-white">
              Robotics, <br /> The <span className="text-primary">ProBot Way</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Advanced autonomous systems designed to redefine industrial precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
