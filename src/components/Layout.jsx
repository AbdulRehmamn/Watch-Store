import { Outlet, Link } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            CHRONO
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-black transition-colors">
              Home
            </Link>
            <Link to="/category/men" className="text-gray-800 hover:text-black transition-colors">
              Men
            </Link>
            <Link to="/category/women" className="text-gray-800 hover:text-black transition-colors">
              Women
            </Link>
            <Link to="/category/limited" className="text-gray-800 hover:text-black transition-colors">
              Limited Edition
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-800" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden text-gray-800"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-50 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6 text-gray-800" />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-6 pt-10">
              <Link 
                to="/" 
                className="text-xl text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/category/men" 
                className="text-xl text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/category/women" 
                className="text-xl text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/category/limited" 
                className="text-xl text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Limited Edition
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <Outlet />
      </main>
      
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>CHRONO</h3>
              <p className="text-gray-400">Luxury timepieces for the discerning collector.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/category/men" className="text-gray-400 hover:text-white transition-colors">Men's Collection</Link></li>
                <li><Link to="/category/women" className="text-gray-400 hover:text-white transition-colors">Women's Collection</Link></li>
                <li><Link to="/category/limited" className="text-gray-400 hover:text-white transition-colors">Limited Edition</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400">123 Luxury Lane</p>
              <p className="text-gray-400">New York, NY 10001</p>
              <p className="text-gray-400">contact@chrono.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} CHRONO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;