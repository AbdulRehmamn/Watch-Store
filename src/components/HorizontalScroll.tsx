import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Product } from '../data/products';
import ProductCard from './ProductCard';
import { ChevronDown } from 'lucide-react';

interface HorizontalScrollProps {
  title: string;
  products: Product[];
}

const HorizontalScroll = ({ title, products }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isHorizontalScrollComplete, setIsHorizontalScrollComplete] = useState(false);
  const [manualScrolling, setManualScrolling] = useState(false);
  
  // Setup scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 15, 
    stiffness: 150 
  });
  
  // Calculate product cards total width
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const totalWidth = products.length * 340; // Card width + gap
        setContainerWidth(totalWidth);
        setWindowWidth(window.innerWidth);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [products.length]);
  
  // Calculate scroll distance - adjust for more products
  const x = useTransform(
    smoothProgress,
    [0, 0.85], // Extend horizontal scroll period slightly to accommodate more products
    [0, -containerWidth + windowWidth * 0.9]
  );
  
  // Monitor horizontal scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.onChange(value => {
      // Consider horizontal scroll complete when progress is at or beyond 85%
      // Extended to accommodate more products
      setIsHorizontalScrollComplete(value >= 0.85);
    });
    
    return () => unsubscribe();
  }, [smoothProgress]);
  
  // Handle scroll behavior
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (!isHorizontalScrollComplete && !manualScrolling) {
        // If horizontal scroll isn't complete, prevent default vertical scrolling
        // except when user is manually dragging
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          e.preventDefault();
          
          // Simulate horizontal scrolling instead
          window.scrollBy({
            top: e.deltaY / 2, // Slow down vertical scrolling to emphasize horizontal first
            behavior: 'smooth'
          });
        }
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isHorizontalScrollComplete, manualScrolling]);
  
  // Generate parallax effect for title
  const titleX = useTransform(
    smoothProgress,
    [0, 1],
    [0, windowWidth * 0.3]
  );
  
  // Opacity effect for title
  const titleOpacity = useTransform(
    smoothProgress,
    [0, 0.1, 0.9, 1],
    [0.3, 1, 1, 0.3]
  );
  
  // Scroll indicator animation - adjusted for more products
  const indicatorOpacity = useTransform(
    smoothProgress,
    [0, 0.75, 0.85, 1],
    [1, 1, 0, 0]
  );
  
  const indicatorY = useTransform(
    smoothProgress,
    [0, 0.7],
    [0, 20]
  );

  return (
    <div 
      className="relative h-[100vh] overflow-hidden" 
      ref={containerRef}
    >
      <div className="sticky top-0 pt-8 pb-16 h-screen flex flex-col">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 px-8"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            x: titleX,
            opacity: titleOpacity
          }}
        >
          {title}
        </motion.h2>
        
        {/* Scroll indicator - shows before horizontal scroll is complete */}
        <AnimatePresence>
          {!isHorizontalScrollComplete && (
            <motion.div 
              className="flex justify-center mb-4"
              style={{ opacity: indicatorOpacity, y: indicatorY }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center text-gray-500">
                <p className="text-sm mb-1">Scroll to explore</p>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            className="absolute flex gap-8 p-8 h-full"
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -containerWidth + windowWidth * 0.9,
              right: 0
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
            dragElastic={0.1}
            onDragStart={() => setManualScrolling(true)}
            onDragEnd={() => setManualScrolling(false)}
            // Add an indicator when horizontal scroll is complete
            animate={isHorizontalScrollComplete ? { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" } : {}}
          >
            {products.map((product, index) => (
              <motion.div 
                key={product.id} 
                className="w-[300px] flex-shrink-0 h-full"
                style={{
                  y: useTransform(
                    smoothProgress,
                    [0, 1],
                    [0, (index % 2 === 0) ? -50 : 50]
                  ),
                  scale: useTransform(
                    smoothProgress,
                    [0, 0.5, 1],
                    [1, (index === Math.floor(products.length / 2)) ? 1.1 : 1, 1]
                  )
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* "Continue scrolling" indicator - shows after horizontal scroll is complete */}
        <AnimatePresence>
          {isHorizontalScrollComplete && (
            <motion.div 
              className="absolute bottom-8 left-0 right-0 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <span className="text-sm">Continue scrolling</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HorizontalScroll;
