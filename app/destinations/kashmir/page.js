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

const tours = [
  {
    title: "Winter Kashmir Holiday Extravaganza",
    dates: ["Dec 22", "Dec 28"],
    prices: ["₹30,499*", "₹25,499*", "₹5,000 Off"],
    image: "/img/kashmir.jpg",
    duration: "5N6D",
    group: "Group Trip",
    link: "/indian-tours/kashmirwinterholiday-tour-package",
  },
  {
    title: "Kashmir Backpacking Odyssey",
    dates: ["Dates on Request"],
    prices: ["₹26,999*", "₹24,499*", "₹2,500 Off"],
    image: "/img/kashmir.jpg",
    duration: "5N6D",
    group: "Group Trip",
    link: "/indian-tours/kashmirbackpack-tour-package",
  },
  {
    title: "Magnificent Kashmir Romantic Escape",
    dates: ["Dates on Request"],
    prices: ["Price on Request*"],
    image: "/img/kashmir3.jpg",
    duration: "4N5D",
    group: "Couple Tour Package",
    link: "/indian-tours/kashmirmagnificant-tour-package",
  },
  {
    title: "Winter Kashmir Ultimate Circuit Journey",
    dates: ["Dates on Request"],
    prices: ["Price on Request*"],
    image: "/img/kashmir.jpg",
    duration: "6N7D",
    group: "Customized Holidays",
    link: "/indian-tours/kashmirwinterulti-tour-package",
  },
  {
    title: "Kashmir Summer Tour",
    dates: ["Jan 05", "Jan 12"],
    prices: ["₹35,999*", "₹32,499*", "₹3,500 Off"],
    image: "/img/kashmir3.jpg",
    duration: "6N7D",
    group: "Group Adventure",
    link: "/indian-tours/kashmirsummer-tour-package",
  },
   {
    title: "Kashmir tour packages",
    dates: ["Jan 05", "Jan 12"],
    prices: ["₹35,999*", "₹32,499*", "₹3,500 Off"],
    image: "/img/kashmir3.jpg",
    duration: "6N7D",
    group: "Group Adventure",
    link: "/indian-tours/kashmir-tour-package",
  },
   {
    title: "Kashmir Tour",
    dates: ["Jan 05", "Jan 12"],
    prices: ["₹35,999*", "₹32,499*", "₹3,500 Off"],
    image: "/img/kashmir3.jpg",
    duration: "6N7D",
    group: "Group Adventure",
    link: "/indian-tours/kashmirU-tour-package",
  },
];

