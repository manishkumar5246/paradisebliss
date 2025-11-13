'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineStar,
  AiOutlinePhone,
  AiOutlineCompass,
  AiOutlineHeart,
} from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/* ---------------------------  DATA  -------------------------------- */
/* ------------------------------------------------------------------ */

const heroImage = '/img/kerala/backpacker-tea-garden-hero.jpg';
const highlightImages = [
  '/img/kerala/backpacker-spice-plantation.jpg',
  '/img/kerala/backpacker-munnar-viewpoint.jpg',
  '/img/kerala/backpacker-backwaters-canoe.jpg',
  '/img/kerala/backpacker-kovalam-sunset.jpg',
];
const rightSideImage = '/img/kerala/backpacker-coconut-grove-relax.jpg';

const quickFacts = [
  { text: "Kerala produces 90% of India’s natural rubber." },
  { text: "Munnar’s tea estates are over 100 years old." },
  { text: "Alleppey backwaters span over 1,500 km of waterways." },
  { text: "Kovalam was discovered by hippies in the 1970s." },
];

const itinerary = [
  {
    day: 'Day 1',
    title: 'Arrival at Kochi → Munnar (~130 km / 4 hrs)',
    desc: 'Pick-up from **Kochi airport/railway**. En route: **spice plantations**, **Cheeyappara & Valara waterfalls**, **Karadippara viewpoint**, and endless **tea gardens**. Check-in at Munnar homestay. Evening stroll. Overnight in Munnar.',
  },
  {
    day: 'Day 2',
    title: 'Munnar Sightseeing',
    desc: 'Explore **tea estate walks**, misty viewpoints, and rolling green hills. Optional: **zip-lining** or visit to **Eravikulam National Park** (if open). Evening at leisure. Overnight in Munnar.',
  },
  {
    day: 'Day 3',
    title: 'Munnar → Alleppey/Kumarakom (~155 km / 4 hrs)',
    desc: 'Drive down from hills to **backwaters**. Check-in to a **homestay or houseboat** in Alleppey/Kumarakom. Evening: Walk through **coconut groves**, watch village life. Overnight stay.',
  },
  {
    day: 'Day 4',
    title: 'Alleppey → Kovalam (~170 km / 4.5 hrs)',
    desc: 'After breakfast, head south to **Kovalam**. Check-in at beachside homestay. Evening: **Beach stroll**, watch fishermen, feel the sea breeze. Overnight in Kovalam.',
  },
  {
    day: 'Day 5',
    title: 'Kovalam → Trivandrum Sightseeing',
    desc: 'Morning at **Kovalam beach**, then short trip to **Trivandrum** – visit **Padmanabhaswamy Temple**, **Napier Museum**, or **Shanghumugham Beach**. Return to Kovalam. Overnight stay.',
  },
  {
    day: 'Day 6',
    title: 'Relaxation at Kovalam',
    desc: 'Full day to **chill by the beach**, optional **Ayurvedic spa**, local excursions, or just read a book under palm trees. Evening: Sunset at the lighthouse. Overnight stay.',
  },
  {
    day: 'Day 7',
    title: 'Departure from Trivandrum',
    desc: 'After breakfast, transfer to **Trivandrum airport/railway**. Trip ends with memories of hills, backwaters, and beaches.',
  },
];

const highlights = [
  {
    title: 'Spice Plantation Walk',
    image: highlightImages[0],
    desc: 'Smell cardamom, pepper, and vanilla on a guided plantation trail.',
  },
  {
    title: 'Munnar Tea Gardens',
    image: highlightImages[1],
    desc: 'Walk through endless green carpets of tea under misty skies.',
  },
  {
    title: 'Backwaters & Village Life',
    image: highlightImages[2],
    desc: 'Glide through narrow canals, see ducks, lotus, and local homes.',
  },
  {
    title: 'Kovalam Beach Sunset',
    image: highlightImages[3],
    desc: 'Golden hour on the Arabian Sea – barefoot, carefree, magical.',
  },
];

/* ------------------------------------------------------------------ */
/* --------------------------  COMPONENT  ---------------------------- */
/* ------------------------------------------------------------------ */

