'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineStar,
  AiOutlinePhone,
} from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/* ---------------------------  DATA  -------------------------------- */
/* ------------------------------------------------------------------ */

const heroImage = '/img/kashmir/dal-lake-hero.jpg';
const highlightImages = [
  '/img/kashmir/srinagar-houseboats.jpg',
  '/img/kashmir/gulmarg-snow.jpg',
  '/img/kashmir/pahalgam-river.jpg',
  '/img/kashmir/tulip-garden.jpg',
];
const rightSideImage = '/img/kashmir/kahwa-tea.jpg';

const quickFacts = [
  { text: "Kashmir is famously known as 'Paradise on Earth'." },
  { text: "Dal Lake is home to over 1,000 floating houseboats." },
  { text: "The Tulip Garden in Srinagar has over 1.5 million tulips in bloom." },
  { text: "Kashmiri Wazwan is a 36-course royal feast." },
];

const itinerary = [
  {
    day: 'Day 1',
    title: 'Arrival in Srinagar',
    desc: 'Arrive at Srinagar Airport. Transfer to houseboat on Dal Lake. Evening shikara ride. Overnight in houseboat.',
  },
  {
    day: 'Day 2',
    title: 'Srinagar Local Sightseeing',
    desc: 'Visit Mughal Gardens: Shalimar Bagh, Nishat Bagh, Chashme Shahi. Explore Shankaracharya Temple and old city markets. Overnight in Srinagar.',
  },
  {
    day: 'Day 3',
    title: 'Srinagar to Gulmarg',
    desc: 'Drive to Gulmarg (2-3 hrs). Enjoy Gondola ride (Phase 1 & 2). Snow activities in winter, meadow walks in summer. Overnight in Gulmarg.',
  },
  {
    day: 'Day 4',
    title: 'Gulmarg to Pahalgam',
    desc: 'Drive to Pahalgam (4-5 hrs). Enroute visit Avantipura Ruins. Check-in at hotel. Evening walk along Lidder River. Overnight in Pahalgam.',
  },
  {
    day: 'Day 5',
    title: 'Pahalgam Exploration',
    desc: 'Visit Betaab Valley, Aru Valley, and Chandanwari (gateway to Amarnath). Optional pony ride or nature walk. Overnight in Pahalgam.',
  },
  {
    day: 'Day 6',
    title: 'Pahalgam to Sonamarg',
    desc: 'Drive to Sonamarg (3-4 hrs). Visit Thajiwas Glacier (pony ride or walk). Enjoy golden meadows and Sindh River. Overnight in Sonamarg.',
  },
  {
    day: 'Day 7',
    title: 'Sonamarg to Srinagar',
    desc: 'Morning free for adventure. Drive back to Srinagar. Shopping for Pashmina, saffron, and dry fruits. Overnight in Srinagar.',
  },
  {
    day: 'Day 8',
    title: 'Departure',
    desc: 'Transfer to Srinagar Airport. Trip ends with beautiful memories of Kashmir.',
  },
];

const highlights = [
  {
    title: 'Dal Lake & Houseboats',
    image: highlightImages[0],
    desc: 'Iconic floating homes and colorful shikaras on the shimmering lake.',
  },
  {
    title: 'Gulmarg Gondola',
    image: highlightImages[1],
    desc: 'One of the highest cable cars in the world, offering stunning Himalayan views.',
  },
  {
    title: 'Pahalgam - Valley of Shepherds',
    image: highlightImages[2],
    desc: 'Pine forests, gushing rivers, and serene meadows perfect for relaxation.',
  },
  {
    title: 'Tulip Garden',
    image: highlightImages[3],
    desc: 'Asia’s largest tulip garden with millions of blooms in spring.',
  },
];

/* ------------------------------------------------------------------ */
/* --------------------------  COMPONENT  ---------------------------- */
/* ------------------------------------------------------------------ */

