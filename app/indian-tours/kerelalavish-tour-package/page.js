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

const heroImage = '/img/kerala/honeymoon-munnar-resort-sunset.jpg';
const highlightImages = [
  '/img/kerala/honeymoon-munnar-tea-gardens.jpg',
  '/img/kerala/honeymoon-thekkady-spa.jpg',
  '/img/kerala/honeymoon-houseboat-candlelit.jpg',
  '/img/kerala/honeymoon-private-dinner.jpg',
];
const rightSideImage = '/img/kerala/honeymoon-resort-pool.jpg';

const quickFacts = [
  { text: "Munnar has over 100 tea estates, perfect for romantic walks." },
  { text: "Alleppey’s backwaters are called 'Venice of the East'." },
  { text: "Thekkady’s spice gardens are over 150 years old." },
  { text: "Kerala is India’s most romantic honeymoon destination." },
];

const itinerary = [
  {
    day: 'Day 1',
    title: 'Arrival in Kochi → Munnar (~130 km / 4 hrs)',
    desc: 'Warm welcome at **Kochi Airport/Railway**. Private transfer to **Munnar** through misty hills. En route: scenic stops at waterfalls & viewpoints. Check-in at a **premium hill resort** with valley views. Evening at leisure. **Overnight in Munnar.**',
  },
  {
    day: 'Day 2',
    title: 'Munnar Sightseeing – Romance in the Hills',
    desc: 'After breakfast, explore **tea plantations**, **Mattupetty Dam**, **Echo Point**, and **Rose Garden**. Optional: **couple’s spa session** or **private picnic** amidst tea estates. Evening free to enjoy resort amenities. **Overnight in Munnar.**',
  },
  {
    day: 'Day 3',
    title: 'Munnar → Thekkady (~110 km / 3.5 hrs)',
    desc: 'Drive to **Thekkady**. Check-in at a **luxury jungle resort**. Afternoon: Enjoy a **cultural show** or **spice plantation walk**. Optional: **candlelit dinner** under the stars. **Overnight in Thekkady.**',
  },
  {
    day: 'Day 4',
    title: 'Thekkady → Alleppey – Houseboat Bliss (~155 km / 4 hrs)',
    desc: 'Transfer to **Alleppey**. Board a **private deluxe houseboat** with balcony & AC bedroom. Cruise through serene backwaters, lotus lagoons & villages. **Candlelit dinner** on board. **Overnight on houseboat.**',
  },
  {
    day: 'Day 5',
    title: 'Alleppey → Kochi Departure (~60 km / 1.5 hrs)',
    desc: 'Disembark after breakfast. Private transfer to **Kochi Airport/Railway**. Depart with cherished memories of a **lavish, intimate honeymoon**.',
  },
];

const highlights = [
  {
    title: 'Munnar Tea Estate Walk',
    image: highlightImages[0],
    desc: 'Hand-in-hand through emerald hills at golden hour.',
  },
  {
    title: 'Thekkady Spice & Spa',
    image: highlightImages[1],
    desc: 'Aromatherapy massage & spice garden stroll for two.',
  },
  {
    title: 'Houseboat Candlelit Dinner',
    image: highlightImages[2],
    desc: 'Floating romance under a canopy of stars.',
  },
  {
    title: 'Private Resort Moments',
    image: highlightImages[3],
    desc: 'Infinity pools, jacuzzi, and sunset toasts.',
  },
];

/* ------------------------------------------------------------------ */
/* --------------------------  COMPONENT  ---------------------------- */
/* ------------------------------------------------------------------ */

