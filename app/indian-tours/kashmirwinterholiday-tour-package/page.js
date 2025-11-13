'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineStar,
  AiOutlinePhone,
  AiOutlineHeart,
} from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/* ---------------------------  DATA  -------------------------------- */
/* ------------------------------------------------------------------ */

const heroImage = '/img/kashmir/winter-christmas-houseboat-hero.jpg';
const highlightImages = [
  '/img/kashmir/winter-shikara-dal-lake.jpg',
  '/img/kashmir/winter-gulmarg-gondola.jpg',
  '/img/kashmir/winter-drung-waterfall.jpg',
  '/img/kashmir/winter-sonmarg-snow.jpg',
];
const rightSideImage = '/img/kashmir/winter-bonfire-celebration.jpg';

const quickFacts = [
  { text: "Gulmarg Gondola is the 2nd highest operating cable car in the world!" },
  { text: "Drung Waterfall freezes into a stunning ice curtain in winter." },
  { text: "Dal Lake houseboats are decorated with lights during Christmas & New Year." },
  { text: "Sonmarg means 'Meadow of Gold' – magical under fresh snow." },
];

const itinerary = [
  {
    day: 'Day 1',
    title: 'Arrival at Srinagar',
    desc: 'Arrive at Srinagar airport before 12 PM. Warm welcome by your ParadiseBliss Trip Captain. Transfer to a beautifully decorated **houseboat on Dal Lake**. Post check-in, stroll through the snow-dusted **Mughal Gardens** (Shalimar, Nishat, Chashme Shahi). Evening: **1-hour shikara ride** on the serene lake. Dinner & overnight stay on the houseboat.',
  },
  {
    day: 'Day 2',
    title: 'Srinagar → Gulmarg (~50 km / 2 hrs)',
    desc: 'After breakfast, drive to **Gulmarg**, the heart of winter sports. On arrival, enjoy the **Gondola Cable Car ride (Phase 1)** with breathtaking snow-clad Himalayan views. Evening at leisure – optional snow play or cozy up with hot kahwa. Dinner & overnight stay in Gulmarg.',
  },
  {
    day: 'Day 3',
    title: 'Gulmarg → Drung Waterfall → Pahalgam (~142 km / 4 hrs)',
    desc: 'Check out and depart for **Pahalgam**. En-route, stop at the mesmerizing **Drung Waterfall** – often frozen into a spectacular ice formation. Arrive in Pahalgam, check-in, and relax. Evening at leisure by the Lidder River. Dinner & overnight stay in Pahalgam.',
  },
  {
    day: 'Day 4',
    title: 'Pahalgam Sightseeing → Srinagar',
    desc: 'Full day to explore **Aru Valley, Betaab Valley, and Chandanwadi** – snow-covered meadows, pine forests, and frozen streams. Optional pony rides or riverside walks. Late afternoon, drive back to Srinagar (~90 km). Dinner & overnight stay in Srinagar (houseboat/hotel).',
  },
  {
    day: 'Day 5',
    title: 'Sonmarg Excursion + Festive Celebration',
    desc: 'After breakfast, day trip to **Sonmarg** – the golden meadow under thick snow. Return to Srinagar by evening. **Christmas/New Year Special**: Bonfire, music, cake-cutting, snacks & festive cheer (weather permitting). Dinner & overnight stay in Srinagar.',
  },
  {
    day: 'Day 6',
    title: 'Departure from Srinagar',
    desc: 'After breakfast, time permitting, transfer to Srinagar airport for your return journey – carrying magical winter memories of Kashmir.',
  },
];

const highlights = [
  {
    title: 'Shikara Ride on Dal Lake',
    image: highlightImages[0],
    desc: 'Glide through calm waters with floating snowflakes and glowing houseboats.',
  },
  {
    title: 'Gulmarg Gondola Adventure',
    image: highlightImages[1],
    desc: 'Ride Asia’s highest cable car for panoramic views of snow peaks.',
  },
  {
    title: 'Frozen Drung Waterfall',
    image: highlightImages[2],
    desc: 'Witness nature’s ice sculpture – a frozen waterfall in winter glory.',
  },
  {
    title: 'Sonmarg Snow Meadows',
    image: highlightImages[3],
    desc: 'Walk through golden meadows blanketed in pristine white snow.',
  },
];

/* ------------------------------------------------------------------ */
/* --------------------------  COMPONENT  ---------------------------- */
/* ------------------------------------------------------------------ */

