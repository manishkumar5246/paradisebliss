'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Sample gallery images data
const galleryImages = [
  { id: 1, src: '/img/r1.jpg', alt: 'Customer Travel Moments', span: 'row-span-2' },
  { id: 2, src: '/img/r2.jpg', alt: 'Customer Travel Moments', span: 'row-span-2' },
  { id: 3, src: '/img/r7.jpg', alt: 'Customer Travel Moments', span: 'col-span-2' },
  { id: 4, src: '/img/r4.jpg', alt: 'Customer Travel Moments', span: '' },
  { id: 5, src: '/img/r5.jpg', alt: 'Customer Travel Moments', span: '' },
  { id: 6, src: '/img/r8.jpg', alt: 'Customer Travel Moments', span: 'col-span-2' },
  { id: 7, src: '/img/r3.jpg', alt: 'Customer Travel Moments', span: '' },
  { id: 8, src: '/img/r6.jpg', alt: 'Customer Travel Moments', span: '' },
  { id: 9, src: '/img/r9.jpg', alt: 'Customer Travel Moments', span: 'col-span-2' },
  { id: 10, src: '/img/r10.jpg', alt: 'Customer Travel Moments', span: '' },
  { id: 11, src: '/img/r11.jpg', alt: 'Customer Travel Moments', span: '' },
  { id: 12, src: '/img/r15.jpg', alt: 'Customer Travel Moments', span: 'col-span-2' },
  { id: 13, src: '/img/r13.jpg', alt: 'Customer Travel Moments', span: '' },
];

export default function DVDiaries() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-[#00453a] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="relative inline-block mb-6">
              <h2
                style={{ fontFamily: 'salazur', color: '#F4E9CD' }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3"
              >
                <span className="italic">PBT Diaries</span>
              </h2>
              {/* Curved Underline SVG */}
              <svg 
                className="absolute -bottom-2 left-0" 
                width="180" 
                height="20" 
                viewBox="0 0 180 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 5 15 Q 45 5, 90 10 T 175 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                />
              </svg>
            </div>
            <p className="text-[#F4E9CD]/80 text-base sm:text-lg mb-2">
              The faces, places
            </p>
            <p className="text-[#F4E9CD]/80 text-base sm:text-lg">
              & stories that made it epic
            </p>
          </motion.div>

          {/* Right Side - Gallery Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onHoverStart={() => setHoveredId(image.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => setSelectedImage(image)}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${image.span}`}
                >
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                    onError={(e) => {
                      e.target.src = '/img/placeholder.jpg';
                    }}
                  />
                  
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated border effect */}
                  <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-500"></div>
                  
                  {/* Subtle brightness increase */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500 mix-blend-overlay"></div>
                </motion.div>
              ))}

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-gradient-to-br from-[#F4E9CD] via-white to-[#F4E9CD]/50 rounded-2xl p-4 sm:p-6 flex flex-col justify-center items-center text-center group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-[#F4E9CD]/30"
              >
                <motion.div 
                  className="mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-2xl sm:text-3xl">💕</span>
                </motion.div>
                <h3 className="text-sm sm:text-base font-bold text-[#00453a] mb-2">
                  Craving more moments?
                </h3>
                <a
                  href="https://www.instagram.com/paradiseblisstours?igsh=YXZpaHE3ZHBxZ3gy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-[#00453a] font-semibold hover:text-[#002920] transition-colors duration-300 underline decoration-2 underline-offset-2 decoration-[#00453a] group-hover:decoration-[#002920]"
                >
                  Follow us on Instagram
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal/Popup */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[90vh] cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#F4E9CD] transition-colors duration-300 z-10"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = '/img/placeholder.jpg';
              }}
            />
          </motion.div>
        </motion.div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}