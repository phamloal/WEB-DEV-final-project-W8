
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ChevronLeft, Plus, Minus } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(Number(id));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center"
      >
        <ChevronLeft size={16} className="mr-1" /> Back
      </Button>
      
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-brand-blue font-bold mb-4">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <span className="inline-block bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          <p className="text-gray-700 mb-8">{product.description}</p>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              
              <span className="mx-4 font-medium text-lg w-8 text-center">
                {quantity}
              </span>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleIncreaseQuantity}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            size="lg"
            className="w-full bg-brand-blue hover:bg-brand-accent btn-hover-effect"
          >
            Add to Cart
          </Button>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">
              Free standard shipping on all orders over $50. Delivery within 3-5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
