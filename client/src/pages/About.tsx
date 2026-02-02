import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FaLinkedin } from "react-icons/fa";

export default function About() {
  const coFounders = [
    {
      name: "Mohammad Abu Adas",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/mohammad-abu-adas/",
    },
    {
      name: "Mahdy Naji",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/mahdy-naji/",
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
                  ProBot is a pioneering robotics startup based in the heart of{" "}
                  <span className="text-white font-bold">Amman, Jordan</span>.
                  We are dedicated to pushing the boundaries of automation and 
                  robotic technology in the region.
                </p>
                <p>
                  Our expertise lies in developing specialized robotic products, 
                  with a strong focus on <span className="text-primary">Sumo Robotics</span>. 
                  We believe in empowering the next generation of engineers through 
                  innovation and hands-on experience.
                </p>
                <p>
                  Beyond product development, ProBot offers premium 
                  <span className="text-white"> 3D Printing Services</span> and 
                  comprehensive <span className="text-white">Robotics Trainings</span> 
                  to bridge the gap between theoretical knowledge and practical 
                  application.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative border border-white/10 rounded-2xl overflow-hidden aspect-video bg-card/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-primary text-2xl font-display uppercase tracking-widest">Innovation in Amman</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Co-Founders Section */}
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
                <Card key={index} className="bg-card/50 border-white/10 backdrop-blur-sm hover-elevate transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl text-primary font-bold">
                        {founder.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                    <p className="text-primary font-medium mb-6">{founder.role}</p>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      <FaLinkedin size={24} />
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
