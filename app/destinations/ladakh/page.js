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
    title: "Ladakh tour package",
    dates: ["May 15", "June 01", "July 10"],
    prices: ["Starting ₹25,990*", "₹22,990*"],
    image: "/img/ladakh.jpg",
    duration: "7D6N",
    group: "Group Tour",
    link: "/indian-tours/ladakh-tour-package",
  },
  {
    title: "ladakh Bike tour Package",
    dates: ["May 20", "June 05", "July 15"],
    prices: ["Starting ₹22,990*", "₹19,990*"],
    image: "/img/ladakh.jpg",
    duration: "5D4N",
    group: "Group Tour",
    link: "/indian-tours/ladakhbike-tour-package",
  },
  {
    title: "ladakh Package",
    dates: ["June 10", "July 05", "Aug 01"],
    prices: ["Starting ₹35,990*", "₹32,990*"],
    image: "/img/ladakh.jpg",
    duration: "6D5N",
    group: "Group Tour",
    link: "/indian-tours/ladakhU-tour-package",
  },
];

const LadakhTour = () => {
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
    package: 'Ladakh Tour',
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
    alert('Thank you! We will contact you soon.');
    handleCloseModal();
  };

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    console.log('Hero Form Submitted:', formData);
    alert('Thank you! Your inquiry has been sent.');
    setFormData((prev) => ({
      ...prev,
      name: '',
      phone: '',
      email: '',
      package: 'Ladakh Tour',
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
        style={{ backgroundImage: "url('/img/ladakh.jpg')" }}
      >
        <h2
          className="absolute top-1/2 left-1/2 lg:left-auto lg:right-[60%] transform -translate-x-1/2 lg:translate-x-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center lg:text-left z-10 font-serif"
        >
          Ladakh Tour
        </h2>

        <motion.form
          onSubmit={handleHeroFormSubmit}
          className="hidden lg:block bg-[#E4DECF]/90 p-6 rounded-lg shadow-lg w-full max-w-md z-20 mt-16 lg:mt-20 lg:mr-4 xl:mr-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/img/logo.png" alt="Paradise Bliss Tours Logo" className="w-20 mx-auto mb-6" />

          <label className="block text-left text-gray-700 text-sm mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            className="w-full p-3 mb-4 border rounded focus:ring-[#00453A] focus:border-[#00453A]"
          />

          <label className="block text-left text-gray-700 text-sm mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 98765 43210"
            required
            className="w-full p-3 mb-4 border rounded focus:ring-[#00453A] focus:border-[#00453A]"
          />

          <label className="block text-left text-gray-700 text-sm mb-2">Package</label>
          <select
            name="package"
            value={formData.package}
            onChange={handleInputChange}
            required
            className="w-full p-3 mb-4 border rounded focus:ring-[#00453A] focus:border-[#00453A]"
          >
            <option value="Ladakh Tour">Ladakh Tour</option>
            <option value="Kerala Tour">Kerala Tour</option>
            <option value="Sikkim">Sikkim</option>
          </select>

          <label className="block text-left text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            required
            className="w-full p-3 mb-4 border rounded focus:ring-[#00453A] focus:border-[#00453A]"
          />

          <motion.button
            type="submit"
            className="w-full bg-[#00453A] text-white py-3 rounded font-bold hover:bg-[#00332A] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Inquiry
          </motion.button>
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
          Ladakh – The Land of High Passes
        </motion.h2>
        <motion.p
          className="font-sans text-lg text-gray-700 mb-6 w-full max-w-5xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Dream destination for every traveler seeking serenity, adventure, and a spiritual connection with nature. Popularly known as the “Land of High Passes,” Ladakh is a unique blend of raw natural beauty, ancient monasteries, and vibrant local culture.
        </motion.p>

        <div
          ref={contentRef}
          className={`text-left w-full max-w-5xl overflow-hidden transition-all duration-700 ease-in-out transform ${
            isOpen ? 'opacity-100 scale-y-100 mb-6' : 'opacity-0 scale-y-0'
          }`}
          style={{ height: isOpen ? `${contentHeight}px` : '0px', transformOrigin: 'top' }}
        >
          <div className="py-6 space-y-8 text-gray-600">
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">A Paradise for Adventure and Peace Seekers</h3>
              <p className="leading-relaxed">
                Ladakh isn’t just about breathtaking views—it’s about feeling alive in the purest sense. From motorbike rides on the world’s highest motorable roads to trekking through scenic valleys, every moment in Ladakh is filled with excitement and wonder.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Captivating Destinations to Explore</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Leh:</strong> The heart of Ladakh with Leh Palace & Shanti Stupa</li>
                <li><strong>Pangong Lake:</strong> The mesmerizing blue lake from 3 Idiots</li>
                <li><strong>Nubra Valley:</strong> Sand dunes, Bactrian camels & Diskit Monastery</li>
                <li><strong>Tso Moriri:</strong> Serene high-altitude lake with nomadic camps</li>
                <li><strong>Magnetic Hill:</strong> Gravity-defying optical illusion</li>
                <li><strong>Lamayuru:</strong> The Moonland of Ladakh</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Culture and People of Ladakh</h3>
              <p className="leading-relaxed">
                The people of Ladakh, with their warm smiles and rich traditions, add soul to this cold desert. Deeply rooted in Buddhist culture, the region celebrates vibrant festivals like Hemis Festival and Losar.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Ladakhi Cuisine</h3>
              <p className="leading-relaxed">
                Savor Thukpa, Momos, Skyu, and Butter Tea — hearty meals perfect for high-altitude living.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Best Time to Visit Ladakh</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>May–Sep:</strong> Best time — roads open, pleasant weather</li>
                <li><strong>Dec–Feb:</strong> Winter wonderland — Chadar Trek & snow adventure</li>
              </ul>
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-6 px-8 py-3 bg-green-900 text-white rounded-lg hover:bg-green-700 transition font-semibold"
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
            <img src={stat.img} alt="" className="w-12 h-12 mx-auto" />
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
          Ladakh Tour Packages
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
                    {/* Clickable Area */}
                    <Link href={tour.link} className="flex-1 flex flex-col">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-56 object-cover rounded-t-xl"
                        onError={(e) => (e.target.src = '/img/placeholder.jpg')}
                      />
                      <div className="p-6 flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                        <p className="text-sm text-gray-700 mt-1">{tour.duration} • {tour.group}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {tour.dates.map((date, i) => (
                            <span key={i} className="bg-[#F1FDF3] text-[#00453a] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                              <AiOutlineCalendar /> {date}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5 text-right">
                          <span className="text-gray-500 line-through text-base">{tour.prices[0]}</span>
                          <p className="text-xl font-bold text-green-600 mt-1">{tour.prices[1]}</p>
                        </div>
                      </div>
                    </Link>

                    {/* Request Callback Button */}
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} aria-hidden="true"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              ×
            </button>

            {selectedTour && (
              <div className="mb-6 text-center">
                <img
                  src={selectedTour.image}
                  alt={selectedTour.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                  onError={(e) => (e.target.src = '/img/placeholder.jpg')}
                />
                <h3 className="text-xl font-bold text-gray-900">{selectedTour.title}</h3>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full p-3 border rounded-lg focus:ring-[#00453A]"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
                className="w-full p-3 border rounded-lg focus:ring-[#00453A]"
              />
              <div className="relative">
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Preferred Travel Date"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-[#00453A]"
                />
                <AiOutlineCalendar className="absolute right-3 top-4 text-gray-500 pointer-events-none" />
              </div>
              <input
                type="number"
                name="travellers"
                value={formData.travellers}
                onChange={handleInputChange}
                placeholder="Number of Travellers"
                min="1"
                required
                className="w-full p-3 border rounded-lg focus:ring-[#00453A]"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#00453A] text-white py-3 rounded-lg font-bold hover:bg-[#00332A] transition"
              >
                Submit Request
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.8);
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          background: #00453A;
          width: 14px;
          height: 14px;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
      `}</style>

      <WhyChooseUs />
    </>
  );
};

export default LadakhTour;