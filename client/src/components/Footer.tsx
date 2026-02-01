import { Link } from "wouter";
import logoImg from "@assets/Untitled-2_1769976217883.png";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group cursor-pointer">
              <img src={logoImg} alt="ProBot" className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="text-xl font-bold font-display tracking-widest text-white">PROBOT</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Pioneering the future of automation with advanced robotics solutions designed for industrial excellence and precision.
            </p>
            <div className="flex gap-4">
              {[FaGithub, FaTwitter, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">Products</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/products" className="hover:text-primary transition-colors">Industrial Arms</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Autonomous Units</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Vision Systems</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Control Software</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Press</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest technology.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white w-full focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
              <button className="bg-primary text-black font-bold px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                GO
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ProBot Robotics. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
