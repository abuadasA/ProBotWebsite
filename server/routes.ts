import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(404).json({ message: "Invalid ID" });
    
    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data function
  async function seedData() {
    const existing = await storage.getProducts();
    if (existing.length === 0) {
      console.log("Seeding products...");
      await storage.createProduct({
        name: "ProBot Arm X1",
        description: "High-precision industrial robotic arm with 6 degrees of freedom. Perfect for assembly and pick-and-place operations.",
        imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
        features: ["6 Degrees of Freedom", "0.05mm Repeatability", "5kg Payload Capacity", "EtherCAT Support"]
      });
      await storage.createProduct({
        name: "Rover Alpha",
        description: "Autonomous exploration rover designed for rugged terrains. Equipped with LiDAR and depth cameras.",
        imageUrl: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=800&q=80",
        features: ["Autonomous Navigation", "LiDAR Mapping", "4-Hour Battery Life", "Rugged Wheels"]
      });
      await storage.createProduct({
        name: "Drone S-Type",
        description: "Compact surveillance drone with 4K camera and AI-powered object tracking.",
        imageUrl: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80",
        features: ["4K HDR Camera", "30min Flight Time", "AI Object Tracking", "Obstacle Avoidance"]
      });
      await storage.createProduct({
        name: "EduKit Pro",
        description: "Complete robotics kit for education and research. Includes servo motors, sensors, and a programmable controller.",
        imageUrl: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
        features: ["Programmable Controller", "12 Servo Motors", "Distance Sensors", "Python API"]
      });
    }
  }
  
  // Run seed
  seedData().catch(console.error);

  return httpServer;
}
