import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { Loader, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import ErrorBoundary from './ErrorBoundary';

// Main component
const Spiral3DScroll = ({ title, products }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();
  
  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Setup scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Create transforms for parallax effect
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);
  
  // Special cases for mobile full image display
  const specialProducts = ['Heritage Carbon', 'Petite Rose', 'Chronograph Classic'];
  
  return (
    <ErrorBoundary fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-8">
          <h3 className="text-2xl font-bold mb-4">3D Experience Unavailable</h3>
          <p className="mb-4">We're unable to load the 3D product experience.</p>
          <p>Please check your browser settings or try refreshing the page.</p>
        </div>
      </div>
    }>
      <div 
        ref={containerRef} 
        className="relative min-h-[150vh]"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 px-8 pt-8"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              y: titleY,
              opacity: titleOpacity
            }}
          >
            {title}
          </motion.h2>
          
          <div className="flex-1 relative">
            {/* 3D Canvas */}
            <Canvas className="w-full h-full">
              <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Spiral products={products} scrollYProgress={scrollYProgress} />
            </Canvas>
            
            {/* Mobile view for special products */}
            {isMobile && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-4 overflow-y-auto">
                <h3 className="text-2xl font-bold mb-6 text-center">Featured Watches</h3>
                <div className="space-y-12">
                  {products
                    .filter(product => specialProducts.includes(product.name))
                    .map(product => (
                      <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                        <Link to={`/product/${product.id}`}>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto object-contain rounded-lg mb-4"
                          />
                          <h4 className="text-xl font-medium mb-2">{product.name}</h4>
                          <p className="text-gray-600 mb-2">{product.description.substring(0, 100)}...</p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">${product.price.toLocaleString()}</span>
                            <button 
                              className="bg-black text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                              }}
                            >
                              <ShoppingBag size={14} /> Add
                            </button>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

// TextureLoader cache to prevent redundant loading
const textureCache = new Map();

const Spiral = ({ products, scrollYProgress }) => {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Preload all textures in parallel to speed up rendering
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let loadedCount = 0;
    let isMounted = true;
    
    const loadTextures = async () => {
      setLoading(true);
      
      // Create a placeholder texture for fallback
      const placeholderTexture = new THREE.Texture();
      placeholderTexture.needsUpdate = true;
      
      // Batch process textures in groups of 3 to prevent memory issues
      const batchSize = 3;
      const batches = Math.ceil(products.length / batchSize);
      
      for (let i = 0; i < batches; i++) {
        if (!isMounted) break;
        
        const batchStart = i * batchSize;
        const batchEnd = Math.min(batchStart + batchSize, products.length);
        const batchProducts = products.slice(batchStart, batchEnd);
        
        await Promise.all(
          batchProducts.map(product => {
            if (textureCache.has(product.image)) {
              loadedCount++;
              return Promise.resolve(textureCache.get(product.image));
            }
            
            return new Promise(resolve => {
              setTimeout(() => {
                loader.load(
                  product.image,
                  (texture) => {
                    if (!isMounted) return;
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    texture.colorSpace = THREE.SRGBColorSpace;
                    textureCache.set(product.image, texture);
                    loadedCount++;
                    if (loadedCount === products.length && isMounted) {
                      setLoading(false);
                    }
                    resolve();
                  },
                  undefined,
                  () => {
                    console.error(`Error loading texture for ${product.name}`);
                    textureCache.set(product.image, placeholderTexture);
                    loadedCount++;
                    if (loadedCount === products.length && isMounted) {
                      setLoading(false);
                    }
                    resolve();
                  }
                );
              }, i * 100);
            });
          })
        );
      }
    };
    
    loadTextures();
    
    return () => {
      isMounted = false;
    };
  }, [products]);
  
  // Animation for the spiral based on scroll
  useFrame((state) => {
    if (groupRef.current) {
      const scrollValue = scrollYProgress.get();
      const targetRotation = scrollValue * Math.PI * 4;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.1
      );
      
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });
  
  // Calculate positions only once for better performance
  const productPositions = useMemo(() => {
    return products.map((product, i) => {
      const angle = (i / products.length) * Math.PI * 2;
      const radius = 8;
      const spiralOffset = i * 0.1;
      const x = Math.cos(angle) * radius;
      const y = (i - products.length / 2) * 0.5 + spiralOffset;
      const z = Math.sin(angle) * radius;
      
      return {
        product,
        position: [x, y, z],
        index: i
      };
    });
  }, [products]);

  return (
    <group ref={groupRef}>
      {loading ? (
        <Html center>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center gap-2">
            <Loader className="animate-spin h-5 w-5" />
            <span>Loading products...</span>
          </div>
        </Html>
      ) : (
        productPositions.map(({ product, position, index }) => (
          <Suspense key={product.id} fallback={null}>
            <ProductNode 
              product={product}
              position={position}
              isHovered={hovered === product.id}
              isClicked={clicked === product.id}
              onHover={() => setHovered(product.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setClicked(product.id)}
              index={index}
            />
          </Suspense>
        ))
      )}
    </group>
  );
};

// Individual product node in the 3D space
const ProductNode = ({ 
  product, 
  position, 
  isHovered, 
  isClicked,
  onHover, 
  onHoverEnd, 
  onClick,
  index
}) => {
  const meshRef = useRef(null);
  
  // Create fallback texture
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(product.name, 128, 128);
  }
  const fallbackTexture = new THREE.Texture(canvas);
  fallbackTexture.needsUpdate = true;
  
  // Get texture from cache or use a fallback
  const texture = textureCache.get(product.image) || useTexture(product.image) || fallbackTexture;
  
  // Configure texture for better quality
  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);
  
  // Animate on hover and click
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        isHovered || isClicked ? 1.2 : 1,
        0.1
      );
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        isHovered || isClicked ? 1.2 : 1,
        0.1
      );
      
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
    }
  });
  
  // Handle click to navigate to product
  const handleClick = () => {
    onClick();
    window.location.href = `/product/${product.id}`;
  };
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={onHover}
        onPointerOut={onHoverEnd}
        onClick={handleClick}
      >
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial 
          color={isHovered ? "#f0f0f0" : "#ffffff"}
          map={texture || undefined}
        />
        
        {isHovered && (
          <Text
            position={[0, -1.5, 0.1]}
            fontSize={0.3}
            color="#000000"
            anchorX="center"
            anchorY="top"
            maxWidth={2}
          >
            {product.name}
            ${product.price.toLocaleString()}
          </Text>
        )}
      </mesh>
    </Float>
  );
};

export default Spiral3DScroll;