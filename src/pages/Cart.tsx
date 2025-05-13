
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-lg mx-auto">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-brand-blue hover:bg-brand-accent btn-hover-effect">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-4 px-6 text-left">Product</th>
                    <th className="py-4 px-6 text-center">Quantity</th>
                    <th className="py-4 px-6 text-right">Price</th>
                    <th className="py-4 px-6 text-right">Total</th>
                    <th className="py-4 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {cartItems.map((item) => (
                    <tr key={item.product.id}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">{item.product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </Button>
                          
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        ${item.product.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-right font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t flex justify-between items-center">
              <Button 
                variant="ghost" 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear Cart
              </Button>
              <Link to="/products">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>${(getCartTotal() * 0.07).toFixed(2)}</span>
              </div>
              
              <div className="border-t my-4"></div>
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(getCartTotal() * 1.07).toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-brand-blue hover:bg-brand-accent btn-hover-effect"
            >
              Checkout Now
            </Button>
            
            <div className="mt-6 text-xs text-gray-500">
              <p>We accept:</p>
              <div className="flex gap-2 mt-2">
                <div className="bg-gray-200 p-1 rounded">Visa</div>
                <div className="bg-gray-200 p-1 rounded">Mastercard</div>
                <div className="bg-gray-200 p-1 rounded">PayPal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
