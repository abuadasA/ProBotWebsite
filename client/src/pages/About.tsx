import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FaLinkedin } from "react-icons/fa";
import profile1 from "../assets/1712093641690.png";
import profile2 from "../assets/1744717737792.jpg";
import aboutus from "../assets/websiteprobot.png";
import { profile } from "console";
export default function About() {
  const coFounders = [
    {
      name: "Mohammad Abu Adas",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/mohammad-abu-adas/",
      image:profile1,
        
    },
    {
      name: "Mahdy Naji",
      role: "Co-Founder",
      
      linkedin: "https://www.linkedin.com/in/mahdy-naji/",
      image:profile2,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Company Brief */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-glow">
              About <span className="text-primary">ProBot</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  ProBot is a pioneering robotics startup based in{" "}
                  <span className="text-white font-bold">Amman, Jordan</span>,
                  dedicated to advancing robotics and automation in the region.
                </p>

                <p>
                  We specialize in{" "}
                  <span className="text-primary">Sumo Robotics</span>, robotics
                  kits, and hands-on engineering education.
                </p>

                <p>
                  ProBot also offers{" "}
                  <span className="text-white">3D Printing</span> and{" "}
                  <span className="text-white">Robotics Training</span> services
                  to bridge theory with real-world application.
                </p>
              </div>

              {/* About Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative border border-white/10 rounded-2xl overflow-hidden aspect-video">
                  <img
                    src= {aboutus}
                    alt="ProBot innovation"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Founders */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
              Our <span className="text-primary">Leadership</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coFounders.map((founder, index) => (
                <Card
                  key={index}
                  className="bg-card/50 border-white/10 backdrop-blur-sm hover-elevate transition-all duration-300"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border border-white/10">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover-110"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 normal-case">
                      {founder.name}
                    </h3>

                    <p className="text-primary font-medium mb-6">
                      {founder.role}
                    </p>

                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <FaLinkedin size={22} />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
