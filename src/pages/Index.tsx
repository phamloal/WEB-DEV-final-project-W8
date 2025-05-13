
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";
import { ChevronRight } from "lucide-react";

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      <Hero 
        title="Next-Gen Tech At Your Fingertips"
        subtitle="Discover the latest and greatest in tech gadgets. Premium quality, unbeatable prices, fast shipping."
        ctaText="Shop Now"
        ctaLink="/products"
      />
      
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products">
            <Button variant="ghost" className="flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TechTrove?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">We source only the highest quality products from trusted manufacturers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Prices</h3>
              <p className="text-gray-600">Get the best value with our competitive pricing and regular deals.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick and reliable shipping with real-time order tracking.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 container mx-auto px-4">
        <div className="bg-brand-blue rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-100">Stay updated with the latest products, exclusive offers, and tech news.</p>
          </div>
          <div className="md:w-1/3">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-3 rounded-l-lg w-full focus:outline-none"
              />
              <Button className="rounded-l-none bg-brand-accent hover:bg-brand-accent/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
