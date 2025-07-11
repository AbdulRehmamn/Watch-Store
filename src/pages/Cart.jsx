import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice
  } = useCart();
  
  const totalPrice = getTotalPrice();

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        style={{ fontFamily: 'Playfair Display, serif' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl text-gray-500 mb-6">Your cart is empty</h2>
          <Link 
            to="/" 
            className="inline-block bg-black text-white px-6 py-3 rounded"
          >
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Cart Items ({cartItems.length})</h2>
              </div>
              
              {cartItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 border-b flex flex-col sm:flex-row gap-4 items-center"
                >
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      className="w-8 h-8 flex items-center justify-center border rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      className="w-8 h-8 flex items-center justify-center border rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="font-bold w-24 text-right">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                  
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="pt-4 border-t flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="block w-full bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;