'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { AiOutlineCalendar } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import WhyChooseUs from '@/components/whychooseus';
import Link from 'next/link';
import Image from 'next/image';

const tours = [
  {
    title: "Spain Backpacking – La Tomatina Special",
    dates: ["Aug 25", "Aug 26", "Aug 27"],
    prices: ["Starting ₹1,49,999*", "₹1,29,999*"],
    image: "/optimised/euro1.jpg",
    duration: "9D/8N",
    group: "Group Tour",
    link: "/trip-packages/europe-packages",
  },
];

const EuropeTour = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: null,
    travellers: '',
    email: '',
    package: 'Europe Tour',
  });

  const handleOpenModal = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
    setFormData({ name: '', phone: '', date: null, travellers: '', email: '', package: 'Europe Tour' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, tour: selectedTour });
    handleCloseModal();
  };

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    console.log('Hero form submitted:', formData);
    setFormData({ name: '', phone: '', date: null, travellers: '', email: '', package: 'Europe Tour' });
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const stats = [
    { img: '/img/instagram.png', text: 'Community of<br/> 400k+ On Instagram' },
    { img: '/img/star.png', text: '4.8<br/>Ratings' },
    { img: '/img/travel.png', text: '400+<br/>Itineraries' },
    { img: '/img/wallet.png', text: 'Book Now &<br/>Pay Later' },
  ];

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex justify-center lg:justify-end items-center px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: "url('/optimised/spain.webp')" }}
      >
        <h2
          className="absolute top-1/2 left-1/2 lg:left-auto lg:right-[60%] transform -translate-x-1/2 lg:translate-x-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center lg:text-left z-10 font-serif drop-shadow-lg"
        >
          Europe Tour
        </h2>
        <motion.form
          id="travel"
          autoComplete="on"
          onSubmit={handleHeroFormSubmit}
          className="hidden lg:block bg-[#E4DECF]/90 bg-opacity-80 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md z-20 mt-16 lg:mt-20 lg:mr-4 xl:mr-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            width={100}
            height={100}
            src="/img/logo.png"
            alt="Paradise Bliss Tours Logo"
            className="w-16 sm:w-20 md:w-24 mb-4 mx-auto"
          />
          <label htmlFor="name" className="block mb-2 text-left text-gray-700 text-sm sm:text-base">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John"
            required
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base focus:ring-[#00453A] focus:border-[#00453A]"
            aria-label="Full name"
          />
          <label htmlFor="phone" className="block mb-2 text-left text-gray-700 text-sm sm:text-base">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base focus:ring-[#00453A] focus:border-[#00453A]"
            aria-label="Phone number"
          />
          <label htmlFor="package" className="block mb-2 text-left text-gray-700 text-sm sm:text-base">
            Package
          </label>
          <select
            id="package"
            name="package"
            value={formData.package}
            onChange={handleInputChange}
            required
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base focus:ring-[#00453A] focus:border-[#00453A]"
            aria-label="Tour package selection"
          >
            <option value="Europe Tour">Europe Tour</option>
            <option value="La Tomatina Special">La Tomatina Special</option>
            <option value="Multi-Country Europe">Multi-Country Europe</option>
          </select>
          <label htmlFor="email" className="block mb-2 text-left text-gray-700 text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@mail.com"
            required
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base focus:ring-[#00453A] focus:border-[#00453A]"
            aria-label="Email address"
          />
          <motion.input
            type="submit"
            value="Submit"
            className="w-full bg-[#00453a] text-white p-2 rounded hover:bg-green-600 transition font-bold text-sm sm:text-base cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Submit form"
          />
        </motion.form>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center text-center my-12 px-4 w-full max-w-6xl mx-auto bg-gradient-to-b from-[#F1FDF3] to-white rounded-lg shadow-lg p-8">
        <motion.h2
          className="font-sans text-4xl sm:text-5xl font-bold text-green-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Europe with Paradise Bliss Tours
        </motion.h2>
        <motion.p
          className="font-sans text-lg text-gray-700 mb-6 w-full max-w-5xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Europe is a tapestry of varied histories, cuisines, architecture and adventures. From the sunlit coasts of the Mediterranean to the snow-capped Alps — it’s a continent that invites exploration. With Paradise Bliss Tours, our Europe packages deliver iconic highlights and hidden gems in one seamless experience.
        </motion.p>

        {/* Expandable Content */}
        <div
          ref={contentRef}
          className={`text-left w-full max-w-5xl overflow-hidden transition-all duration-700 ease-in-out transform ${
            isOpen ? 'opacity-100 scale-y-100 mb-6' : 'opacity-0 scale-y-0'
          }`}
          style={{
            height: isOpen ? `${contentHeight}px` : '0px',
            transformOrigin: 'top',
          }}
        >
          <div className="py-6 space-y-8">

            {/* Backpacking & Signature Tours */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Europe Backpacking & Signature Tours</h3>
              <p className="text-gray-600">
                One of our standout offerings is the <strong>Spain Backpacking – La Tomatina Special</strong>, a vibrant 9-day trip that weaves party energy, cultural jewels, and scenic relaxation into one epic itinerary.
              </p>
              <p className="text-gray-600 mt-2">Highlights include:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                <li>Electric nightlife and city walkabout in Madrid</li>
                <li>The world’s most famous food fight at La Tomatina in Valencia</li>
                <li>Architecture, beaches and Gaudí in Barcelona</li>
                <li>Chill time at the Mediterranean coast (Costa Brava)</li>
              </ul>
              <p className="text-gray-600 mt-3">
                Beyond Spain, our Europe catalog includes multi-country tours across France, Italy, Switzerland, Germany, the UK, the Nordics and more — mixing classic landmarks with offbeat discoveries.
              </p>
            </div>

            {/* Best Time to Visit */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Best Time to Visit Europe</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Spring (Mar-May):</strong> Gardens blooming, pleasant cities, fewer crowds</li>
                <li><strong>Summer (Jun-Aug):</strong> Festival season, long daylight, coastal adventures</li>
                <li><strong>Autumn (Sep-Nov):</strong> Harvest vibes, golden foliage, comfortable exploration</li>
                <li><strong>Winter (Dec-Feb):</strong> Snowy Alps, Christmas markets, northern lights</li>
              </ul>
              <p className="text-gray-600 mt-2">For Spain’s La Tomatina, <strong>late August</strong> is the prime window.</p>
            </div>

            {/* How You Reach */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">How You Reach & Travel Around</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Flights:</strong> We coordinate international flights from major Indian cities into European hubs (Madrid, Paris, London, etc.).</li>
                <li><strong>In-Europe Travel:</strong> High-speed trains, buses, and regional flights to maximize comfort and sightseeing.</li>
                <li><strong>Visas:</strong> Schengen visa assistance and documentation support provided.</li>
                <li><strong>Transfers:</strong> Airport pick-ups, intercity transfers, and in-country routing simplified.</li>
              </ul>
            </div>

            {/* Sample Tour */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">What a Sample Europe Tour Could Look Like</h3>
              <p className="text-gray-600">Your days might include:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                <li>Morning city walks through historic quarters</li>
                <li>Afternoon museum visits, local food tastings or festival stops</li>
                <li>Evening leisure — street music, local markets, strolls by rivers</li>
                <li>Scenic coastal escape or countryside day trips</li>
                <li>Occasional free time to wander or rest</li>
              </ul>
              <p className="text-gray-600 mt-3">We always keep balance — active days and relaxed ones.</p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Europe Highlights to Explore</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                <li><strong>Spain:</strong> Madrid, Valencia (La Tomatina), Barcelona, Costa Brava</li>
                <li><strong>France & Italy:</strong> Paris, Nice, Rome, Florence, Venice</li>
                <li><strong>Central Europe:</strong> Prague, Vienna, Budapest</li>
                <li><strong>Alps & Nature:</strong> Switzerland (Interlaken, Zermatt), Austria, Slovenia</li>
                <li><strong>Northern Europe:</strong> Scandinavia, fjords, northern lights</li>
                <li><strong>UK & Ireland:</strong> London, Edinburgh, Dublin</li>
              </ul>
            </div>

            {/* Inclusions & Exclusions */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">What’s Included & What’s Not</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Included:</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>8 nights’ hostel accommodation (shared rooms)</li>
                    <li>Train journey: Madrid to Valencia</li>
                    <li>La Tomatina: transport, entry, after-party</li>
                    <li>Walking tours in Madrid & Barcelona</li>
                    <li>Beach days, boat party in Ibiza, nightlife events</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-2">Not Included:</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>International & domestic flights</li>
                    <li>Visa & insurance</li>
                    <li>Meals beyond specified</li>
                    <li>Personal expenses, tips, drinks</li>
                    <li>Upgrades or extra transfers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cost */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Cost & Options</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>Base Price (Spain Only):</strong> ₹1,29,999 per person</li>
                <li><strong>With Domestic Flights:</strong> Higher (adjusted based on flight costs)</li>
                <li>Additional taxes/charges may apply</li>
              </ul>
            </div>

            {/* Trip Vibe */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Trip Vibe & Who This Is For</h3>
              <p className="text-gray-600 leading-relaxed">
                This is for those craving <strong>festivals, dance floors, party sunsets, sun-kissed beaches, art & architecture</strong>, and the energy of Spain’s wildest hour. Perfect for <strong>solo travellers, energetic groups</strong>, or anyone ready to live large.
              </p>
            </div>

            {/* Important Notes */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Important Notes</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Hostel check-in/out times apply</li>
                <li>Flight costs within Spain are dynamic</li>
                <li>Cancellation policies apply</li>
                <li>Valid Schengen visa & travel documents required</li>
              </ul>
            </div>

            {/* Full Itinerary */}
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">9-Day La Tomatina Itinerary</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 1: Arrival in Madrid</summary>
                  <p className="mt-2">Land in Madrid, transfer to hostel. Explore rooftop bars, La Latina, Malasaña, Chueca. Dive into electric nightlife.</p>
                </details>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 2: Madrid City Tour</summary>
                  <p className="mt-2">Royal Palace, Plaza Mayor, Mercado de San Miguel, Prado/Reina Sofía, El Retiro Park. Evening: tapas & optional flamenco.</p>
                </details>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 3: To Valencia</summary>
                  <p className="mt-2">High-speed train to Valencia. Explore old town, Cathedral, beach, paella dinner.</p>
                </details>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 4: La Tomatina Festival</summary>
                  <p className="mt-2">Early trip to Buñol. Tomato fight at noon. Return, clean up, after-party with music & food.</p>
                </details>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 5: Fly to Ibiza</summary>
                  <p className="mt-2">Flight to Ibiza. Explore Dalt Vila, coastline. Night: world-famous club scene.</p>
                </details>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 6: Ibiza Beach & Boat Party</summary>
                  <p className="mt-2">Cala Comte, Playa d’en Bossa. Sunset boat party with music & drinks.</p>
                </details>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 7: To Barcelona</summary>
                  <p className="mt-2">Travel to Barcelona. Afternoon on beaches or Gothic Quarter. Tapas by the sea.</p>
                </details>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 8: Gaudí & Barceloneta</summary>
                  <p className="mt-2">Sagrada Família, Park Güell, Casa Batlló, La Pedrera. Relax on Barceloneta Beach.</p>
                </details>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="font-semibold cursor-pointer">Day 9: Departure</summary>
                  <p className="mt-2">Final breakfast, beach walk or shopping. Depart with memories.</p>
                </details>
              </div>
            </div>

          </div>
        </div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-6 px-8 py-3 cursor-pointer bg-green-900 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Show less content' : 'Show more content'}
        >
          {isOpen ? 'Show Less' : 'Explore More'}
        </motion.button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 p-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center text-green-900 flex-1 max-w-xs mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              width={48}
              height={48}
              src={stat.img}
              alt={stat.text.split('<br/>')[0]}
              className="w-12 h-12 mx-auto"
            />
            <p
              className="mt-2 text-lg font-bold"
              dangerouslySetInnerHTML={{ __html: stat.text }}
            />
          </motion.div>
        ))}
      </div>

      {/* Tour Packages Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          style={{ color: 'var(--color-dark)', fontFamily: 'salazur' }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold py-6 text-center"
        >
          Europe Tour Packages
        </h1>
      </div>

      <div
        style={{ backgroundColor: 'var(--light-green)' }}
        className="relative px-4 sm:px-6 lg:px-10 py-10"
      >
        <div className="swiper-container">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
              dynamicBullets: true,
              renderBullet: (index, className) => `<span class="${className}"></span>`,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3.5 },
            }}
            className="py-8"
          >
            {tours.map((tour, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    }}
                    className="h-full flex flex-col"
                  >
                    <Link href={tour.link} className="flex-1 flex flex-col cursor-pointer">
                      <Image
                        height={224}
                        width={400}
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-56 object-cover rounded-t-xl"
                      />
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {tour.duration} • {tour.group}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {tour.dates.map((date, i) => (
                            <span
                              key={i}
                              className="bg-[#F1FDF3] text-[#00453a] px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                              <AiOutlineCalendar className="text-[#00453a]" />
                              {date}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5 text-right">
                          <span className="text-gray-500 line-through text-base">
                            {tour.prices[0]}
                          </span>
                          <p className="text-xl font-bold text-green-600 mt-1">
                            {tour.prices[1]}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className="px-6 pb-6">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleOpenModal(tour);
                        }}
                        whileHover={{ scale: 1.05, backgroundColor: '#00332A' }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-[#00453A] text-white rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors duration-300 cursor-pointer"
                        aria-label={`Request callback for ${tour.title}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Request Callback
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination-custom mt-6 text-center"></div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
            aria-hidden="true"
          ></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-1 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              X
            </button>
            {selectedTour && (
              <div className="mb-4">
                <Image
                  height={128}
                  width={400}
                  src={selectedTour.image}
                  alt={selectedTour.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {selectedTour.title}
                </h3>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A]"
                      placeholderText="Select date"
                      required
                    />
                    <AiOutlineCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Travellers</label>
                  <input
                    type="number"
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleInputChange}
                    min="1"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A]"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-[#00453A] text-white rounded-lg font-semibold transition-colors duration-300 cursor-pointer"
                >
                  Submit Request
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .swiper-container { position: relative; }
        .swiper-pagination-custom { position: relative; bottom: 0; padding-bottom: 10px; }
        .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.8); width: 12px; height: 12px; margin: 0 8px; border-radius: 50%; }
        .swiper-pagination-bullet-active { background: var(--color-dark); width: 14px; height: 14px; opacity: 1; }
        .react-datepicker-wrapper { width: 100%; }
      `}</style>
      <WhyChooseUs />
    </>
  );
};

export default EuropeTour;