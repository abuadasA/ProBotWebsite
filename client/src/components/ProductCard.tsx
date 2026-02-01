import { motion } from "framer-motion";
import type { Product } from "@shared/schema";
import { ArrowRight, Cpu, Zap, Activity } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  // Parse features safely since they come as JSONB array
  const features = Array.isArray(product.features) ? product.features : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold font-display uppercase tracking-wider backdrop-blur-md">
            <Zap size={12} /> Series X
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-bold text-white font-display mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
          {product.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {features.slice(0, 4).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
              <Activity size={12} className="text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Action */}
        <button className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300">
          VIEW SPECS <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
