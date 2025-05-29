import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeaturedWatchButtonProps {
  productId: number;
  name: string;
}

const FeaturedWatchButton = ({ productId, name }: FeaturedWatchButtonProps) => {
  return (
    <Link to={`/product/${productId}`}>
      <motion.button
        className="mt-4 inline-flex items-center px-6 py-3 bg-black text-white rounded-md group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>View {name} Details</span>
        <motion.div
          className="ml-2"
          initial={{ x: 0 }}
          animate={{ x: [0, 5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            repeatType: "loop"
          }}
        >
          <ArrowRight size={16} />
        </motion.div>
      </motion.button>
    </Link>
  );
};

export default FeaturedWatchButton;
