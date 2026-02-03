import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Cpu, Globe, Shield, Zap } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import logoImg from "@assets/heroimage.png";
import logoImg2 from "@assets/heroimage2.jpeg";
import logoImg3 from "@assets/heroimage3.jpeg";
import logoImg4 from "@assets/heroimage5.jpeg";





export default function Home() {
  const { data: products, isLoading } = useProducts();
const [active, setActive] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActive((prev) => (prev + 1) % 3);
  }, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

        <section className="relative h-[80vh] sm:h-screen flex items-center pt-20 overflow-hidden">
        {/* Hero Background Images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="flex w-[500vw] h-full"
            animate={{ x: `-${active * 100}vw` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img src={logoImg2} className="w-screen h-full object-cover object-center" />
            <img src={logoImg4} className="w-screen h-full object-cover object-center" />
            <img src={logoImg}  className="w-screen h-full object-cover object-top" />
            <img src={logoImg3} className="w-screen h-full object-cover" style={{ objectPosition: "10% 60%" }} />

          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>


        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="
              inline-block mb-4 sm:mb-6
              px-3 py-1.5 sm:px-4 sm:py-2
              rounded-full
              bg-white/5 border border-white/10
              text-primary
              tracking-widest
              text-xs sm:text-sm
            ">
              Build • Learn • Compete
            </span>

            <h1 className="text-white font-extrabold leading-tight normal-case">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">
                Your Robotics
              </span>

              <span className="block mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-primary tracking-wider">
                Journey Starts Here
              </span>
            </h1>

          
          
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 leading-relaxed mt-6 max-w-xl">
              Empowering the next generation of robotics champions with advanced kits, innovative components, and hands-on training.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <button
                  className="
                    px-6 py-3 sm:px-8 sm:py-4
                    bg-primary text-black font-bold
                    text-base sm:text-lg
                    rounded-md
                    hover:bg-white hover:scale-105
                    transition-all duration-300
                    box-glow
                  "
                >
                  EXPLORE PRODUCTS
                </button>
              </Link>

              <Link href="/contact">
                <button
                  className="
                    px-6 py-3 sm:px-8 sm:py-4
                    border border-white/30 text-white font-bold
                    text-base sm:text-lg
                    rounded-md
                    hover:bg-white/10
                    transition-all duration-300
                  "
                >
                  CONTACT US
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

      {/* INSTAGRAM REELS SECTION */}
      <section className="py-24 bg-card/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-12 uppercase tracking-tight">
            Specialized in <span className="text-primary">SUMO Robotics</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "https://www.instagram.com/reel/DSLDkr8gvNT/embed",
              "https://www.instagram.com/reel/DRSK4mhAq2z/embed",
              "https://www.instagram.com/reel/DQUmY8sAsxa/embed"
            ].map((url, i) => (
              <div key={i} className="relative aspect-[9/16] max-w-[320px] mx-auto w-full rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl hover:shadow-primary/20 group">
                <iframe
                  src={url}
                  className="w-full h-full border-0"
                  allowTransparency
                  allow="encrypted-media"
                />
                <div className="absolute inset-0 pointer-events-none border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
