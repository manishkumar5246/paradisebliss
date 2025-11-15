'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// Images (Update these paths with actual Ladakh general images)
const heroImage = "https://wallpapercave.com/wp/wp7029202.jpg"; // Replace with general Ladakh hero
const highlightImages = [
  "https://tse1.mm.bing.net/th/id/OIP.p-K7LPFe6esUUG-BcMSGRwHaFj?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://www.go2ladakh.in/app/webroot/js/ckfinder/userfiles/images/Pangong%20Lake.jpg",
  "https://wallpapercave.com/wp/wp8172891.jpg",
  "https://tse1.mm.bing.net/th/id/OIP.XcfM0IltJ_gTYt2bDCE6XQHaD4?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
];
const rightSideImage = "/img/logo.png";

// Quick Facts - Updated from document
const quickFacts = [
  { text: "Ladakh is known as the 'Land of High Passes' with over 5,000m+ motorable roads." },
  { text: "Pangong Lake changes color up to 5 times a day due to sunlight reflection." },
  { text: "Hemis Monastery hosts the famous Hemis Festival with masked dances every year." },
  { text: "Ladakh roads are open only from May to September; winters bring the Chadar Trek." },
];

// Highlights - Key Destinations from doc
const highlights = [
  { title: "Leh City", image: highlightImages[0], desc: "Markets, Leh Palace, Shanti Stupa with panoramic views." },
  { title: "Pangong Lake", image: highlightImages[1], desc: "Mesmerizing high-altitude lake that changes colors." },
  { title: "Nubra Valley", image: highlightImages[2], desc: "Sand dunes, Bactrian camels, and Diskit Monastery." },
  { title: "Magnetic Hill", image: highlightImages[3], desc: "Gravity-defying optical illusion on the Leh-Kargil highway." },
];

// FAQs - General Travel FAQs
const faqs = [
  { question: "What is the best time to visit Ladakh?", answer: "May to September for pleasant weather and open roads. December–February for Chadar Trek and snow adventures." },
  { question: "How do I reach Ladakh?", answer: "Fly into Leh Kushok Bakula Rimpochee Airport (IXL) or travel by road via Manali or Srinagar (June–Sep only)." },
  { question: "Do I need permits to visit Ladakh?", answer: "Yes, Inner Line Permit (ILP) required for Nubra, Pangong, and Tso Moriri. Indian tourists can apply online or in Leh." },
  { question: "Is altitude sickness common?", answer: "Yes. Acclimatize in Leh for 1–2 days. Stay hydrated, avoid alcohol, and consider Diamox if advised by a doctor." },
  { question: "What should I pack for Ladakh?", answer: "Warm layers, sunscreen, sunglasses, moisturizer, medicines, power bank, and reusable water bottle." },
  { question: "Are ATMs and mobile networks available?", answer: "ATMs in Leh (limited cash). Jio & Airtel work in Leh; sparse coverage elsewhere. Carry cash." },
  { question: "Can I do the Chadar Trek in winter?", answer: "Yes, from mid-January to mid-February. Requires fitness, guide, and special gear. Not for beginners." },
  { question: "Are vegetarian meals easily available?", answer: "Yes, most hotels and dhabas serve veg thalis, momos, and Maggi. Jain food available in Leh." },
  { question: "Is Ladakh family-friendly?", answer: "Absolutely! Safe for families with kids above 5 years. Avoid high-altitude areas for infants." },
  { question: "How many days are ideal for Ladakh?", answer: "7–10 days to cover Leh, Nubra, Pangong, and local sights comfortably." },
];

// Important Information - General Travel Info
const importantInfo = [
  {
    title: "Travel Guidelines",
    content: (
      <div className="space-y-4">
        <div>
          <strong className="block mb-2">Essential Tips:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Acclimatize in Leh for at least 24–48 hours upon arrival.</li>
            <li>Carry valid ID (Aadhaar/Passport) for permit checks.</li>
            <li>Respect local Buddhist culture — remove shoes in monasteries.</li>
            <li>No plastic policy in Ladakh — carry reusable bottles.</li>
            <li>Book flights and hotels early during peak season (June–Aug).</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Best Time to Visit",
    content: (
      <p>
        <strong>Summer (May–Sep):</strong> Roads open, pleasant weather, ideal for sightseeing.<br />
        <strong>Winter (Dec–Feb):</strong> Snow-covered, Chadar Trek, frozen lakes — for adventure seekers.
      </p>
    ),
  },
  {
    title: "How to Reach",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>By Air:</strong> Direct flights to Leh from Delhi, Mumbai, Srinagar.</li>
        <li><strong>By Road:</strong> Manali–Leh (473 km, 2 days) or Srinagar–Leh (434 km, 2 days) — open June–Sep.</li>
        <li><strong>By Train + Road:</strong> Jammu Tawi → Srinagar → Leh (bus/taxi).</li>
      </ul>
    ),
  },
  {
    title: "Culture & Festivals",
    content: (
      <p>
        Ladakh celebrates <strong>Hemis Festival</strong> (June/July), <strong>Losar</strong> (Tibetan New Year), and <strong>Ladakh Festival</strong> (Sep). Experience masked dances, archery, and local cuisine.
      </p>
    ),
  },
];

