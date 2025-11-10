import { Router } from "express";
const router = Router();

const img = (name) => `http://localhost:5173/images/${name}`;

const products = [
  { id: "smartphone-x1",      name: "Smartphone X1",          segment: "Electronics", image: img("smartphone.jpg") },
  { id: "laptop-pro-14",      name: "Laptop Pro 14",           segment: "Electronics", image: img("laptop.jpg") },
  { id: "headphones-h7",      name: "Bluetooth Headphones H7", segment: "Electronics", image: img("headphones.jpg") },

  { id: "almonds-500g",       name: "Organic Almonds 500g",    segment: "Food",        image: img("almonds.jpg") },
  { id: "instant-noodles-cup",name: "Instant Noodles Cup",     segment: "Food",        image: img("noodles.jpg") },
  { id: "dark-chocolate-70",  name: "Dark Chocolate 70%",      segment: "Food",        image: img("darkchoco.jpg") },

  { id: "cricket-bat-elite",  name: "Cricket Bat Elite",       segment: "Sport",       image: img("cricketbat.jpg") },
  { id: "football-pro-sz5",   name: "Football Pro Size 5",     segment: "Sport",       image: img("football.jpg") },
  { id: "yoga-mat-comfort",   name: "Yoga Mat Comfort",        segment: "Sport",       image: img("yogamat.jpg") },

  { id: "e-scooter-e2",       name: "Electric Scooter E2",     segment: "Automobiles", image: img("scooter.jpg") },
  { id: "car-floor-mats-dx",  name: "Car Floor Mats Deluxe",   segment: "Automobiles", image: img("carmats.jpg") },
  { id: "helmet-s1",          name: "Motorbike Helmet S1",     segment: "Automobiles", image: img("helmet.jpg") }
];

router.get("/", (req, res) => res.json({ products }));

export default router;
