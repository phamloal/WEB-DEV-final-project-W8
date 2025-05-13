
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-blue">
          TechTrove
        </Link>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleMenu}
            className="p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-brand-blue transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-brand-blue transition-colors">
            Products
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-brand-blue transition-colors">
            Contact
          </Link>
        </div>

        {/* Cart button */}
        <div className="hidden lg:block">
          <Link to="/cart">
            <Button variant="ghost" className="relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation - Full screen overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-brand-blue">
                TechTrove
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleMenu}
                className="p-2"
              >
                <X size={24} />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-8 flex-grow">
              <Link 
                to="/" 
                className="text-xl text-gray-700 hover:text-brand-blue transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-xl text-gray-700 hover:text-brand-blue transition-colors"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="text-xl text-gray-700 hover:text-brand-blue transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link 
                to="/cart" 
                className="text-xl text-gray-700 hover:text-brand-blue transition-colors flex items-center gap-2"
                onClick={toggleMenu}
              >
                <ShoppingCart className="h-5 w-5" />
                Cart {getCartCount() > 0 && `(${getCartCount()})`}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
