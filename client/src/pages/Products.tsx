import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { Loader2, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@shared/schema";

const ALL_LABEL = "All";

export default function Products() {
  const { data: products, isLoading, isError } = useProducts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);

  const categories = [ALL_LABEL, ...PRODUCT_CATEGORIES];

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === ALL_LABEL || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

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
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
              Fleet
            </span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our cutting-edge robotics solutions engineered for
            performance, precision, and autonomous operation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search + Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 space-y-5"
        >
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              data-testid="input-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
            />
            {search && (
              <button
                data-testid="button-clear-search"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-black border-primary"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-primary/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-gray-400 font-display tracking-widest">
              LOADING SYSTEMS...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-32">
            <h3 className="text-2xl text-red-500 font-bold mb-4">
              System Error
            </h3>
            <p className="text-gray-400">
              Failed to load product catalog. Please try again later.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or selecting a different category.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Result count */}
            <p
              data-testid="text-result-count"
              className="text-sm text-gray-400 mb-6 text-center"
            >
              Showing{" "}
              <span className="text-white font-semibold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "product" : "products"}
              {activeCategory !== ALL_LABEL && (
                <>
                  {" "}
                  in{" "}
                  <span className="text-primary font-semibold">
                    {activeCategory}
                  </span>
                </>
              )}
              {search && (
                <>
                  {" "}
                  matching{" "}
                  <span className="text-primary font-semibold">
                    &ldquo;{search}&rdquo;
                  </span>
                </>
              )}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
