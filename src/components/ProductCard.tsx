
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/context/CartContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-brand-blue font-bold mt-1">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          onClick={handleAddToCart}
          className="w-full btn-hover-effect bg-brand-blue hover:bg-brand-accent"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