export default function KeralaBackpackingEscape() {
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
    <div className="bg-gradient-to-b from-[#E8F5E9] to-[#B2DFDB] min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-teal-900/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 font-serif flex items-center justify-center gap-3"
            >
              Kerala Backpacking Escape
              <AiOutlineCompass className="text-lime-400" />
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              7 Days of Hills, Backwaters & Beaches
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-white text-teal-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <AiOutlineCompass className="mr-2 text-teal-600" /> Start Your Journey
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Divider */}
      <div className="relative h-12 bg-teal-800">
        <svg className="absolute bottom-0 w-full text-[#E8F5E9]" viewBox="0 0 1440 60">
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
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Trip Overview
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-lime-500" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-teal-50 p-6 rounded-2xl shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Explore the lush, diverse landscapes of Kerala — from **tea plantations and waterfalls** in the hills to **tranquil backwaters** and **golden beaches**. This backpacking-style journey blends nature, culture and relaxation, while keeping budget and local flavour in mind.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" />
                <strong>Duration:</strong> <span className="ml-1">7 Days / 6 Nights</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" />
                <strong>Price:</strong> <span className="ml-1">Starting from ₹ [Insert Starting Price]</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" />
                <strong>Destinations:</strong> <span className="ml-1">Kochi → Munnar → Alleppey → Kovalam → Trivandrum</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" />
                <strong>Style:</strong> <span className="ml-1">Backpacking | Nature | Relaxation</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-teal-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-teal-800 flex items-center"
            >
              <AiOutlineCompass className="mr-2 text-lime-300" /> Book Now
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
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Itinerary
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-lime-500" />
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
                className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-teal-700 to-teal-800 text-white hover:from-teal-800 hover:to-teal-900"
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
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Trip Highlights
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-lime-500" />
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
                <h3 className="text-lg font-semibold text-teal-800 font-sans">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 font-sans">{highlight.desc}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                className="absolute top-4 right-4 text-lime-600"
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
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Pricing & Inclusions
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-lime-500" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-teal-50 p-8 rounded-2xl shadow-xl"
        >
          <div>
            <h3 className="text-2xl font-semibold text-teal-900 mb-4 font-sans">
              Pricing
            </h3>
            <p className="text-xl text-lime-700 font-bold">
              Starting from ₹ [Insert Starting Price] per person
            </p>
            <p className="text-sm text-gray-600 mt-2 font-sans">
              *Final cost varies by dates, group size & accommodation
            </p>

            <h3 className="text-2xl font-semibold text-teal-900 mt-6 mb-4 font-sans">
              Inclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> 6 nights stay (homestay/hotel/houseboat)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Breakfast + some dinners
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> A/C vehicle for all transfers & sightseeing
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Toll, parking, driver allowance
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-teal-900 mt-6 mb-4 font-sans">
              Exclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Flights / trains
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Meals not mentioned
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Adventure activities (zip-lining, etc)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Entry fees
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Personal expenses, tips
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Costs due to weather/roadblocks
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm bg-white border-2 border-dashed border-teal-700 rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-semibold text-teal-900 font-sans mb-3 flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Did You Know?
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
              alt="Coconut Grove Relaxation"
              width={150}
              height={150}
              className="rounded-full shadow-md object-cover"
              loading="lazy"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-teal-800 w-full max-w-xs flex items-center justify-center"
            >
              <AiOutlineCompass className="mr-2 text-lime-300" /> Request Callback
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-lime-500 text-teal-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-lime-600 w-full max-w-xs flex items-center justify-center"
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
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Important Notes
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-lime-500" />
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
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              Itinerary may change due to weather or road conditions.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              Pack light: casual clothes, flip-flops, rain jacket.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              Moderate mobility required for hill walks & backwater areas.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              True backpacking: less luxury, more local experience.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              Standard cancellation policy applies.
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
                alt="Kerala Backpacking Escape"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-teal-900 font-sans flex items-center">
                <AiOutlineCompass className="mr-2 text-lime-600" />
                Kerala Backpacking
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-lime-500 text-teal-900 rounded-full font-semibold shadow-lg hover:bg-lime-600"
                >
                  <AiOutlineCompass className="inline mr-2 text-teal-700" /> Submit Request
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