export default function KashmirParadiseTripPackage() {
  /* ---- Accordion ---- */
  const [openDay, setOpenDay] = useState(null);
  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index);
  };

  /* ---- Modal & Form ---- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: null,
    travellers: '',
  });

  /* ---- Rotating Facts ---- */
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % quickFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', phone: '', date: null, travellers: '' });
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
    console.log('Form submitted:', formData);
    handleCloseModal();
  };

  /* ---- Framer-Motion variants ---- */
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.1 } },
  };
  const factVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  };

  /* ------------------------------------------------------------------ */
  /* -----------------------------  JSX  ------------------------------- */
  /* ------------------------------------------------------------------ */

  return (
    <div className="bg-[#F1FDF3] min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#00453A]/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 font-serif"
            >
              Kashmir – Paradise on Earth
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              8 Days of Lakes, Meadows, Mountains & Magic
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#F1FDF3] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl"
            >
              Plan Your Kashmir Escape
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Divider */}
      <div className="relative h-12 bg-[#00453A]">
        <svg className="absolute bottom-0 w-full text-[#F1FDF3]" viewBox="0 0 1440 60">
          <path fill="currentColor" d="M0,0L1440,60H0Z" />
        </svg>
      </div>

      {/* Trip Overview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Trip Overview
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-[#F1FDF3] p-6 rounded-2xl shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Experience the timeless beauty of Kashmir — snow-capped peaks, blooming gardens, serene lakes, and warm Kashmiri hospitality. A journey into the heart of heaven on Earth.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Duration:</strong> <span className="ml-1">8 Days / 7 Nights</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Price:</strong> <span className="ml-1">Starting at ₹24,999 per person</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Group Size:</strong> <span className="ml-1">4-10 travelers</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Best Time:</strong>{' '}
                <span className="ml-1">Mar–May (Spring), Jun–Aug (Summer), Nov–Feb (Winter)</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A]"
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Itinerary */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Itinerary
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]" />
        </motion.h2>

        <div className="space-y-4">
          {itinerary.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleDay(index)}
                className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-[#00453A] to-[#00332A] text-white hover:from-[#00332A] hover:to-[#00251F]"
              >
                <span className="font-semibold font-sans">
                  {day.day}: {day.title}
                </span>
                {openDay === index ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>

              <AnimatePresence initial={false}>
                {openDay === index && (
                  <motion.div
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 500, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 text-gray-700 font-sans">{day.desc}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Highlights */}
      <motion.section
        initial="hidden"
        whileInView="show"
        variants={containerVariants}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Trip Highlights
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]" />
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                index % 2 === 0 ? 'rotate-2' : '-rotate-2'
              }`}
            >
              <Image
                src={highlight.image}
                alt={highlight.title}
                width={500}
                height={192}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#00453A] font-sans">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 font-sans">{highlight.desc}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                className="absolute top-4 right-4 text-[#F5A623]"
              >
                <AiOutlineStar size={24} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Pricing & Inclusions */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Pricing & Inclusions
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl"
        >
          <div>
            <h3 className="text-2xl font-semibold text-[#00453A] mb-4 font-sans">
              Pricing
            </h3>
            <p className="text-xl text-[#F5A623] font-bold">
              Starting at ₹24,999 per person
            </p>
            <p className="text-sm text-gray-600 mt-2 font-sans">
              *Includes houseboat stay, shikara ride & local guide
            </p>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">
              Scheduled Dates
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineCalendar className="text-[#F5A623] mr-2" /> 20th Mar 2025
              </li>
              <li className="flex items-center">
                <AiOutlineCalendar className="text-[#F5A623] mr-2" /> 15th Apr 2025
              </li>
              <li className="flex items-center">
                <AiOutlineCalendar className="text-[#F5A623] mr-2" /> 10th Jun 2025
              </li>
              <li className="flex items-center">
                <AiOutlineCalendar className="text-[#F5A623] mr-2" /> 5th Dec 2025
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">
              Inclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> 7 nights accommodation
                (houseboat + hotels)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Daily breakfast & dinner
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> AC vehicle for all transfers
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Shikara ride on Dal Lake
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Local English-speaking guide
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">
              Exclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Flights to Srinagar
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Lunch & personal expenses
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Gondola tickets & pony rides
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Travel insurance
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm bg-white border-2 border-dashed border-[#00453A] rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-semibold text-[#00453A] font-sans mb-3 flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Did You Know?
              </h4>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFactIndex}
                  variants={factVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-gray-700 font-sans text-base"
                >
                  {quickFacts[currentFactIndex].text}
                </motion.div>
              </AnimatePresence>
            </div>

            <Image
              src={rightSideImage}
              alt="Kashmiri Kahwa"
              width={150}
              height={150}
              className="rounded-full shadow-md object-cover"
              loading="lazy"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A] w-full max-w-xs"
            >
              Request Callback
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F5A623] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#E59400] w-full max-w-xs flex items-center justify-center"
            >
              <AiOutlinePhone className="mr-2" /> Call Us
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Important Notes */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Important Notes
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-xl"
        >
          <ul className="space-y-3 text-gray-700 font-sans">
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Book flights to Srinagar (SXR). Direct flights from Delhi, Mumbai, etc.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Carry warm clothes in winter, light woolens in summer. Sunscreen recommended.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Houseboat stay includes dinner & breakfast. Enjoy authentic Kashmiri cuisine.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Itinerary flexible due to weather, especially in winter (Nov–Mar).
            </li>
          </ul>
        </motion.div>
      </motion.section>

      {/* Booking Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            key="modal-backdrop"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              X
            </button>

            <div className="mb-4">
              <Image
                src={heroImage}
                alt="Kashmir Paradise"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">
                Kashmir – Paradise on Earth
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">
                    Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A]"
                      placeholderText="Select date"
                      required
                    />
                    <AiOutlineCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">
                    Travellers
                  </label>
                  <input
                    type="number"
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleInputChange}
                    min="1"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A]"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-[#F5A623] text-[#00453A] rounded-full font-semibold shadow-lg"
                >
                  Submit Request
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500&display=swap');

        .react-datepicker-wrapper {
          width: 100%;
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'Poppins', sans-serif;
        }
        .rotate-2 {
          transform: rotate(2deg);
        }
        .-rotate-2 {
          transform: rotate(-2deg);
        }
      `}</style>
    </div>
  );
}