export default function WinterKashmirHolidaysExtravaganza() {
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
    <div className="bg-gradient-to-b from-[#E6F7FF] to-[#F8FBFD] min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-blue-900/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 font-serif flex items-center justify-center gap-3"
            >
              Winter Kashmir Holidays Extravaganza
              <AiOutlineStar className="text-yellow-300" />
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              6 Days of Snow, Celebration & Christmas Magic
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <AiOutlineStar className="mr-2 text-yellow-500" /> Book Festive Getaway
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Divider */}
      <div className="relative h-12 bg-blue-800">
        <svg className="absolute bottom-0 w-full text-[#E6F7FF]" viewBox="0 0 1440 60">
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
          className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12 font-serif relative"
        >
          Trip Overview
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-400" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Celebrate the festive season amid snow-draped valleys, willow trees, and serene waterways of Kashmir. Our specially curated **Christmas & New Year edition** combines houseboat stays, shikara rides, gondola adventures, and scenic drives through the Himalayan foothills — wrapped in the warm hospitality of ParadiseBliss Tours.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" />
                <strong>Duration:</strong> <span className="ml-1">6 Days / 5 Nights</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" />
                <strong>Price:</strong> <span className="ml-1">Starting from ₹ 25,499/-</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" />
                <strong>Destinations:</strong> <span className="ml-1">Srinagar → Gulmarg → Pahalgam → Sonmarg</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" />
                <strong>Best For:</strong> <span className="ml-1">Christmas & New Year Celebrations</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 flex items-center"
            >
              <AiOutlineStar className="mr-2 text-yellow-300" /> Book Now
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Itinerary */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12 font-serif relative"
        >
          Itinerary
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-400" />
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
                className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900"
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
                    animate={{ maxHeight: 600, opacity: 1 }}
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
          className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12 font-serif relative"
        >
          Festive Highlights
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-400" />
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
                <h3 className="text-lg font-semibold text-blue-800 font-sans">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 font-sans">{highlight.desc}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                className="absolute top-4 right-4 text-yellow-500"
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
          className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12 font-serif relative"
        >
          Pricing & Inclusions
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-400" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl"
        >
          <div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-4 font-sans">
              Pricing
            </h3>
            <p className="text-xl text-yellow-600 font-bold">
              Starting from ₹ 25,499/- per person
            </p>
            <p className="text-sm text-gray-600 mt-2 font-sans">
              *Group size and seasonal surcharges may apply
            </p>

            <h3 className="text-2xl font-semibold text-blue-900 mt-6 mb-4 font-sans">
              Inclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> 5 nights accommodation (houseboat + hotels)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> 10 meals: Dinner Day 1, Breakfast & Dinner Days 2–5, Breakfast Day 6
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Tempo Traveller for all transfers & sightseeing
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Experienced Trip Captain throughout
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> 1-hour shikara ride on Dal Lake
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Gondola Cable Car (Phase 1)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Local cabs: Aru, Betaab, Chandanwadi, Drung
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> All permits, tolls, parking, driver allowances
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> First-aid kit
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-900 mt-6 mb-4 font-sans">
              Exclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> 5% GST
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Lunches not mentioned
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Adventure activities (skiing, sledging, ATV, etc.)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Airfare / train fare
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Entry fees for monuments/sightseeing
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Personal expenses & shopping
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Extra costs due to delays/weather
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm bg-white border-2 border-dashed border-blue-700 rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-semibold text-blue-900 font-sans mb-3 flex items-center">
                <AiOutlineStar className="text-yellow-500 mr-2" /> Did You Know?
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
              alt="Bonfire Celebration"
              width={150}
              height={150}
              className="rounded-full shadow-md object-cover"
              loading="lazy"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 w-full max-w-xs flex items-center justify-center"
            >
              <AiOutlineStar className="mr-2 text-yellow-300" /> Request Callback
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-500 w-full max-w-xs flex items-center justify-center"
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
          className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12 font-serif relative"
        >
          Important Notes
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-400" />
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
              <AiOutlineStar className="text-yellow-500 mr-2 mt-1" />
              Itinerary may change due to weather or road conditions.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-yellow-500 mr-2 mt-1" />
              Arrive before 12 PM on Day 1 for full sightseeing.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-yellow-500 mr-2 mt-1" />
              Gondola tickets subject to availability in heavy snow.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-yellow-500 mr-2 mt-1" />
              Best for ages 18–42; custom groups available on request.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-yellow-500 mr-2 mt-1" />
              Cancellation policy applies as per company terms.
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
                alt="Winter Kashmir Holidays Extravaganza"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-blue-900 font-sans flex items-center">
                <AiOutlineStar className="mr-2 text-yellow-500" />
                Christmas & New Year Special
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-yellow-400 text-blue-900 rounded-full font-semibold shadow-lg hover:bg-yellow-500"
                >
                  <AiOutlineStar className="inline mr-2 text-yellow-600" /> Submit Request
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