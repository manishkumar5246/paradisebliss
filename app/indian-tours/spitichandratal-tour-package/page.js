'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

// Spiti Summer Tour Images (replace with actual paths)
const heroImage = "/optimised/spiti-Chandrataal4.jpg";
const highlightImages = [
  "https://th.bing.com/th/id/R.474630e54bb9a522177267d5818dcddf?rik=6obTc6UFRxdGBw&riu=http%3a%2f%2fwww.deodarcottage.com%2fwp-content%2fuploads%2f2015%2f12%2f115.jpg&ehk=k%2fOXVZ8HaFj1j%2f2Nc0CeXV%2fQtIYTGz6s9hrgxeQQ%2f1Q%3d&risl=&pid=ImgRaw&r=0",
  "https://www.savaari.com/blog/wp-content/uploads/2024/11/Jalori-Pass.webp",
  "https://tse3.mm.bing.net/th/id/OIP.Rt9FI_wIxBi3_uHiv_EnhwHaEK?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://hikerwolf.com/wp-content/uploads/2020/06/Jalori-Pass-2-800x364.jpg",
];
const rightSideImage = "/img/spiti/chandratal-moonrise.jpg";

// Quick Facts about Spiti Summer Tour
const quickFacts = [
  { text: "Chandratal Lake is called 'Moon Lake' due to its crescent shape." },
  { text: "Hikkim has the world’s highest post office at 14,567 ft." },
  { text: "Key Monastery is 1,000+ years old and sits at 13,668 ft." },
  { text: "Atal Tunnel shortens the Manali-Kaza route by 46 km." },
];

// 7-Day Spiti Valley Summer Tour Itinerary
const itinerary = [
  {
    day: "Day 1",
    title: "Delhi to Manali",
    desc: "Evening departure from Delhi at 7:30 PM in AC Volvo bus. Overnight journey to Manali."
  },
  {
    day: "Day 2",
    title: "Manali Exploration",
    desc: "Arrive in Manali. Self-explore local markets, cafes, and Hadimba Temple. Relax and acclimatize. Overnight stay in Manali."
  },
  {
    day: "Day 3",
    title: "Manali to Kaza via Atal Tunnel",
    desc: "Morning departure to Kaza via the 9.02 km Atal Tunnel. Enjoy stunning Himalayan views. Arrive in Kaza, check-in. Overnight in Kaza."
  },
  {
    day: "Day 4",
    title: "Kaza Sightseeing",
    desc: "Visit Key Monastery — Spiti’s largest gompa. Explore Hikkim (highest post office), Komic (highest village), and Langza. Interact with locals. Return to Kaza. Overnight stay."
  },
  {
    day: "Day 5",
    title: "Kaza to Chandratal Lake",
    desc: "Drive to Chandratal — the 'Moon Lake' at 14,100 ft. Enjoy turquoise waters and mountain reflections. Set up camp and stargaze. Overnight camping."
  },
  {
    day: "Day 6",
    title: "Chandratal to Manali",
    desc: "Pack up camp. Drive back to Manali via Kunzum Pass. Arrive and check-in. Evening free. Overnight in Manali."
  },
  {
    day: "Day 7",
    title: "Manali to Delhi",
    desc: "After breakfast, depart for Delhi in AC Volvo. Arrive by evening. Trip ends with Himalayan memories."
  }
];

// Trip Highlights
const highlights = [
  { title: "Key Monastery", image: highlightImages[0], desc: "Ancient Buddhist monastery overlooking Spiti River." },
  { title: "Chandratal Lake", image: highlightImages[1], desc: "High-altitude lake with surreal turquoise waters and starlit camping." },
  { title: "Hikkim Post Office", image: highlightImages[2], desc: "World’s highest post office — send a postcard from 14,567 ft!" },
  { title: "Kaza & Villages", image: highlightImages[3], desc: "Explore high-altitude villages and local Spitian culture." },
];

export default function SpitiSummerTourPackage() {
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
              Paradise Bliss Spiti Summer Tour
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              7 Days of Monasteries, Moon Lake & Himalayan Bliss
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
              Book Your Summer Escape
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
              A perfect summer getaway to Spiti Valley — travel via Atal Tunnel, explore ancient monasteries, send a postcard from the world’s highest post office, and camp under the stars at Chandratal Lake.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Duration:</strong> <span className="ml-1">7 Days / 6 Nights</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Price:</strong> <span className="ml-1">Starting at ₹22,999 per person</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Group Size:</strong> <span className="ml-1">6-12 travelers</span>
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2" />
                <strong>Best Time:</strong> <span className="ml-1">Jun–Sep</span>
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
            <p className="text-xl text-[#F5A623] font-bold">Starting at ₹22,999 per person</p>
            <p className="text-sm text-gray-600 mt-2 font-sans">*Includes Volvo, camping & oxygen</p>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Scheduled Dates</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineCalendar className="text-[#F5A623] mr-2" /> 12th Jun 2025</li>
              <li className="flex items-center"><AiOutlineCalendar className="text-[#F5A623] mr-2" /> 28th Jun 2025</li>
              <li className="flex items-center"><AiOutlineCalendar className="text-[#F5A623] mr-2" /> 10th Aug 2025</li>
              <li className="flex items-center"><AiOutlineCalendar className="text-[#F5A623] mr-2" /> 8th Sep 2025</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Inclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 6 nights: 4 hotels + 1 camping + 1 Volvo</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 8 meals (as per itinerary)</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> AC Volvo Delhi-Manali-Delhi</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Team Captain throughout</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 24x7 oxygen & emergency support</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Exclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Personal expenses & adventure activities</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Meals & drinks not specified</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Entry fees & permits</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 5% GST</li>
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
              alt="Chandratal Moonrise"
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
              Atal Tunnel route open June–September. Monsoon may affect roads.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Carry warm clothes, sunglasses, sunscreen. Altitude up to 14,100 ft.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Inner Line Permit required for non-Indians.
            </li>
            <li className="flex items-start">
              <AiOutlineStar className="text-[#F5A623] mr-2 mt-1" />
              Itinerary subject to weather, roadblocks, or landslides.
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
                alt="Spiti Summer Tour"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Paradise Bliss Spiti Summer Tour</h3>
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