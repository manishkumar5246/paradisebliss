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
  AiOutlineCompass,
} from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/* ---------------------------  DATA  -------------------------------- */
/* ------------------------------------------------------------------ */

const heroImage = '/img/kashmir/backpacker-meadow-trek-hero.jpg';
const highlightImages = [
  '/img/kashmir/backpacker-local-market.jpg',
  '/img/kashmir/backpacker-gulmarg-meadow.jpg',
  '/img/kashmir/backpacker-pahalgam-river.jpg',
  '/img/kashmir/backpacker-sonmarg-trek.jpg',
];
const rightSideImage = '/img/kashmir/backpacker-campfire-tea.jpg';

const quickFacts = [
  { text: "Kashmir has over 100 alpine meadows perfect for offbeat treks." },
  { text: "Gulmarg was once a summer retreat for Mughal emperors." },
  { text: "Pahalgam is the base camp for the famous Amarnath Yatra." },
  { text: "Sonmarg is known as the 'Gateway to Ladakh'." },
];

const itinerary = [
  {
    day: 'Day 1',
    title: 'Arrival at Srinagar',
    desc: 'Arrive in Srinagar and meet your **Trip Captain** at the airport. Check-in to your cozy accommodation (hotel or houseboat). Afternoon: Stroll through **local markets**, taste street food, and soak in the valley vibe. Evening at leisure. Dinner & overnight stay in Srinagar.',
  },
  {
    day: 'Day 2',
    title: 'Srinagar → Gulmarg (~50 km / 2-3 hrs)',
    desc: 'After breakfast, drive to **Gulmarg** – the meadow of flowers. Explore the vast green meadows, breathe fresh pine air. Optional: **Gondola ride** (if operational) for stunning views. Evening: Walk around, click photos, relax. Dinner & overnight stay in Gulmarg.',
  },
  {
    day: 'Day 3',
    title: 'Gulmarg → Pahalgam (~140-160 km / 4-5 hrs)',
    desc: 'Post breakfast, depart for **Pahalgam** via scenic mountain roads. Watch the landscape shift from pine forests to open valleys. Arrive, check-in, and unwind by the **Lidder River**. Evening at leisure. Dinner & overnight stay in Pahalgam.',
  },
  {
    day: 'Day 4',
    title: 'Pahalgam Sightseeing → Srinagar',
    desc: 'Full day to explore **Pahalgam’s valleys** – riverside walks, pine trails, and open meadows. Optional light treks or pony rides to nearby spots. Late afternoon, drive back to Srinagar (~90 km). Dinner & overnight stay in Srinagar.',
  },
  {
    day: 'Day 5',
    title: 'Sonmarg Excursion',
    desc: 'After breakfast, day trip to **Sonmarg** – high-altitude meadows, glaciers, and raw beauty. Enjoy nature walks, photography, and mountain silence. Return to Srinagar by evening. Dinner & overnight stay in Srinagar.',
  },
  {
    day: 'Day 6',
    title: 'Departure from Srinagar',
    desc: 'After breakfast, check out and transfer to the airport/railway station. Trip ends with memories of mountains, meadows, and moments.',
  },
];

const highlights = [
  {
    title: 'Local Markets & Culture',
    image: highlightImages[0],
    desc: 'Shop for pashmina, dry fruits, and handicrafts in Srinagar’s bustling bazaars.',
  },
  {
    title: 'Gulmarg Meadows',
    image: highlightImages[1],
    desc: 'Walk freely in one of the largest alpine meadows in Asia.',
  },
  {
    title: 'Pahalgam Riverside',
    image: highlightImages[2],
    desc: 'Sit by the Lidder River, listen to water, feel the calm.',
  },
  {
    title: 'Sonmarg High-Altitude Trek',
    image: highlightImages[3],
    desc: 'Touch snow, see glaciers, feel the thrill of the Himalayas.',
  },
];

/* ------------------------------------------------------------------ */
/* --------------------------  COMPONENT  ---------------------------- */
/* ------------------------------------------------------------------ */

