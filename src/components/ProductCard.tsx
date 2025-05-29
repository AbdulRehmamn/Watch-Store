import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  // Check if this is one of our featured watches
  const isFeaturedWatch = ['Heritage Carbon', 'Petite Rose', 'Chronograph Classic'].includes(product.name);

  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative overflow-hidden h-64">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute top-2 right-2">
            <motion.button
              className="bg-black text-white p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
            </motion.button>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium mb-1">{product.name}</h3>
            <p className="text-gray-700">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-bold">${product.price.toLocaleString()}</p>
            <motion.button
              className="bg-black text-white px-3 py-1 rounded text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </motion.button>
          </div>
          
          {isFeaturedWatch && (
            <motion.div 
              className="mt-3 text-center"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                Featured Watch - View Details
              </span>
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
