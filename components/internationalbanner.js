'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function InternationalSlider() {
  const banners = [
    { id: 1, alt: 'Bali Banner', image: '/optimised/b.webp', href: '/international/bali-tour-packages' },
    { id: 2, alt: 'Dubai Banner', image: '/optimised/d.webp', href: '/international/dubai-tour-packages' },
    { id: 4, alt: 'Thailand Banner', image: '/optimised/t.webp', href: '/international/thailand-tour-packages' },
    { id: 5, alt: 'Vietnam Banner', image: '/optimised/v.webp', href: '/international/vietnam-tour-packages' },
  ];

  const [mobileHeights, setMobileHeights] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const imgRefs = useRef([]);

  useEffect(() => {
    const updateDimensions = () => {
      const currentIsMobile = window.innerWidth < 640;
      setIsMobile(currentIsMobile);

      if (!currentIsMobile) {
        setMobileHeights({});
        return;
      }

      const heights = {};
      imgRefs.current.forEach((img, index) => {
        if (img && img.naturalWidth && img.naturalHeight) {
          const containerWidth = img.parentElement?.clientWidth || img.clientWidth;
          const aspectRatio = img.naturalHeight / img.naturalWidth;
          heights[index] = Math.round(containerWidth * aspectRatio);
        }
      });
      setMobileHeights(heights);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    imgRefs.current.forEach((img) => {
      if (img) {
        if (img.complete) {
          updateDimensions();
        } else {
          img.onload = updateDimensions;
        }
      }
    });

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [banners.length]);

  return (
    <div className="relative w-screen py-8 px-0 overflow-hidden">
      <style jsx global>{`
        .international-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          min-height: 20px;
        }
        .international-pagination .swiper-pagination-bullet {
          background: #d1d5db;
          width: 10px;
          height: 10px;
          opacity: 1;
          transition: all 0.3s ease;
          margin: 0 !important;
          display: inline-block;
          flex-shrink: 0;
        }
        .international-pagination .swiper-pagination-bullet-active {
          background: #00453A;
          width: 28px;
          border-radius: 5px;
        }
        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Full-width slider */}
      <div className="relative w-full">
        {/* Nav arrows (centered vertically) */}
        <button
          className="international-button-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:scale-110 shadow-lg flex items-center justify-center bg-[#00453A] text-white transition-all cursor-pointer "
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="international-button-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 cursor-pointer  bg-[#00453A] text-white transition-all duration-300 "
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.international-pagination', dynamicBullets: false }}
          navigation={{ nextEl: '.international-button-next', prevEl: '.international-button-prev' }}
          loop={true}
          breakpoints={{
            0:   { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 10 },
            1024:{ slidesPerView: 1.2, spaceBetween: 20 },
          }}
          className="w-full"
        >
          {banners.map((banner, index) => {
            const dynamicHeight = isMobile && mobileHeights[index] ? `${mobileHeights[index]}px` : undefined;

            return (
              <SwiperSlide key={banner.id}>
                <Link href={banner.href || '#'} className="block cursor-pointer" aria-label={banner.alt}>
                  <div
                    className="relative rounded-none md:rounded-xl overflow-hidden shadow-2xl h-[220px] sm:h-[260px] md:h-[420px] lg:h-[520px] xl:h-[360px]"
                    style={{ height: dynamicHeight }}
                  >
                    <img
                      ref={(el) => { imgRefs.current[index] = el; }}
                      src={banner.image}
                      alt={banner.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Centered dots below */}
      <div className="international-pagination mt-6"></div>
    </div>
  );
}