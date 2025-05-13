
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.",
    category: "Audio",
    featured: true
  },
  {
    id: 2,
    name: "Ultra-Thin Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "Powerful yet lightweight laptop with a stunning 4K display, 16GB RAM, and 1TB SSD storage.",
    category: "Computers",
    featured: true
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.",
    category: "Wearables",
    featured: true
  },
  {
    id: 4,
    name: "4K Ultra HD Smart TV",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
    description: "Experience stunning visuals with this 55-inch 4K smart TV with HDR and built-in streaming services.",
    category: "TVs",
    featured: true
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0",
    description: "Fast wireless charging for all Qi-compatible devices with sleek, minimalist design.",
    category: "Accessories"
  },
  {
    id: 6,
    name: "Bluetooth Portable Speaker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    description: "Waterproof portable speaker with rich bass, 24-hour battery life, and built-in microphone for calls.",
    category: "Audio"
  },
  {
    id: 7,
    name: "Smart Home Security Camera",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb",
    description: "HD security camera with motion detection, night vision, and smartphone alerts.",
    category: "Smart Home"
  },
  {
    id: 8,
    name: "Gaming Console",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f",
    description: "Next-generation gaming console with 4K gaming, 1TB storage, and backward compatibility.",
    category: "Gaming"
  },
  {
    id: 9,
    name: "Wireless Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37",
    description: "True wireless earbuds with noise cancellation, touch controls, and 24-hour battery life with the charging case.",
    category: "Audio"
  },
  {
    id: 10,
    name: "Digital Camera",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
    description: "Professional-grade digital camera with 24MP sensor, 4K video recording, and interchangeable lenses.",
    category: "Photography"
  },
  {
    id: 11,
    name: "Smart Thermostat",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1583921479710-d7fc57e82d9c",
    description: "Energy-saving smart thermostat that learns your preferences and can be controlled remotely.",
    category: "Smart Home"
  },
  {
    id: 12,
    name: "External SSD Drive",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1597858520171-563a8e8b9925",
    description: "Fast 1TB external SSD with USB-C connectivity, perfect for backups and file transfers.",
    category: "Storage"
  }
];

export const categories = [
  "All",
  "Audio",
  "Computers",
  "Wearables",
  "TVs",
  "Accessories",
  "Smart Home",
  "Gaming",
  "Photography",
  "Storage"
];

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string) => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};
