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
/* --------------------------- DATA -------------------------------- */
/* ------------------------------------------------------------------ */

const heroImage = '/img/kerala/hero-backwaters-sunset.jpg';
const highlightImages = [
  '/img/kerala/alleppey-houseboat.jpg',
  '/img/kerala/munnar-tea-gardens.jpg',
  '/img/kerala/kovalam-beach.jpg',
  '/img/kerala/kathakali-dance.jpg',
];
const rightSideImage = '/img/kerala/sadya-banana-leaf.jpg';

const quickFacts = [
  { text: "Kerala has India’s highest literacy rate — 96.2%." },
  { text: "Alleppey is known as the 'Venice of the East'." },
  { text: "Kerala produces 90% of India’s natural rubber." },
  { text: "Onam is a 10-day harvest festival celebrated with joy." },
];

const highlights = [
  {
    title: 'Alleppey Backwaters',
    image: highlightImages[0],
    desc: 'Drift through palm-lined canals on a traditional houseboat.',
  },
  {
    title: 'Munnar Tea Gardens',
    image: highlightImages[1],
    desc: 'Walk through emerald hills and misty valleys.',
  },
  {
    title: 'Kovalam Beach',
    image: highlightImages[2],
    desc: 'Golden sands, clear waters, and sunset views.',
  },
  {
    title: 'Kathakali Dance',
    image: highlightImages[3],
    desc: 'Experience Kerala’s vibrant cultural art form.',
  },
];

const seasons = [
  {
    title: 'Winter',
    months: 'Oct – Feb',
    desc: 'Best for sightseeing, backwater cruises, and beach vacations.',
  },
  {
    title: 'Monsoon',
    months: 'Jun – Sep',
    desc: 'Perfect for lush green landscapes and rejuvenating Ayurvedic therapies.',
  },
  {
    title: 'Summer',
    months: 'Mar – May',
    desc: 'Great for hill station visits and off-season travel deals.',
  },
];

/* ------------------------------------------------------------------ */
/* -------------------------- COMPONENT ---------------------------- */
/* ------------------------------------------------------------------ */

export default function KeralaGodsOwnCountry() {
  /* ---- Accordion (Best Time to Visit) ---- */
  const [openSeason, setOpenSeason] = useState(null);
  const toggleSeason = (index) => {
    setOpenSeason(openSeason === index ? null : index);
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
    }, 4000);
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
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const factVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  };

  /* ------------------------------------------------------------------ */
  /* ----------------------------- JSX ------------------------------- */
  /* ------------------------------------------------------------------ */

  return (
    <div className="bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[650px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-emerald-900/60 to-teal-900/80 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-wide"
            >
              Kerala – God’s Own Country
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-2xl mb-8 font-light italic"
            >
              Where nature whispers peace and beauty flows through every corner
            </motion.p>
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-emerald-700"
            >
              Plan Your Escape
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Wave Divider */}
      <div className="relative h-16 bg-teal-800">
        <svg className="absolute bottom-0 w-full text-emerald-50" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,0L60,20L120,10L180,30L240,15L300,25L360,10L420,30L480,15L540,25L600,10L660,30L720,15L780,25L840,10L900,30L960,15L1020,25L1080,10L1140,30L1200,15L1260,25L1320,10L1380,30L1440,15V100H0Z" />
        </svg>
      </div>

      {/* Trip Overview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Welcome to Paradise
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-emerald-500 rounded-full" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-xl"
        >
          <div className="space-y-6">
            <p className="text-gray-700 text-base leading-relaxed">
              Welcome to <strong>Kerala</strong>, the land where nature whispers peace and beauty flows through every corner. 
              Known as <em>God’s Own Country</em>, Kerala is a paradise of swaying coconut palms, tranquil backwaters, misty hills, and golden beaches. 
              Whether you’re seeking romance, relaxation, adventure, or cultural exploration, Kerala offers the perfect blend of all.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              With its pristine landscapes, vibrant traditions, and warm hospitality, it truly captures the essence of heaven on earth.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-teal-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-teal-800 flex items-center"
            >
              Start Planning
            </motion.button>
          </div>
        </motion.div>
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
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Discover the Magic
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-emerald-500 rounded-full" />
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
                className="absolute top-4 right-4 text-emerald-600"
              >
                <AiOutlineHeart size={24} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Best Time to Visit */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Best Time to Visit
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-emerald-500 rounded-full" />
        </motion.h2>

        <div className="space-y-6">
          {seasons.map((season, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSeason(index)}
                className="w-full flex justify-between items-center p-6 text-left bg-gradient-to-r from-emerald-700 to-teal-800 text-white hover:from-emerald-800 hover:to-teal-900 transition-all"
              >
                <span className="text-xl font-semibold font-sans flex items-center gap-3">
                  {season.title} ({season.months})
                </span>
                {openSeason === index ? <AiOutlineUp size={20} /> : <AiOutlineDown size={20} />}
              </button>

              <AnimatePresence initial={false}>
                {openSeason === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 text-gray-700 font-sans leading-relaxed">
                      {season.desc}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Culture & Food */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-teal-900 text-center mb-12 font-serif relative"
        >
          Culture & Cuisine
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-emerald-500 rounded-full" />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-teal-800 mb-4 font-sans">
              Rich Heritage & Festivals
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kerala’s rich culture is woven through its art, music, and traditions. Witness the grace of <strong>Kathakali</strong> and <strong>Mohiniyattam</strong> dance performances, or explore centuries-old temples and churches.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Festivals like <strong>Onam</strong>, <strong>Vishu</strong>, and <strong>Thrissur Pooram</strong> fill the air with joy, color, and devotion. Kerala’s people are known for their simplicity, kindness, and hospitality — every visitor is treated like family.
            </p>
          </div>

          <div className="text-center">
            <Image
              src={rightSideImage}
              alt="Kerala Sadya"
              width={400}
              height={300}
              className="rounded-2xl shadow-xl mx-auto"
              loading="lazy"
            />
            <p className="mt-4 text-lg font-medium text-teal-800">
              A traditional <strong>Kerala Sadya</strong> served on banana leaf
            </p>
          </div>
        </div>
      </motion.section>

      {/* Did You Know? + CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-teal-900 mb-6 font-sans flex items-center">
              Did You Know?
            </h3>
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-dashed border-emerald-300">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFactIndex}
                  variants={factVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-gray-700 font-medium text-lg leading-relaxed"
                >
                  {quickFacts[currentFactIndex].text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-emerald-800 flex items-center justify-center"
            >
              Request a Custom Trip
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 text-teal-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-amber-600 flex items-center justify-center"
            >
              Call Us Now
            </motion.button>
          </div>
        </div>
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
                alt="Kerala – God’s Own Country"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-teal-900 font-sans">
                Plan Your Kerala Journey
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-600"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-600 pr-10"
                      placeholderText="Select date"
                      required
                    />
                    <AiOutlineCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-600"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-emerald-600 text-white rounded-full font-semibold shadow-lg hover:bg-emerald-700"
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;500;600&display=swap');

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