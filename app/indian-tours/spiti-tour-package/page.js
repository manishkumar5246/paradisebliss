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

const heroImage = 'https://wallpaperaccess.com/full/7928594.jpg';
const highlightImages = [
  'https://tse1.mm.bing.net/th/id/OIP.8dVxc-LHxdbKBFPkOZjCzQHaEK?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://tse1.explicit.bing.net/th/id/OIP.poiZj7YnqGNxfPagQ5_jZgHaEU?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://www.nitworldwideholidays.com/offbeat-destinations-india/himachal-pradesh/img/langza/Langza1.jpg',
  'https://png.pngtree.com/background/20230401/original/pngtree-famous-indian-tourist-landmark-dhankar-monastry-perched-on-a-cliff-in-picture-image_2229526.jpg',
];
const rightSideImage = '/img/spiti/starry-sky.jpg';

const quickFacts = [
  { text: "Spiti means 'The Middle Land' — between India and Tibet." },
  { text: "Home to some of the world’s highest inhabited villages." },
  { text: "Langza is known as the 'Fossil Village' of the Himalayas." },
  { text: "Spiti is often called 'Little Tibet' due to its culture and terrain." },
];

const itinerary = [
  {
    day: 'Day 1',
    title: 'Chandigarh to Narkanda',
    desc: 'Depart from Chandigarh (early morning). Drive to Narkanda via Shimla (7-8 hrs). Overnight stay in Narkanda.',
  },
  {
    day: 'Day 2',
    title: 'Narkanda to Sangla (Kinnaur)',
    desc: 'Drive to Sangla (6-7 hrs). Visit Kamru Fort and Bering Nag Temple. Enjoy apple orchards and Kinnaur valley views. Overnight in Sangla.',
  },
  {
    day: 'Day 3',
    title: 'Sangla to Kaza',
    desc: 'Drive to Kaza (8-9 hrs) via Nako Lake and Tabo. Check-in at homestay/hotel. Evening free to explore Kaza town. Overnight in Kaza.',
  },
  {
    day: 'Day 4',
    title: 'Kaza Local Sightseeing',
    desc: 'Visit Key Monastery, Kibber Village (highest motorable village), and Gete. Return to Kaza. Overnight in Kaza.',
  },
  {
    day: 'Day 5',
    title: 'Excursion to Langza, Hikkim & Komic',
    desc: 'Full-day trip to Langza (fossil village), Hikkim (world’s highest post office), and Komic (highest village). Return to Kaza.',
  },
  {
    day: 'Day 6',
    title: 'Kaza to Dhankar & Pin Valley',
    desc: 'Visit Dhankar Monastery and Lake. Drive to Mud Village in Pin Valley National Park. Spot ibex and snow leopards (seasonal). Overnight in Kaza or Mud.',
  },
  {
    day: 'Day 7',
    title: 'Kaza to Kalpa',
    desc: 'Drive to Kalpa (7-8 hrs). Visit Chicham Bridge enroute. Enjoy stunning views of Kinner-Kailash range. Overnight in Kalpa.',
  },
  {
    day: 'Day 8',
    title: 'Kalpa to Chandigarh & Departure',
    desc: 'Early morning sunrise view. Drive back to Chandigarh (9-10 hrs). Trip ends with Himalayan memories.',
  },
];

const highlights = [
  {
    title: 'Key Monastery',
    image: highlightImages[0],
    desc: 'Ancient Buddhist monastery perched on a hilltop, overlooking Spiti River.',
  },
  {
    title: 'Chicham Bridge',
    image: highlightImages[1],
    desc: 'Asia’s highest bridge at 13,500 ft, connecting remote villages.',
  },
  {
    title: 'Langza',
    image: highlightImages[2],
    desc: 'Fossil-rich village with views of Chau Chau Kang Nilda peak.',
  },
  {
    title: 'Dhankar Monastery',
    image: highlightImages[3],
    desc: 'Clifftop monastery with panoramic views of Spiti & Pin rivers.',
  },
];

/* ------------------------------------------------------------------ */
/* --------------------------  COMPONENT  ---------------------------- */
/* ------------------------------------------------------------------ */

export default function SpitiValleyTripPackage() {
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
              Spiti Valley Himalayan Odyssey
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              8 Days of Cold Desert, Monasteries & Starlit Skies
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
              Plan Your Himalayan Journey
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
              Discover the raw beauty of Spiti Valley — ancient monasteries,
              high-altitude villages, and surreal landscapes. A journey into the
              heart of the cold desert Himalayas.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Duration:</strong> <span className="ml-1">8 Days / 7 Nights</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Price:</strong> <span className="ml-1">Starting at ₹29,999 per person</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Group Size:</strong> <span className="ml-1">6-12 travelers</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Best Time:</strong>{' '}
                <span className="ml-1">May–Oct (Summer), Nov–Apr (Winter)</span>
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
              Starting at ₹29,999 per person
            </p>
            <p className="text-sm text-gray-600 mt-2 font-sans">
              *Includes homestay, permits & local guide
            </p>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">
              Scheduled Dates
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineCalendar className="text-[#F5A623] mr-2" /> 15th May 2025
              </li>
              <li className="flex items-center">
                <AiOutlineCalendar className="text-[#F5A623] mr-2" /> 10th Jun 2025
              </li>
              <li className="flex items-center">
                <AiOutlineCalendar className="text-[#F5A623] mr-2" /> 5th Sep 2025
              </li>
              <li className="flex items-center">
                <AiOutlineCalendar className="text-[#F5A623] mr-2" /> 10th Oct 2025
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">
              Inclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> 7 nights accommodation
                (homestay/hotel)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> All meals (breakfast &
                dinner)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> AC vehicle for entire
                trip
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Inner Line Permit
                (ILP)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Local
                English-speaking guide
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">
              Exclusions
            </h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Flights/train to
                Chandigarh
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Lunch & personal
                expenses
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" /> Adventure activities
                (rafting/trek)
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
              alt="Spiti Starry Sky"
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
              Manali-Kaza route is open only from May to October. Winter trips via Shimla.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Carry warm clothes, sunglasses, and sunscreen. High altitude — stay hydrated.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Inner Line Permit (ILP) required for non-Indians and some Indian regions.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Itinerary subject to change due to roadblocks, weather, or landslides.
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
                alt="Spiti Valley"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">
                Spiti Valley Himalayan Odyssey
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