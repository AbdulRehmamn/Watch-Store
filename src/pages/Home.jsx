import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Spiral3DScroll from '../components/Spiral3DScroll';
import StickyProductShowcase from '../components/StickyProductShowcase';
import { products, getProductsByCategory } from '../data/products';

const Home = () => {
  // Create a curated selection of products for the New Arrivals section
  const featuredProducts = [
    products[0],  // Chronograph Classic
    products[3],  // Moonlight Pearl
    products[6],  // Celestial Limited
    products[10], // Royal Sapphire
    products[12], // Lunar Eclipse
    products[2],  // Executive Gold
    products[8],  // Vintage Elegance
    products[13], // Emperor's Tourbillon
    products[4],  // Petite Rose
    products[1],  // Ocean Diver
    products[15], // Aquamarine Dive
    products[9],  // Urban Titanium
  ];
  
  const menProducts = getProductsByCategory('men');
  const womenProducts = getProductsByCategory('women');
  const limitedProducts = getProductsByCategory('limited');
  
  // Select three products for sticky showcase
  const showcaseProducts = [products[0], products[4], products[7]];

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        className="relative h-screen bg-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1468421870903-4df1664ac249?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000" 
            alt="Luxury Watch" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 
                className="text-4xl md:text-6xl text-white font-bold mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Timeless Elegance on Your Wrist
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover our collection of luxury timepieces that blend artistry with precision engineering.
              </p>
              <Link 
                to="/category/men" 
                className="inline-block bg-white text-gray-900 font-medium px-8 py-3 rounded-md transition-all hover:bg-gray-200"
              >
                Explore Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Categories Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Explore Our Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard 
              title="Men's Collection" 
              image="https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
              link="/category/men"
              delay={0.1}
            />
            <CategoryCard 
              title="Women's Collection" 
              image="https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
              link="/category/women"
              delay={0.3}
            />
            <CategoryCard 
              title="Limited Editions" 
              image="https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
              link="/category/limited"
              delay={0.5}
            />
          </div>
        </div>
      </div>

      {/* Featured Sticky Showcase */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Featured Timepieces
          </h2>
        </div>
        
        {showcaseProducts.map((product, index) => (
          <StickyProductShowcase 
            key={product.id} 
            product={product} 
            index={index} 
          />
        ))}
      </div>

      {/* Featured Collections with 3D Spiral Animation */}
      <Spiral3DScroll title="New Arrivals" products={featuredProducts} />
      
      {/* Animated Collections Gallery */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Collections
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...menProducts, ...womenProducts, ...limitedProducts].slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white rounded-lg overflow-hidden"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black opacity-0"
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">${product.price.toLocaleString()}</span>
                      <motion.span 
                        className="text-black font-medium"
                        whileHover={{ x: 5 }}
                      >
                        View Details →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Collection Parallax Section */}
      <div className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Discover Our Collections
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <CollectionCard 
              title="Men's Collection" 
              count={menProducts.length}
              image="https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
              link="/category/men"
            />
            <CollectionCard 
              title="Women's Collection" 
              count={womenProducts.length}
              image="https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
              link="/category/women"
            />
            <CollectionCard 
              title="Limited Editions" 
              count={limitedProducts.length}
              image="https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
              link="/category/limited"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, image, link, delay }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <Link to={link} className="block relative h-96 rounded-lg overflow-hidden group">
      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity z-10"></div>
      <motion.img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h3 
          className="text-white text-2xl font-bold"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {title}
        </h3>
      </div>
    </Link>
  </motion.div>
);

const CollectionCard = ({ title, count, image, link }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    className="group"
  >
    <Link to={link} className="block">
      <div className="relative rounded-lg overflow-hidden mb-4 h-80">
        <motion.div
          className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity z-10"
          whileHover={{ opacity: 0.2 }}
        />
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-20"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 
            className="text-white text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {title}
          </h3>
          <div className="px-6 py-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full">
            <span className="text-gray-900 font-medium">{count} Watches</span>
          </div>
        </motion.div>
      </div>
      <motion.div 
        className="text-center"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="inline-block px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
          Explore Collection
        </span>
      </motion.div>
    </Link>
  </motion.div>
);

export default Home;