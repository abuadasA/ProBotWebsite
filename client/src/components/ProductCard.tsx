import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@shared/schema";
import { ArrowRight, Cpu, Zap, Activity, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const [showSpecs, setShowSpecs] = useState(false);
  // Parse features safely since they come as JSONB array
  const features = Array.isArray(product.features) ? product.features : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
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

        {/* Features Preview (always visible or hidden when specs shown) */}
        {!showSpecs && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {features.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                <Activity size={12} className="text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Full Specs Section */}
        <AnimatePresence>
          {showSpecs && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Full Specifications</h4>
                <div className="grid grid-cols-1 gap-2">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 p-2 rounded border border-white/5">
                      <Activity size={12} className="text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action */}
        <button 
          onClick={() => setShowSpecs(!showSpecs)}
          className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300"
        >
          {showSpecs ? "CLOSE SPECS" : "VIEW SPECS"} 
          {showSpecs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </motion.div>
  );
}