// Memoized Highlight Card
const HighlightCard = memo(({ highlight, index, variants }) => (
  <motion.div
    variants={variants}
    whileHover={{ scale: 1.02 }}
    className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
    initial="hidden"
    animate="show"
  >
    <Image
      src={highlight.image}
      alt={highlight.title}
      width={500}
      height={192}
      className="w-full h-48 object-cover"
      loading="lazy"
      quality={75}
    />
    <div className="p-5">
      <h3 className="text-lg font-semibold text-[#00453A] font-sans">{highlight.title}</h3>
      <p className="text-sm text-gray-600 mt-2 font-sans">{highlight.desc}</p>
    </div>
    <motion.div
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3 }}
      className="absolute top-4 right-4 text-[#F5A623]"
    >
      <AiOutlineStar size={24} />
    </motion.div>
  </motion.div>
));
HighlightCard.displayName = 'HighlightCard';

export default function LadakhTravelGuide() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openInfo, setOpenInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: null,
    travellers: '',
  });
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const toggleFaq = useCallback((index) => setOpenFaq(prev => prev === index ? null : index), []);
  const toggleInfo = useCallback((index) => setOpenInfo(prev => prev === index ? null : index), []);
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setFormData({ name: '', phone: '', date: null, travellers: '' });
  }, []);
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  const handleDateChange = useCallback((date) => setFormData(prev => ({ ...prev, date })), []);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Inquiry submitted:', formData);
    handleCloseModal();
  }, [formData, handleCloseModal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % quickFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#00453A]/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 font-serif"
            >
              Ladakh – Land of High Passes
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans max-w-3xl mx-auto"
            >
              A dream destination blending serenity, adventure, and spiritual heritage amidst snow-capped peaks and azure lakes.
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
              Plan Your Trip
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

      {/* Introduction */}
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
          A Paradise for Adventure & Peace
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed font-sans">
              Ladakh isn’t just about breathtaking views — it’s about feeling alive in the purest sense. From motorbike rides on the world’s highest motorable roads to trekking through scenic valleys, every moment is filled with excitement and wonder.
            </p>
            <p className="text-gray-700 leading-relaxed font-sans">
              The thrill of crossing Khardung La, exploring Nubra’s dunes, or camping under a million stars at Pangong creates memories you’ll cherish forever. Yet, beyond adventure, Ladakh’s silent monasteries and calm lakes offer deep peace to the soul.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A]"
            >
              Get Travel Guide
            </motion.button>
            <motion.a
              href="tel:+918449000181"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F5A623] text-[#00453A] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#E59400] flex items-center justify-center"
            >
              <AiOutlinePhone className="mr-2" /> Call Expert
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Highlights */}
      <motion.section
        initial="hidden"
        whileInView="show"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-4 py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Must-Visit Destinations
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} index={index} variants={itemVariants} />
          ))}
        </motion.div>
      </motion.section>

      {/* Culture & People */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16 bg-white/50"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Culture & Heritage
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-gray-700 leading-relaxed font-sans text-lg">
            The people of Ladakh, with their warm smiles and rich traditions, add soul to this cold desert. Deeply rooted in Buddhist culture, the region celebrates vibrant festivals like <strong>Hemis</strong> and <strong>Losar</strong> with colorful masks, dances, and rituals.
          </p>
          <p className="text-gray-700 leading-relaxed font-sans mt-4">
            Visit monasteries like <strong>Hemis, Thiksey, and Alchi</strong> to witness centuries-old spirituality and intricate thangka art.
          </p>
        </motion.div>
      </motion.section>

      {/* Did You Know? + CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl"
        >
          <div>
            <h3 className="text-2xl font-semibold text-[#00453A] mb-4 font-sans flex items-center">
              <AiOutlineStar className="text-[#F5A623] mr-2" /> Did You Know?
            </h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFactIndex}
                variants={factVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-gray-700 font-sans text-base leading-relaxed"
              >
                {quickFacts[currentFactIndex].text}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              src={rightSideImage}
              alt="Ladakh Guide"
              width={150}
              height={150}
              className="object-contain"
              loading="lazy"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A] w-full max-w-xs"
            >
              Get Free Itinerary
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Important Information */}
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
          Travel Information
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w2 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-4">
          {importantInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#E4DECF] border-l-4 border-[#F5A623] rounded-r-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleInfo(index)}
                className="w-full flex justify-between items-center p-5 text-left bg-[#E4DECF] text-[#00453A] font-semibold font-sans"
              >
                <span>{info.title}</span>
                {openInfo === index ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              <AnimatePresence initial={false}>
                {openInfo === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 text-gray-700 font-sans">
                      {info.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQs */}
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
          Frequently Asked Questions
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#E4DECF] border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center p-4 text-left"
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#F5A623] text-white rounded-full font-semibold mr-3">
                  {index + 1}
                </span>
                <span className="flex-1 text-[#00453A] font-semibold font-sans text-lg">
                  {faq.question}
                </span>
                {openFaq === index ? <AiOutlineUp className="text-[#00453A]" /> : <AiOutlineDown className="text-[#00453A]" />}
              </button>
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 text-gray-700 font-sans text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Inquiry Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <div className="mb-4">
              <Image
                src={heroImage}
                alt="Ladakh Travel"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
                quality={75}
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Plan Your Ladakh Trip</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-sans">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-sans">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-sans">Preferred Month</label>
                <div className="relative">
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    minDate={new Date()}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2"
                    placeholderText="Select month"
                    required
                  />
                  <AiOutlineCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-sans">No. of Travellers</label>
                <input
                  type="number"
                  name="travellers"
                  value={formData.travellers}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-[#F5A623] text-[#00453A] rounded-full font-semibold shadow-lg hover:shadow-xl"
              >
                Get Free Quote
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500&display=swap');
        .react-datepicker-wrapper { width: 100%; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Poppins', sans-serif; }
        .rotate-2 { transform: rotate(2deg); }
        .-rotate-2 { transform: rotate(-2deg); }
      `}</style>
    </div>
  );
}