export default function LavishKeralaHoneymoon() {
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
    <div className="bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-rose-900/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 font-serif flex items-center justify-center gap-3"
            >
              Lavish Kerala Honeymoon
              <AiOutlineHeart className="text-rose-400" />
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              5 Days of Romance, Resorts & Backwaters
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="text-sm italic text-rose-200 mb-6"
            >
              Organised by ParadiseBliss Tours Pvt. Ltd.
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <AiOutlineHeart className="mr-2 text-rose-300" /> Begin Your Love Story
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Divider */}
      <div className="relative h-12 bg-rose-800">
        <svg className="absolute bottom-0 w-full text-pink-50" viewBox="0 0 1440 60">
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
          className="text-4xl md:text-5xl font-bold text-rose-900 text-center mb-12 font-serif relative"
        >
          Trip Overview
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-rose-500" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-rose-50 p-6 rounded-2xl shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              A **refined, intimate honeymoon** through Kerala’s misty hills, spice gardens, and tranquil backwaters. Stay in **premium resorts**, enjoy **private transfers**, and drift on a **luxury houseboat** — all crafted for newlyweds.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" />
                <strong>Duration:</strong> <span className="ml-1">5 Days / 4 Nights</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" />
                <strong>Price:</strong> <span className="ml-1">Starting from ₹ [Insert Starting Price]</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" />
                <strong>Destinations:</strong> <span className="ml-1">Kochi → Munnar → Thekkady → Alleppey → Kochi</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" />
                <strong>Style:</strong> <span className="ml-1">Luxury | Romance | Privacy</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-rose-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-rose-800 flex items-center"
            >
              <AiOutlineHeart className="mr-2 text-rose-300" /> Book Your Honeymoon
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
          className="text-4xl md:text-5xl font-bold text-rose-900 text-center mb-12 font-serif relative"
        >
          Itinerary
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-rose-500" />
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
                className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-rose-700 to-rose-800 text-white hover:from-rose-800 hover:to-rose-900"
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
                    <div className="p-5 text-gray-700 font-sans" dangerouslySetInnerHTML={{ __html: day.desc }} />
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
          className="text-4xl md:text-5xl font-bold text-rose-900 text-center mb-12 font-serif relative"
        >
          Honeymoon Highlights
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-rose-500" />
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
                <h3 className="text-lg font-semibold text-rose-800 font-sans">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 font-sans">{highlight.desc}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                className="absolute top-4 right-4 text-rose-600"
              >
                <AiOutlineHeart size={24} />
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
          className="text-4xl md:text-5xl font-bold text-rose-900 text-center mb-12 font-serif relative"
        >
          Pricing & Inclusions
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-rose-500" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-rose-50 p-8 rounded-2xl shadow-xl"
        >
          <div>
            <h3 className="text-2xl font-semibold text-rose-900 mb-4 font-sans">
              Package Cost (Per Couple)
            </h3>
            <p className="text-xl text-rose-700 font-bold">
              Starting from ₹ [Insert Starting Price]
            ∗}
            </p>
            <p className="text-sm text-gray-600 mt-2 font-sans">
              *Price varies by dates, room category & availability
            </p>

            <h3 className="text-2xl font-semibold text-rose-900 mt-6 mb-4 font-sans">
              Inclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> 4 nights: 2N Munnar, 1N Thekkady, 1N Alleppey
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> Daily breakfast (Day 2–5)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> Private A/C vehicle for all transfers
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> Airport/Railway pickup & drop at Kochi
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> All tolls, parking, driver allowance, fuel
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-rose-900 mt-6 mb-4 font-sans">
              Exclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> Flights/trains to/from Kochi
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> Lunches, dinners (unless specified)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> Entry fees, optional activities
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> Personal expenses, tips
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-rose-600 mr-2" /> 5% GST & extra costs due to weather/road
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm bg-white border-2 border-dashed border-rose-700 rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-semibold text-rose-900 font-sans mb-3 flex items-center">
                <AiOutlineHeart className="text-rose-600 mr-2" /> Did You Know?
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
              alt="Resort Pool Romance"
              width={150}
              height={150}
              className="rounded-full shadow-md object-cover"
              loading="lazy"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-rose-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-rose-800 w-full max-w-xs flex items-center justify-center"
            >
              <AiOutlineHeart className=", "mr-2 text-rose-300" /> Request Callback
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 text-rose-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-amber-600 w-full max-w-xs flex items-center justify-center"
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
          className="text-4xl md:text-5xl font-bold text-rose-900 text-center mb-12 font-serif relative"
        >
          Important Notes
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-rose-500" />
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
              <AiOutlineStar className="text-rose-600 mr-2 mt-1" />
              Itinerary may adjust due to weather or road conditions.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-rose-600 mr-2 mt-1" />
              Upgrades: private dinners, spa, flower bed decoration on request.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-rose-600 mr-2 mt-1" />
              Valid photo ID proof required at check-in.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-rose-600 mr-2 mt-1" />
              Standard cancellation policy of ParadiseBliss Tours applies.
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
                alt="Lavish Kerala Honeymoon"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-rose-900 font-sans flex items-center">
                <AiOutlineHeart className="mr-2 text-rose-600" />
                Honeymoon Getaway
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-600"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-600"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-600"
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
                    min="2"
                    placeholder="2"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-600"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-rose-600 text-white rounded-full font-semibold shadow-lg hover:bg-rose-700"
                >
                  <AiOutlineHeart className="inline mr-2 text-rose-300" /> Submit Request
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