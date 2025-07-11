import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
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
            <p className="text-xl font-bold mb-2">${product.price.toLocaleString()}</p>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            {product.features && (
              <ul className="space-y-1 mb-4">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <span className="inline-block bg-black rounded-full w-1.5 h-1.5 mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="mt-4">
            <motion.button
              className="w-full bg-black text-white py-2 px-4 rounded text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/product/${product.id}`;
              }}
            >
              View Details
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