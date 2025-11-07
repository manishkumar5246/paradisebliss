'use client';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample destinations data
const destinations = [
	{
		title: 'Japan',
		startingPrice: '₹1,44,999',
		image: '/img/JI.jpg',
		link: '/international/japan-tour-packages',
	},
	{
		title: 'Georgia',
		startingPrice: '₹49,999',
		image: '/img/GI.jpg',
		link: '/international/georgia-tour-packages',
	},
	{
		title: 'Almaty',
		startingPrice: '₹47,999',
		image: '/img/AI.jpg',
		link: '/international/almaty-tour-packages',
	},
	{
		title: 'Europe',
		startingPrice: '₹1,29,999',
		image: '/img/EI.jpg',
		link: '/international/europe-tour-packages',
	},
	{
		title: 'Dubai',
		startingPrice: '₹54,000',
		image: '/img/DI.jpg',
		link: '/international/dubai-tour-packages',
	},
	{
		title: 'Thailand',
		startingPrice: '₹59,999',
		image: '/img/TI.jpg',
		link: '/international/thailand-tour-packages',
	},
	{
		title: 'Vietnam',
		startingPrice: '₹49,999',
		image: '/img/VI.jpg',
		link: '/international/vietnam-tour-packages',
	},
	{
		title: 'Bali',
		startingPrice: '₹49,999',
		image: '/img/BAI.jpg',
		link: '/international/bali-tour-packages',
	},
	{
		title: 'Bhutan',
		startingPrice: '₹49,999',
		image: '/img/BU.jpg',
		link: '/international/bhutan-tour-packages',
	},
];

export default function DomesticGetaways() {
	const [swiperRef, setSwiperRef] = useState(null);

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center mb-4">
					<h2
						style={{ color: 'var(--color-dark)', fontFamily: 'salazur' }}
						className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3"
					>
						<span className="italic">Best International Tour Packages</span> from India
					</h2>
					<p className="text-gray-600 text-base sm:text-lg">Explore beautiful destinations around the world.</p>
				</div>

				{/* Slider Container */}
				<div className="relative overflow-visible">
					{/* Centered overlay nav arrows */}
					<button
						className="domestic-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[70%] sm:-translate-x-[90%] md:-translate-x-[110%] lg:-translate-x-[130%] z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110  bg-[#00453A] text-white transition-all ease-in-out cursor-pointer border"
						aria-label="Previous"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 sm:h-6 sm:w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						className="domestic-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-[70%] sm:translate-x-[90%] md:translate-x-[110%] lg:translate-x-[130%] z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-110 shadow-lg flex items-center justify-center bg-[#00453A] text-white transition-all ease-in-out"
						aria-label="Next"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 sm:h-6 sm:w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>

					<Swiper
						modules={[Pagination, Navigation]}
						spaceBetween={20}
						slidesPerView={1}
						onSwiper={setSwiperRef}
						pagination={{
							clickable: true,
							el: '.domestic-pagination',
							dynamicBullets: false,
						}}
						navigation={{
							nextEl: '.domestic-button-next',
							prevEl: '.domestic-button-prev',
						}}
						breakpoints={{
							640: { slidesPerView: 2 },
							768: { slidesPerView: 3 },
							1024: { slidesPerView: 4 },
							1280: { slidesPerView: 5 },
						}}
						className="py-8"
					>
						{destinations.map((destination, index) => (
							<SwiperSlide key={index}>
								<Link href={destination.link}>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										whileHover={{
											scale: 1.03,
											y: -5,
										}}
										className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer h-80 sm:h-96 group"
									>
										{/* Background Image */}
										<div className="absolute inset-0">
											<Image
												height={500}
												width={400}
												src={destination.image}
												alt={destination.title}
												className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
												onError={(e) => {
													e.target.src = '/img/placeholder.jpg';
												}}
											/>
											{/* Gradient Overlay */}
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
										</div>

										{/* Content */}
										<div className="relative h-full flex flex-col justify-end p-6">
											<h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
												{destination.title}
											</h3>
											<div className="flex items-center justify-between">
												<div>
													<p className="text-white text-xs sm:text-sm mb-1 font-semibold">
														STARTING FROM
													</p>
													<p className="text-white text-xl sm:text-2xl font-bold">
														{destination.startingPrice}
													</p>
												</div>
												{/* Arrow Button */}
												<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00453A] flex items-center justify-center transition-all duration-300 group-hover:bg-[#00332A] group-hover:scale-110 group-hover:rotate-[-45deg]">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 sm:h-6 sm:w-6 text-white"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M17 8l4 4m0 0l-4 4m4-4H3"
														/>
													</svg>
												</div>
											</div>
										</div>
									</motion.div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Centered dots below */}
					<div className="domestic-pagination mt-6 flex justify-center"></div>
				</div>
			</div>

			{/* Center dots via global styles */}
			<style jsx global>{`
				.domestic-pagination {
					display: flex;
					justify-content: center; /* center the dots */
					align-items: center;
					gap: 8px;
					min-height: 20px;
				}
				.domestic-pagination .swiper-pagination-bullet {
					background: #d1d5db;
					width: 10px;
					height: 10px;
					opacity: 1;
					transition: all 0.3s ease;
					margin: 0 !important;
					display: inline-block;
					flex-shrink: 0;
				}
				.domestic-pagination .swiper-pagination-bullet-active {
					background: #00453A;
					width: 28px;
					border-radius: 5px;
				}
				.swiper-button-disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}
			`}</style>
		</>
	);
}