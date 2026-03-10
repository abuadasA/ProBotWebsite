import { useRoute } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageCarousel } from "@/components/ImageCarousel";
import { motion } from "framer-motion";
import { Activity, Zap, ArrowLeft, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { Link } from "wouter";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const { data: products, isLoading } = useProducts();

  const product = products?.find((p) => p.id === parseInt(params?.id || "0"));

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
          <Link href="/products" className="text-primary hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const features = Array.isArray(product.features) ? product.features : [];
  const productImages = Array.isArray(product.imageUrls) ? product.imageUrls : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <Link href="/products">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 cursor-pointer text-sm"
            >
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </motion.div>
          </Link>

          {/* Main Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
            {/* Left: Image Carousel (Sticky on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:sticky lg:top-32 lg:h-fit"
            >
              <ImageCarousel images={productImages} productName={product.name} />
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold font-display uppercase tracking-wider">
                  <Zap size={14} /> Advanced Series
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-black font-display text-white mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Price Section */}
              <div className="mb-8 pb-8 border-b border-white/10">
                {/* <p className="text-sm text-gray-400 mb-2">STARTING PRICE</p> */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white">${(product.price || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Key Features Highlights */}
              <div className="grid grid-cols-3 gap-4 mb-8 lg:mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check size={18} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">In Stock</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck size={18} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <RotateCcw size={18} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">30-Day Return</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-primary text-black font-bold text-lg rounded-xl hover:bg-white transition-all box-glow uppercase tracking-wide"
                  >
                    Request Quote
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-white/50 transition-all uppercase tracking-wide"
                >
                  Add to Wishlist
                </motion.button>
              </div>

              {/* Trust Badges */}
              {/* <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">
                  Why Choose This Product
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Shield size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>Military-grade security and reliability</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Zap size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>Industry-leading performance metrics</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Truck size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>Global support and maintenance</span>
                  </li>
                </ul>
              </div> */}
            </motion.div>
          </div>

          {/* Specs & Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            {/* Features Section */}
            <div className="border-t border-white/10 pt-16">
              <h2 className="text-3xl lg:text-4xl font-black font-display text-white mb-12">
                Key <span className="text-primary">Features</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                        <Activity size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{feature.split(":")[0]}</h3>
                        {/* <p className="text-gray-400 text-sm">{feature.split(":")[1] || "Premium feature included"}</p> */}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="border-t border-white/10 pt-16">
              <h2 className="text-3xl lg:text-4xl font-black font-display text-white mb-12">
                Technical <span className="text-primary">Specifications</span>
              </h2>
              <div className="grid gap-4">
                {[
                  { label: "Model", value: product.name },
                  { label: "Category", value: "Advanced Robotics System" },
                  { label: "Dimensions", value: "Custom Configuration Available" },
                  { label: "Weight", value: "Varies by Configuration" },
                  { label: "Operating Voltage", value: "100-240V AC, 50-60Hz" },
                  { label: "Warranty", value: "2 Years Standard + Extended Options" },
                ].map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="grid md:grid-cols-3 gap-4 items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <span className="font-semibold text-white text-sm uppercase tracking-wide">
                      {spec.label}
                    </span>
                    <span className="md:col-span-2 text-gray-300">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Support & Resources */}
            <div className="border-t border-white/10 pt-16 border-b pb-16">
              <h2 className="text-3xl lg:text-4xl font-black font-display text-white mb-12">
                Support & <span className="text-primary">Resources</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-center"
                >
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-lg font-bold text-white mb-2">Documentation</h3>
                  <p className="text-gray-400 text-sm">Complete user guides and API reference</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-center"
                >
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-lg font-bold text-white mb-2">Training</h3>
                  <p className="text-gray-400 text-sm">Comprehensive training programs available</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-center"
                >
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-lg font-bold text-white mb-2">Support</h3>
                  <p className="text-gray-400 text-sm">24/7 technical support team</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-black font-display text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact our sales team to learn more about this product and get a custom quote for your needs.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-primary text-black font-bold text-lg rounded-xl hover:bg-white transition-all box-glow uppercase tracking-wide"
              >
                Contact Sales
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
