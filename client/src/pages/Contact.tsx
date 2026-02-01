import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useContactForm } from "@/hooks/use-contact";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Loader2, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const mutation = useContactForm();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: InsertMessage) {
    mutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-black font-display text-white mb-8">
                GET IN <span className="text-primary">TOUCH</span>
              </h1>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Ready to automate your future? Our team of engineers is standing by to discuss your specific requirements and deployment needs.
              </p>

              <div className="space-y-8">
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                    <FaWhatsapp size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">WhatsApp Support</h3>
                    <p className="text-gray-400">Chat directly with our sales team</p>
                  </div>
                </a>

                <a 
                  href="mailto:contact@probot.com" 
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <FaEnvelope size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">Email Inquiry</h3>
                    <p className="text-gray-400">contact@probot.com</p>
                  </div>
                </a>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-card border border-white/5">
                    <FaMapMarkerAlt className="text-primary mb-2" size={20} />
                    <h4 className="font-bold text-white">Headquarters</h4>
                    <p className="text-sm text-gray-400">123 Tech Blvd, Silicon Valley, CA</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-white/5">
                    <FaPhone className="text-primary mb-2" size={20} />
                    <h4 className="font-bold text-white">Phone</h4>
                    <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/50 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-500" />
              
              <h2 className="text-3xl font-bold text-white font-display mb-8">Send Message</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="bg-black/30 border-white/10 focus:border-primary h-12 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@company.com" 
                            type="email"
                            {...field} 
                            className="bg-black/30 border-white/10 focus:border-primary h-12 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project requirements..." 
                            className="bg-black/30 border-white/10 focus:border-primary min-h-[150px] text-white resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-4 bg-primary text-black font-bold text-lg rounded-xl hover:bg-white hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" /> SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