const KashmirTour = () => {
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
    package: 'Kashmir Tour',
  });

  const handleOpenModal = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
    setFormData((prev) => ({
      ...prev,
      name: '',
      phone: '',
      date: null,
      travellers: '',
      email: '',
    }));
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
    console.log('Modal Form Submitted:', { ...formData, tour: selectedTour?.title });
    handleCloseModal();
  };

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    console.log('Hero Form Submitted:', formData);
    alert('Thank you! We will contact you soon.');
    setFormData((prev) => ({
      ...prev,
      name: '',
      phone: '',
      email: '',
      package: 'Kashmir Tour',
    }));
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
        style={{ backgroundImage: "url('/img/kashmir.jpg')" }}
      >
        <h2
          className="absolute top-1/2 left-1/2 lg:left-auto lg:right-[60%] transform -translate-x-1/2 lg:translate-x-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center lg:text-left z-10 font-serif"
        >
          Kashmir Tour
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
          <img
            width={100}
            height={100}
            src="/img/logo.png"
            alt="Paradise Bliss Tours Logo"
            className="w-16 sm:w-20 md:w-24 mb-4 mx-auto"
          />
          <label htmlFor="name" className="block text-left text-gray-700 text-sm sm:text-base mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base focus:ring-[#00453A] focus:border-[#00453A]"
            aria-label="Full name"
          />

          <label htmlFor="phone" className="block text-left text-gray-700 text-sm sm:text-base mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 98765 43210"
            required
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base focus:ring-[#00453A] focus:border-[#00453A]"
            aria-label="Phone number"
          />

          <label htmlFor="package" className="block text-left text-gray-700 text-sm sm:text-base mb-2">
            Package
          </label>
          <select
            id="package"
            name="package"
            value={formData.package}
            onChange={handleInputChange}
            required
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base focus:ring-[#00453A] focus:border-[#00453A]"
          >
            <option value="Kashmir Tour">Kashmir Tour</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Sikkim">Sikkim</option>
          </select>

          <label htmlFor="email" className="block text-left text-gray-700 text-sm sm:text-base mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            required
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base focus:ring-[#00453A] focus:border-[#00453A]"
            aria-label="Email address"
          />

          <motion.button
            type="submit"
            className="w-full bg-[#00453a] text-white py-3 rounded font-bold hover:bg-green-700 transition cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Inquiry
          </motion.button>
        </motion.form>
      </div>

      {/* About Kashmir Section */}
      <div className="flex flex-col items-center text-center my-12 px-4 w-full max-w-6xl mx-auto bg-gradient-to-b from-[#F1FDF3] to-white rounded-lg shadow-lg p-8">
        <motion.h2
          className="font-sans text-4xl sm:text-5xl font-bold text-green-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Kashmir – The Paradise on Earth
        </motion.h2>
        <motion.p
          className="font-sans text-lg text-gray-700 mb-6 w-full max-w-5xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Known as “Heaven on Earth,” Kashmir is a land where nature reveals its most breathtaking beauty. With snow-clad mountains, crystal-clear lakes, blooming gardens, and a rich cultural heritage, Kashmir is a dream destination that captivates every traveler’s heart.
        </motion.p>

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
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">The Beauty That Defines Paradise</h3>
              <p className="text-gray-600 leading-relaxed">
                Kashmir’s charm lies in its serene landscapes and natural splendor. The shimmering Dal Lake and Nigeen Lake in Srinagar are adorned with colorful shikaras and houseboats, offering peaceful rides amidst floating gardens and snow-capped backdrops.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Must-Visit Destinations in Kashmir</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Srinagar:</strong> The summer capital with Dal Lake, Mughal Gardens, and vibrant markets.</li>
                <li><strong>Gulmarg:</strong> Famous for skiing, Gondola rides, and stunning snow views.</li>
                <li><strong>Pahalgam:</strong> Known as the “Valley of Shepherds” – ideal for nature walks and riverside picnics.</li>
                <li><strong>Sonamarg:</strong> The “Meadow of Gold” with glaciers and trekking routes.</li>
                <li><strong>Betaab & Aru Valley:</strong> Perfect for photography and peaceful retreats.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Adventure & Culture</h3>
              <p className="text-gray-600 leading-relaxed">
                From trekking and skiing to experiencing Kashmiri Wazwan cuisine, Pashmina shopping, and warm Kahwa hospitality — Kashmir offers a complete sensory journey.
              </p>
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-6 px-8 py-3 bg-green-900 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? 'Show Less' : 'Explore More'}
        </motion.button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 p-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center text-green-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img width={48} height={48} src={stat.img} alt="" className="w-12 h-12 mx-auto" />
            <p className="mt-2 text-lg font-bold" dangerouslySetInnerHTML={{ __html: stat.text }} />
          </motion.div>
        ))}
      </div>

      {/* Tour Packages Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          style={{ color: 'var(--color-dark)', fontFamily: 'salazur' }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold py-6 text-center"
        >
          Kashmir Tour Packages
        </h1>
      </div>

      <div style={{ backgroundColor: 'var(--light-green)' }} className="relative px-4 sm:px-6 lg:px-10 py-10">
        <div className="swiper-container">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.swiper-pagination-custom', dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3.5 },
            }}
            className="py-8"
          >
            {tours.map((tour, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden h-full flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                    className="h-full flex flex-col"
                  >
                    <Link href={tour.link} className="flex-1 flex flex-col">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-56 object-cover rounded-t-xl"
                        onError={(e) => (e.target.src = '/img/placeholder.jpg')}
                      />
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                          <p className="text-sm text-gray-700 mt-1">{tour.duration} • {tour.group}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {tour.dates.map((date, i) => (
                              <span key={i} className="bg-[#F1FDF3] text-[#00453a] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                <AiOutlineCalendar />
                                {date}
                              </span>
                            ))}
                          </div>
                          {tour.prices[1] && (
                            <div className="mt-5 text-right">
                              {tour.prices[0] !== "Price on Request*" && (
                                <span className="text-gray-500 line-through text-base">{tour.prices[0]}</span>
                              )}
                              <p className="text-xl font-bold text-green-600 mt-1">
                                {tour.prices[1] || tour.prices[0]}
                              </p>
                              {tour.prices[2] && <p className="text-sm text-red-600">{tour.prices[2]}</p>}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>

                    <div className="px-6 pb-6">
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenModal(tour);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-[#00453A] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#00332A] transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6"
          >
            <button onClick={handleCloseModal} className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-800">×</button>
            {selectedTour && (
              <>
                <img src={selectedTour.image} alt={selectedTour.title} className="w-full h-32 object-cover rounded-lg" />
                <h3 className="mt-4 text-xl font-bold text-gray-900">{selectedTour.title}</h3>
              </>
            )}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="w-full p-3 border rounded-lg" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" required className="w-full p-3 border rounded-lg" />
              <DatePicker selected={formData.date} onChange={handleDateChange} minDate={new Date()} placeholderText="Preferred Date" className="w-full p-3 border rounded-lg" required />
              <input type="number" name="travellers" value={formData.travellers} onChange={handleInputChange} placeholder="No. of Travellers" min="1" required className="w-full p-3 border rounded-lg" />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#00453A] text-white py-3 rounded-lg font-bold"
              >
                Submit Request
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .swiper-pagination-bullet { background: white; opacity: 0.8; }
        .swiper-pagination-bullet-active { background: #00453A; opacity: 1; width: 14px; height: 14px; }
        .react-datepicker-wrapper { width: 100%; }
      `}</style>

      <WhyChooseUs />
    </>
  );
};

export default KashmirTour;