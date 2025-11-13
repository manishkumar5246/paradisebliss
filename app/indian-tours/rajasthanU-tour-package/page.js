'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

// Rajasthan Images (replace with actual paths)
const heroImage = "/img/rajasthan-hero.jpg";
const highlightImages = [
  "/img/rajasthan/amber-fort.jpg",
  "/img/rajasthan/mehrangarh.jpg",
  "/img/rajasthan/jaisalmer-fort.jpg",
  "/img/rajasthan/lake-palace.jpg",
];
const rightSideImage = "/img/rajasthan/thar-desert.jpg";

// Quick Facts about Rajasthan
const quickFacts = [
  { text: "Rajasthan is India’s largest state by area." },
  { text: "Home to the Thar Desert — one of the world’s largest subtropical deserts." },
  { text: "33 districts, each with its own royal legacy." },
  { text: "Famous for Pushkar Camel Fair — the world’s largest camel fair." },
];

// 8-Day Rajasthan Itinerary
const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Jaipur",
    desc: "Arrive at Jaipur Airport/Railway Station. Transfer to hotel. Evening visit to Chokhi Dhani (optional). Overnight in Jaipur."
  },
  {
    day: "Day 2",
    title: "Jaipur Sightseeing",
    desc: "Visit Amber Fort (elephant/jeep ride), City Palace, Jantar Mantar, Hawa Mahal, and Albert Hall. Evening free for shopping. Overnight in Jaipur."
  },
  {
    day: "Day 3",
    title: "Jaipur to Jodhpur",
    desc: "Drive to Jodhpur (5-6 hrs). Enroute visit Ajmer & Pushkar (optional). Check-in and relax. Overnight in Jodhpur."
  },
  {
    day: "Day 4",
    title: "Jodhpur Sightseeing",
    desc: "Visit Mehrangarh Fort, Jaswant Thada, Umaid Bhawan Palace Museum, and Clock Tower market. Evening free. Overnight in Jodhpur."
  },
  {
    day: "Day 5",
    title: "Jodhpur to Jaisalmer",
    desc: "Drive to Jaisalmer (5 hrs). Enroute visit Osian Temples. Arrive and check-in. Evening at leisure. Overnight in Jaisalmer."
  },
  {
    day: "Day 6",
    title: "Jaisalmer & Desert Camp",
    desc: "Visit Jaisalmer Fort, Patwon Ki Haveli, Salim Singh Ki Haveli, and Gadisar Lake. Evening transfer to Sam Sand Dunes for camel safari, folk dance, and desert camping under the stars."
  },
  {
    day: "Day 7",
    title: "Jaisalmer to Udaipur",
    desc: "Drive to Udaipur (6-7 hrs). Enroute visit Ranakpur Jain Temple. Arrive and check-in. Evening boat ride on Lake Pichola (optional). Overnight in Udaipur."
  },
  {
    day: "Day 8",
    title: "Udaipur Sightseeing & Departure",
    desc: "Visit City Palace, Jagdish Temple, Saheliyon Ki Bari, and Fateh Sagar Lake. Later, transfer to Udaipur Airport/Railway Station. Trip ends with royal memories."
  }
];

// Trip Highlights
const highlights = [
  { title: "Amber Fort", image: highlightImages[0], desc: "Majestic hilltop fort with elephant rides and stunning architecture." },
  { title: "Mehrangarh Fort", image: highlightImages[1], desc: "One of India’s largest forts, perched on a 400-ft hill." },
  { title: "Jaisalmer Fort", image: highlightImages[2], desc: "A living golden fort rising from the Thar Desert." },
  { title: "Lake Palace", image: highlightImages[3], desc: "A floating marble palace on Lake Pichola, Udaipur." },
];

export default function RajasthanTripPackage() {
  const [openDay, setOpenDay] = useState(null);
  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: null,
    travellers: '',
  });

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

  return (
    <div className="bg-[#F1FDF3] min-h-screen">
      {/* Hero Section */}
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
              Rajasthan Royal Heritage Tour
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              8 Days of Palaces, Forts & Desert Magic
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
              Plan Your Royal Journey
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Divider */}
      <div className="relative h-12 bg-[#00453A]">
        <svg className="absolute bottom-0 w-full text-[#F1FDF3]" viewBox="0 0 1440 60">
          <path fill="currentColor" d="M0,0L1440,60H0Z"></path>
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
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
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
              Experience the grandeur of Rajasthan — majestic forts, golden deserts, and royal palaces. A journey through the Land of Kings.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Duration:</strong> <span className="ml-1">8 Days / 7 Nights</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Price:</strong> <span className="ml-1">Starting at ₹32,999 per person</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Group Size:</strong> <span className="ml-1">8-15 travelers</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Best Time:</strong> <span className="ml-1">Oct–Mar</span>
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
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
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
                <span className="font-semibold font-sans">{day.day}: {day.title}</span>
                {openDay === index ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              <AnimatePresence initial={false}>
                {openDay === index && (
                  <motion.div
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 500, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
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
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
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
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
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
                <h3 className="text-lg font-semibold text-[#00453A] font-sans">{highlight.title}</h3>
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
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl"
        >
          <div>
            <h3 className="text-2xl font-semibold text-[#00453A] mb-4 font-sans">Pricing</h3>
            <p className="text-xl text-[#F5A623] font-bold">Starting at ₹32,999 per person</p>
            <p className="text-sm text-gray-600 mt-2 font-sans">*Includes desert camp stay & camel safari</p>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Scheduled Dates</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineCalendar className="text-[#F5A623] mr-2" /> 10th Oct 2025</li>
              <li className="flex items-center"><AiOutlineCalendar className="text-[#F5A623] mr-2" /> 5th Nov 2025</li>
              <li className="flex items-center"><AiOutlineCalendar className="text-[#F5A623] mr-2" /> 15th Dec 2025</li>
              <li className="flex items-center"><AiOutlineCalendar className="text-[#F5A623] mr-2" /> 10th Jan 2026</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Inclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 7 nights accommodation (3-4 star)</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Daily breakfast & dinner</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> AC vehicle for all transfers</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Desert camp with camel safari & folk dance</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> All entry fees & guide charges</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Exclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Flights/train to Jaipur</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Lunch & personal expenses</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Elephant ride at Amber Fort</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Travel insurance</li>
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
              alt="Thar Desert"
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

      {/* Notes Section */}
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
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
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
              Desert camp is subject to weather. Alternate hotel stay provided in case of heavy rain.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Carry sunscreen, hat, and comfortable shoes. Summers are extremely hot.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Pushkar Camel Fair dates vary annually. Confirm before booking.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Itinerary may change due to road conditions, festivals, or government regulations.
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
          >
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">X</button>
            <div className="mb-4">
              <Image
                src={heroImage}
                alt="Rajasthan"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Rajasthan Royal Heritage Tour</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">Date</label>
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
                  <label className="block text-sm font-medium text-gray-700 font-sans">Travellers</label>
                  <input type="number" name="travellers" value={formData.travellers} onChange={handleInputChange} min="1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A]" />
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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500&display=swap');
        .react-datepicker-wrapper { width: 100%; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Poppins', sans-serif; }
        .rotate-2 { transform: rotate(2deg); }
        .rotate--2 { transform: rotate(-2deg); }
      `}</style>
    </div>
  );
}