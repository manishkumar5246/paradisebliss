'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRef, useEffect } from 'react';

export default function VideoSlider() {
  const videos = [
    { src: '/videos/vid1.mp4' },
    { src: '/videos/vid.2.mp4' },
    { src: '/videos/vid3.mp4' },
    { src: '/videos/vid4.mp4' },
    { src: '/videos/rajasthan.mp4' },
    { src: '/videos/kerela.mp4' },
  ];

  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos.length]);

  const handleMouseEnter = (index) => {
    videoRefs.current.forEach((ref, i) => {
      if (ref && i !== index) ref.pause();
    });
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  const handleMouseLeave = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <h1
          style={{ color: 'var(--color-dark)', fontFamily: 'salazur' }}
          className="text-4xl md:text-6xl font-bold pt-10 text-center"
        >
          See What It Feels Like
        </h1>
      </div>
      <div style={{ backgroundColor: 'var(--light-green)' }} className="flex items-center justify-center relative">
        <div className="max-w-4xl w-full px-4 py-10 relative overflow-visible">
          {/* Nav arrows */}
          <button style={{ backgroundColor: 'var(--color-dark)' }} 
            className="video-swiper-button-prev  hover:scale-110 ease-in-out transition-all cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[90%] sm:-translate-x-[110%] md:-translate-x-[130%] lg:-translate-x-[150%] z-20 bg-white w-11 h-11 rounded-full shadow-md flex items-center justify-center border border-[#00453a]/30"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
           <button style={{ backgroundColor: 'var(--color-dark)' }} 
            className="video-swiper-button-next hover:scale-110 ease-in-out transition-all cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 translate-x-[90%] sm:translate-x-[110%] md:translate-x-[130%] lg:translate-x-[150%] z-20 bg-white w-11 h-11 rounded-full shadow-md flex items-center justify-center border border-[#00453a]/30"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: false, el: '.video-pagination' }}
            navigation={{ nextEl: '.video-swiper-button-next', prevEl: '.video-swiper-button-prev' }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = '.video-swiper-button-prev';
              swiper.params.navigation.nextEl = '.video-swiper-button-next';
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="py-4"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' }}
                  className="bg-transparent rounded-xl shadow-xl overflow-hidden transition-all duration-300 relative"
                >
                  <div className="w-full h-0 pb-[177.78%]">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video.src}
                      loop
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .video-pagination {
             width: 100% !important;
             display: flex !important;
             justify-content: center !important; /* center the dots */
             align-items: center !important;
             gap: 8px;
             min-height: 20px;
             margin: 0 auto; /* ensure centered container */
            }
            .video-pagination .swiper-pagination-bullet {
              background: #d1d5db; /* gray */
              width: 10px;
              height: 10px;
              opacity: 1;
              transition: all 0.3s ease;
              margin: 0 !important;
              display: inline-block;
              flex-shrink: 0;
            }
            .video-pagination .swiper-pagination-bullet-active {
              background: #00453A; /* dark green */
              width: 28px;
              border-radius: 5px;
            }
          `}</style>
          <div className="video-pagination mt-6 w-full flex justify-center"></div>
        </div>
      </div>
    </>
  );
}