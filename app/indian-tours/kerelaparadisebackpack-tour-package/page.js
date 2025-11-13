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
} from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/* ---------------------------  DATA  -------------------------------- */
/* ------------------------------------------------------------------ */

const heroImage = '/img/kerala/paradise-bliss-hero.jpg';
const highlightImages = [
  '/img/kerala/paradise-spice-plantation.jpg',
  '/img/kerala/paradise-periyar-boat-safari.jpg',
  '/img/kerala/paradise-houseboat-sunset.jpg',
  '/img/kerala/paradise-kathakali-dance.jpg',
];
const rightSideImage = '/img/kerala/paradise-backwater-dinner.jpg';

const quickFacts = [
  { text: "Periyar is home to over 35 tigers and 1,000 elephants." },
  { text: "Kerala’s houseboats were originally rice barges called 'Kettuvallams'." },
  { text: "Kathakali is a 400-year-old classical dance-drama of Kerala." },
  { text: "Kovalam’s lighthouse offers panoramic views of the Arabian Sea." },
];

const itinerary = [
  {
    day: 'Day 1',
    title: 'Arrival in Kochi → Munnar (~130 km / 4 hrs)',
    desc: 'Morning arrival at **Kochi Airport**. Drive to **Munnar** via scenic routes. En route: **Cheeyappara & Valara Waterfalls**, **Karadippara Viewpoint**. Check-in at cozy **homestay/eco-lodge**. Optional: **Zip-line** over tea estates. Overnight in Munnar.',
  },
  {
    day: 'Day 2',
    title: 'Munnar – Tea Gardens & Spice Trails',
    desc: 'Morning: Visit **Tea Museum** & walk through lush **tea gardens**. Afternoon: Guided **spice plantation tour** – smell cardamom, pepper, vanilla. Evening: Relax at **Attukal Waterfalls** or nature walk. Overnight in Munnar.',
  },
  {
    day: 'Day 3',
    title: 'Munnar → Thekkady (Periyar) (~110 km / 3.5 hrs)',
    desc: 'Drive to **Thekkady**. Afternoon: **Boat safari on Periyar Lake** – spot elephants, bison, deer. Evening: Visit **spice plantation** & enjoy **cultural performance**. Overnight in Thekkady.',
  },
  {
    day: 'Day 4',
    title: 'Thekkady → Alleppey – Houseboat (~155 km / 4 hrs)',
    desc: 'Drive to **Alleppey**. Board **traditional Kerala houseboat**. Cruise through serene **backwaters**, pass villages, paddy fields. Enjoy **freshly cooked Kerala dinner** on board. Overnight on houseboat.',
  },
  {
    day: 'Day 5',
    title: 'Alleppey → Kovalam (~165 km / 4.5 hrs)',
    desc: 'Disembark after breakfast. Drive to **Kovalam**. Check-in at beachside stay. Afternoon: Relax on **crescent-shaped Kovalam Beach**. Evening: **Sunset stroll** along the shore. Overnight in Kovalam.',
  },
  {
    day: 'Day 6',
    title: 'Kovalam → Trivandrum Cultural Day',
    desc: 'Morning: Visit **Sree Padmanabhaswamy Temple** & local markets. Afternoon: Explore **Napier Museum** & **zoo**. Evening: Watch **Kathakali dance performance** – storytelling through expressions. Overnight in Kovalam.',
  },
  {
    day: 'Day 7',
    title: 'Departure from Trivandrum',
    desc: 'Short drive to **Trivandrum Airport** (~15 km). Departure with memories of **wildlife, backwaters, culture & beaches**.',
  },
];

const highlights = [
  {
    title: 'Spice Plantation Tour',
    image: highlightImages[0],
    desc: 'Walk through aromatic trails of cardamom, pepper & clove.',
  },
  {
    title: 'Periyar Boat Safari',
    image: highlightImages[1],
    desc: 'Spot elephants bathing, tigers on the prowl, and rare birds.',
  },
  {
    title: 'Houseboat Sunset Cruise',
    image: highlightImages[2],
    desc: 'Drift on serene backwaters with a candlelit Kerala dinner.',
  },
  {
    title: 'Kathakali Dance Drama',
    image: highlightImages[3],
    desc: 'Witness epic tales told through vibrant makeup and gestures.',
  },
];

/* ------------------------------------------------------------------ */
/* --------------------------  COMPONENT  ---------------------------- */
/* ------------------------------------------------------------------ */

export default function ParadiseBlissKeralaTour() {
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
              Paradise Bliss Kerala Tour
              <AiOutlineCompass className="text-lime-400" />
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              7 Days of Wildlife, Backwaters & Culture
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
              <AiOutlineCompass className="mr-2 text-teal-600" /> Book Your Bliss
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
              A perfect blend of **nature, wildlife, culture & serenity** — from misty **tea hills** to **Periyar’s jungles**, **houseboat nights**, and **Kovalam’s beaches**. Includes **Kathakali dance**, **spice trails**, and **local guides**.
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
                <strong>Destinations:</strong> <span className="ml-1">Kochi → Munnar → Thekkady → Alleppey → Kovalam → Trivandrum</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" />
                <strong>Style:</strong> <span className="ml-1">Backpacking | Wildlife | Culture</span>
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
              *Group discounts & seasonal rates apply
            </p>

            <h3 className="text-2xl font-semibold text-teal-900 mt-6 mb-4 font-sans">
              Inclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> 6 nights: hotels, homestays, eco-lodges
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Daily breakfast + select meals
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Houseboat cruise with all meals
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Private A/C vehicle for all transfers
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Entry fees to attractions & activities
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Local guide for cultural experiences
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-teal-900 mt-6 mb-4 font-sans">
              Exclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Flights (international/domestic)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Personal expenses & tips
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Meals not specified
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-lime-600 mr-2" /> Travel insurance
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
              alt="Houseboat Dinner"
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
              Houseboat check-in: 12 PM | Check-out: 9 AM
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              Periyar safari subject to weather & park rules
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              Modest dress required at temples
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              Monsoon (Jun–Sep): Expect rain, bring raincoat
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-lime-600 mr-2 mt-1" />
              Standard cancellation policy applies
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
                alt="Paradise Bliss Kerala Tour"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-teal-900 font-sans flex items-center">
                <AiOutlineCompass className="mr-2 text-lime-600" />
                Paradise Bliss Tour
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