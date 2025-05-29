import { useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useRef } from 'react';

const CategoryPage = () => {
  const { categoryType } = useParams<{ categoryType: string }>();
  const products = getProductsByCategory(categoryType || '');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const getCategoryTitle = () => {
    if (categoryType === 'men') return "Men's Collection";
    if (categoryType === 'women') return "Women's Collection";
    if (categoryType === 'limited') return "Limited Edition";
    return "Products";
  };

  const getCategoryDescription = () => {
    if (categoryType === 'men') return "Sophisticated timepieces for the modern gentleman. Each watch embodies precision engineering and timeless style.";
    if (categoryType === 'women') return "Elegant watches crafted for the discerning woman. Beauty and function in perfect harmony.";
    if (categoryType === 'limited') return "Rare and exclusive timepieces for collectors. Limited quantities, unlimited prestige.";
    return "Explore our premium watch collection";
  };

  return (
    <div className="min-h-screen" ref={containerRef}>
      <div className="relative h-[40vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src={`https://images.unsplash.com/photo-${categoryType === 'men' ? '1547996160-81dfa63595aa' : 
                 categoryType === 'women' ? '1612817159949-195b6eb9e31a' : 
                 '1622434641406-a158123450f9'}?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000`} 
            alt={getCategoryTitle()} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div 
          className="relative text-center px-4 z-10"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl text-white font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {getCategoryTitle()}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {getCategoryDescription()}
          </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="sticky top-20 z-20 bg-white/80 backdrop-blur-md py-4 mb-8 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-center">
            Showing {products.length} {products.length === 1 ? 'watch' : 'watches'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl text-gray-500">No products found in this category</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
