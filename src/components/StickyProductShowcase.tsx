import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Product } from '../data/products';

interface StickyProductShowcaseProps {
  product: Product;
  index: number;
}

const StickyProductShowcase = ({ product, index }: StickyProductShowcaseProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create different transforms based on the index for variety
  const isEven = index % 2 === 0;
  
  // Image animations
  const imageX = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? -100 : 100, 0]
  );
  
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.05, 0.9]
  );
  
  const imageRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? -10 : 10, 0]
  );
  
  // Text animations
  const textX = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? 100 : -100, 0]
  );
  
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
  
  return (
    <div 
      ref={ref} 
      className="h-[150vh] relative"
    >
      <div className="sticky top-[20vh] h-[60vh] px-4 md:px-12 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex flex-col md:flex-row h-full items-center justify-center">
            <motion.div 
              className="w-full md:w-1/2 h-[300px] md:h-full p-4 md:p-8"
              style={{
                x: imageX,
                scale: imageScale,
                rotate: imageRotate
              }}
            >
              <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 p-8 md:p-12"
              style={{
                x: textX,
                opacity: textOpacity
              }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {product.name}
              </h2>
              
              <p className="text-2xl text-gray-800 font-bold mb-4">
                ${product.price.toLocaleString()}
              </p>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              {product.features && (
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="inline-block bg-gray-800 rounded-full w-2 h-2 mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              
              <motion.button
                className="bg-black text-white px-8 py-3 rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyProductShowcase;
