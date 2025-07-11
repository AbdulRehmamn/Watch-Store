import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const totalPrice = getTotalPrice();

  // Redirect to cart if cart is empty
  if (cartItems.length === 0 && !paymentSuccess) {
    navigate('/cart');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <motion.div 
        className="container mx-auto px-4 py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your order has been placed and is being processed. You will receive an email confirmation shortly.
          </p>
          
          <button
            className="bg-black text-white px-6 py-3 rounded"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        style={{ fontFamily: 'Playfair Display, serif' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Checkout
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Payment Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500 pl-10"
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="123"
                    required
                    maxLength={3}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Billing Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="123 Street Address"
                  required
                />
              </div>
              
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="12345"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className={`w-full py-3 rounded-md ${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${totalPrice.toLocaleString()}`}
              </button>
            </form>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="divide-y">
              {cartItems.map(item => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="font-bold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t space-y-4">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;