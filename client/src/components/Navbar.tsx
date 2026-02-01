import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import logoImg from "@assets/Untitled-2_1769976217883.png";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={logoImg} 
                alt="ProBot Logo" 
                className="h-12 w-auto relative z-10 transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <span className="text-2xl font-bold tracking-wider text-primary font-display transition-colors duration-300">
              PROBOT
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="relative group py-2">
                <span className={`text-lg font-medium tracking-wide transition-colors duration-300 ${
                  location === link.href ? "text-primary text-glow" : "text-gray-300 hover:text-white"
                }`}>
                  {link.label}
                </span>
                {location === link.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary box-glow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link href="/contact" className="ml-4">
              <button className="px-6 py-2 bg-primary/10 border border-primary text-primary font-bold rounded hover:bg-primary hover:text-black transition-all duration-300 box-glow">
                GET STARTED
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-xl"
        >
          <div className="px-4 py-6 space-y-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                <div className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                  location === link.href 
                    ? "bg-primary/20 text-primary border border-primary/50" 
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