export default function KashmirBackpackingOdyssey() {
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
    <div className="bg-gradient-to-b from-[#F5F7EB] to-[#E8F5E9] min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-green-900/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 font-serif flex items-center justify-center gap-3"
            >
              Kashmir Backpacking Odyssey
              <AiOutlineCompass className="text-yellow-400" />
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              6 Days of Meadows, Mountains & Real Kashmir
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <AiOutlineCompass className="mr-2 text-green-600" /> Join the Journey
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Divider */}
      <div className="relative h-12 bg-green-800">
        <svg className="absolute bottom-0 w-full text-[#F5F7EB]" viewBox="0 0 1440 60">
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
          className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12 font-serif relative"
        >
          Trip Overview
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-500" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Discover the vibrant beauty and raw charm of Kashmir Valley with our specialised **backpacking trip**. This journey is designed for travellers who want more than just sightseeing — it’s about exploring valleys, connecting with nature, staying in scenic accommodations and enjoying the local culture. ParadiseBliss Tours brings you the perfect mix of comfort, adventure and discovery.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" />
                <strong>Duration:</strong> <span className="ml-1">6 Days / 5 Nights</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" />
                <strong>Price:</strong> <span className="ml-1">Starting from ₹ 23,999/-</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" />
                <strong>Destinations:</strong> <span className="ml-1">Srinagar → Gulmarg → Pahalgam → Sonmarg</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" />
                <strong>Style:</strong> <span className="ml-1">Backpacking | Light Treks | Culture</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-800 flex items-center"
            >
              <AiOutlineCompass className="mr-2 text-yellow-300" /> Book Now
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
          className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12 font-serif relative"
        >
          Itinerary
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-500" />
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
                className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-green-700 to-green-800 text-white hover:from-green-800 hover:to-green-900"
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
          className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12 font-serif relative"
        >
          Trip Highlights
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-500" />
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
                <h3 className="text-lg font-semibold text-green-800 font-sans">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 font-sans">{highlight.desc}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                className="absolute top-4 right-4 text-yellow-600"
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
          className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12 font-serif relative"
        >
          Pricing & Inclusions
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-500" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-xl"
        >
          <div>
            <h3 className="text-2xl font-semibold text-green-900 mb-4 font-sans">
              Pricing
            </h3>
            <p className="text-xl text-yellow-700 font-bold">
              Starting from ₹ 23,999/- per person
            </p>
            <p className="text-sm text-gray-600 mt-2 font-sans">
              *Group size and seasonal surcharges may apply
            </p>

            <h3 className="text-2xl font-semibold text-green-900 mt-6 mb-4 font-sans">
              Inclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> 5 nights accommodation (sharing basis)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Breakfast + Dinner daily
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> All transfers & sightseeing in comfortable vehicle
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Experienced Trip Captain throughout
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> All inner permits, road taxes, parking
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-green-900 mt-6 mb-4 font-sans">
              Exclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Airfare / train fare
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Lunches
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Adventure activities (skiing, trekking beyond plan)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Entry fees
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Personal expenses, shopping
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Costs due to delays/weather
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm bg-white border-2 border-dashed border-green-700 rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-semibold text-green-900 font-sans mb-3 flex items-center">
                <AiOutlineStar className="text-yellow-600 mr-2" /> Did You Know?
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
              alt="Campfire & Tea"
              width={150}
              height={150}
              className="rounded-full shadow-md object-cover"
              loading="lazy"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-green-800 w-full max-w-xs flex items-center justify-center"
            >
              <AiOutlineCompass className="mr-2 text-yellow-300" /> Request Callback
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-green-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-600 w-full max-w-xs flex items-center justify-center"
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
          className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12 font-serif relative"
        >
          Important Notes
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-yellow-500" />
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
              <AiOutlineStar className="text-yellow-600 mr-2 mt-1" />
              Itinerary may change based on weather, roads, or hotel availability.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-yellow-600 mr-2 mt-1" />
              Arrive before noon on Day 1 for smooth start.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-yellow-600 mr-2 mt-1" />
              Designed for travelers with moderate fitness (light walks/treks).
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-yellow-600 mr-2 mt-1" />
              Less luxury, more experience — true backpacking style.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-yellow-600 mr-2 mt-1" />
              Cancellation policy applies as per company norms.
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
                alt="Kashmir Backpacking Odyssey"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-green-900 font-sans flex items-center">
                <AiOutlineCompass className="mr-2 text-yellow-600" />
                Backpacking Adventure
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-yellow-500 text-green-900 rounded-full font-semibold shadow-lg hover:bg-yellow-600"
                >
                  <AiOutlineCompass className="inline mr-2 text-green-700" /> Submit Request
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