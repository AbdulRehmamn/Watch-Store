import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Check, Clock, Gift, Globe, Info, Maximize2, Package, ShieldCheck, ShoppingBag, Watch } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useState, useRef } from 'react';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const imageRef = useRef(null);
  
  const product = getProductById(parseInt(productId || '0'));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl mb-4">Product not found</h2>
        <button 
          className="text-blue-600 hover:underline"
          onClick={() => navigate('/')}
        >
          Return to home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  
  const handleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  // Check if the product has detailed information
  const hasDetailedInfo = product.detailedDescription || product.specifications || product.materials;
  
  // Check if it's one of our featured watches
  const isFeaturedWatch = ['Heritage Carbon', 'Petite Rose', 'Chronograph Classic'].includes(product.name);
  
  // Get watch-specific highlight content
  const getWatchHighlights = () => {
    switch(product.name) {
      case 'Heritage Carbon':
        return (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Award className="mr-2 text-gray-700" /> Racing Heritage
            </h3>
            <p className="mb-4">
              The Heritage Carbon incorporates authentic carbon fiber from Formula 1 race cars, creating a 
              direct connection to motorsport history. Each timepiece tells a unique story of speed and precision.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Chronograph Precision</h4>
                <p className="text-sm text-gray-600">1/10th second accuracy</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Power Reserve</h4>
                <p className="text-sm text-gray-600">65 hours of continuous operation</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Limited Production</h4>
                <p className="text-sm text-gray-600">Only 250 pieces worldwide</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Collectible Value</h4>
                <p className="text-sm text-gray-600">Includes certificate of authenticity</p>
              </div>
            </div>
          </div>
        );
      case 'Petite Rose':
        return (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Gift className="mr-2 text-gray-700" /> Elegant Craftsmanship
            </h3>
            <p className="mb-4">
              The Petite Rose exemplifies feminine elegance with its delicate proportions and exquisite details. 
              The mother-of-pearl dial creates a mesmerizing display of colors that changes with the light.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Signature Design</h4>
                <p className="text-sm text-gray-600">Rose motif crown engraving</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Case Size</h4>
                <p className="text-sm text-gray-600">28mm - perfect for slender wrists</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Dial Material</h4>
                <p className="text-sm text-gray-600">Genuine mother of pearl</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Movement</h4>
                <p className="text-sm text-gray-600">Swiss Quartz Ronda 1063</p>
              </div>
            </div>
          </div>
        );
      case 'Chronograph Classic':
        return (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Clock className="mr-2 text-gray-700" /> Timeless Excellence
            </h3>
            <p className="mb-4">
              The Chronograph Classic represents the pinnacle of traditional watchmaking. Each timepiece is meticulously
              crafted by master watchmakers using techniques passed down through generations.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Movement</h4>
                <p className="text-sm text-gray-600">Swiss Automatic ETA 2824-2</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Crystal</h4>
                <p className="text-sm text-gray-600">Scratch-resistant Sapphire</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Warranty</h4>
                <p className="text-sm text-gray-600">5-year international coverage</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-sm mb-1">Dial</h4>
                <p className="text-sm text-gray-600">Hand-applied indices</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        className="flex items-center text-gray-600 hover:text-black mb-8"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-lg overflow-hidden"
          ref={imageRef}
        >
          {/* Image zoom overlay */}
          {isImageZoomed && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleImageZoom}
            >
              <button 
                className="absolute top-4 right-4 text-white"
                onClick={handleImageZoom}
              >
                <Maximize2 />
              </button>
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            </motion.div>
          )}
          
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover cursor-zoom-in"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            onClick={handleImageZoom}
          />
          
          <button 
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md"
            onClick={handleImageZoom}
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {product.name}
          </h1>
          
          <div className="text-2xl font-bold mb-6">${product.price.toLocaleString()}</div>
          
          <p className="text-gray-700 mb-8">{product.description}</p>
          
          {isFeaturedWatch && getWatchHighlights()}
          
          {product.features && (
            <div className="mb-8">
              <h3 className="font-bold mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="inline-block bg-gray-200 rounded-full w-1.5 h-1.5 mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <motion.button
              className={`flex items-center justify-center px-6 py-3 rounded ${
                isAdded ? 'bg-green-500 text-white' : 'bg-black text-white'
              }`}
              whileHover={!isAdded ? { scale: 1.02 } : {}}
              whileTap={!isAdded ? { scale: 0.98 } : {}}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </motion.button>
            
            <motion.button
              className="px-6 py-3 border border-black rounded hover:bg-gray-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/cart')}
            >
              View Cart
            </motion.button>
          </div>
          
          {isFeaturedWatch && (
            <div className="grid grid-cols-3 gap-3 mb-10">
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <ShieldCheck className="h-6 w-6 text-gray-700 mb-2" />
                <span className="text-xs text-center">Authenticity Guaranteed</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <Globe className="h-6 w-6 text-gray-700 mb-2" />
                <span className="text-xs text-center">Worldwide Shipping</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <Award className="h-6 w-6 text-gray-700 mb-2" />
                <span className="text-xs text-center">Extended Warranty</span>
              </div>
            </div>
          )}
          
          {/* Additional detailed information tabs - only shown for products with detailed info */}
          {hasDetailedInfo && (
            <>
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Overview
                    </div>
                  </button>
                  
                  {product.specifications && (
                    <button
                      onClick={() => setActiveTab('specifications')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'specifications'
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <Watch className="h-4 w-4 mr-2" />
                        Specifications
                      </div>
                    </button>
                  )}
                  
                  {product.materials && (
                    <button
                      onClick={() => setActiveTab('materials')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'materials'
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Materials
                      </div>
                    </button>
                  )}
                </nav>
              </div>
              
              {/* Tab content */}
              <div className="mb-6">
                {activeTab === 'overview' && product.detailedDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-gray-700">{product.detailedDescription}</p>
                    
                    {product.limitedEdition && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-bold text-lg mb-2">Limited Edition</h4>
                        <p>Only {product.limitedEdition.totalPieces} pieces worldwide</p>
                        {product.limitedEdition.certificate && (
                          <p className="mt-1">{product.limitedEdition.certificate}</p>
                        )}
                        {product.limitedEdition.specialPackaging && (
                          <p className="mt-1">{product.limitedEdition.specialPackaging}</p>
                        )}
                      </div>
                    )}
                    
                    {product.warranty && (
                      <div className="mt-4">
                        <h4 className="font-bold mb-1">Warranty</h4>
                        <p>{product.warranty}</p>
                      </div>
                    )}
                  </motion.div>
                )}
                
                {activeTab === 'specifications' && product.specifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(product.specifications).map(([key, value], index) => (
                            <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="py-3 px-4 font-medium text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </td>
                              <td className="py-3 px-4">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'materials' && product.materials && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4 className="font-bold mb-3">Premium Materials</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.materials.map((material, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <span className="inline-block bg-gray-800 rounded-full w-1.5 h-1.5 mt-2 mr-2"></span>
                            <span>{material}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
      
      {/* Related watches section for featured watches */}
      {isFeaturedWatch && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Heritage Carbon', 'Petite Rose', 'Chronograph Classic']
              .filter(name => name !== product.name)
              .map(name => {
                const relatedProduct = getProductById(
                  name === 'Heritage Carbon' ? 8 : name === 'Petite Rose' ? 5 : 1
                );
                if (!relatedProduct) return null;
                
                return (
                  <motion.div
                    key={relatedProduct.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{relatedProduct.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">${relatedProduct.price.toLocaleString()}</p>
                      <button 
                        className="text-black font-medium hover:underline"
                        onClick={() => navigate(`/product/${relatedProduct.id}`)}
                      >
                        View Details →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;