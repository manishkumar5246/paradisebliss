'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// === IMAGES (Update with your actual image paths) ===
const heroImage = "/optimised/tirthan-hero.webp"; // Hero background
const highlightImages = [
  "/optimised/jibhi-waterfall.webp",     // Jibhi Waterfall
  "/optimised/mini-thailand-pool.webp",  // Mini Thailand Pool
  "/optimised/serolsar-lake.webp",       // Serolsar Lake
  "/optimised/chhoie-waterfall.webp",    // Chhoie Waterfall
];
const rightSideImage = "/img/logo.png";

// === QUICK FACTS ===
const quickFacts = [
  { text: "Tirthan Valley is a hidden gem in Himachal, known for its untouched beauty and trout-rich river." },
  { text: "Jalori Pass at 3,120m offers stunning views of the Great Himalayan National Park." },
  { text: "Serolsar Lake is a sacred alpine lake with crystal-clear water, surrounded by dense forests." },
  { text: "Tirthan Valley is a UNESCO World Heritage Site for biodiversity and eco-tourism." },
];

// === ITINERARY (From .docx) ===
const itinerary = [
  {
    day: "Day 1",
    title: "Departure from Delhi – Arrival in Jibhi",
    desc: "Evening: Depart from Delhi around 7:30 PM in an AC vehicle.\nOvernight: Travel overnight to Jibhi."
  },
  {
    day: "Day 2",
    title: "Explore Jibhi",
    desc: "Morning: Arrive in Jibhi.\nActivities:\n• Visit Jibhi Waterfall (500m–1km walk).\n• Explore the Mini Thailand Pool (1–2km walk).\nEvening: Relax at your homestay or cottage.\nOvernight: Stay in Jibhi."
  },
  {
    day: "Day 3",
    title: "Jalori Pass & Serolsar Lake Trek",
    desc: "Morning: After breakfast, drive to Jalori Pass.\nTrek: Hike to Serolsar Lake (approximately 5–6 km round trip).\nEvening: Return to Jibhi.\nOvernight: Stay in Jibhi."
  },
  {
    day: "Day 4",
    title: "Chhoie Waterfall & Departure",
    desc: "Morning: After breakfast, check out and proceed to Chhoie Waterfall.\nAfternoon: Enjoy the serene surroundings.\nEvening: Depart for Delhi."
  },
  {
    day: "Day 5",
    title: "Arrival in Delhi",
    desc: "Morning: Arrive in Delhi."
  },
];

// === HIGHLIGHTS ===
const highlights = [
  { title: "Jibhi Waterfall", image: highlightImages[0], desc: "A short scenic walk to a cascading waterfall in lush greenery." },
  { title: "Mini Thailand Pool", image: highlightImages[1], desc: "A serene natural pool with crystal-clear water, perfect for a dip." },
  { title: "Serolsar Lake Trek", image: highlightImages[2], desc: "Moderate 5–6 km trek to a sacred alpine lake at 3,100m." },
  { title: "Chhoie Waterfall", image: highlightImages[3], desc: "A majestic waterfall to visit before heading back to Delhi." },
];

// === FAQs (Trip-Specific) ===
const faqs = [
  { question: "Is the Serolsar Lake trek difficult?", answer: "No, it's a moderate 5–6 km round trip with gradual ascent. Suitable for beginners with average fitness. Guide provided." },
  { question: "What type of accommodation is provided?", answer: "Cozy homestays or cottages in Jibhi with modern amenities, hot water, and home-cooked meals." },
  { question: "Are meals vegetarian?", answer: "Yes, all meals are pure vegetarian. Local Himachali cuisine with fresh ingredients." },
  { question: "What should I pack?", answer: "Trekking shoes, warm jacket (nights are cold), raincoat, sunscreen, water bottle, torch, power bank, and personal meds." },
  { question: "Is network available in Jibhi?", answer: "Limited. Jio/Airtel works intermittently. Enjoy a peaceful digital detox!" },
  { question: "Can kids join?", answer: "Yes, 8+ years with parental supervision. The trek is family-friendly." },
  { question: "What if it rains?", answer: "Trek may be adjusted. Raincoats provided. Safety first." },
  { question: "Is trout fishing allowed?", answer: "Catch-and-release only with permit. Not included in package." },
  { question: "How far is Jalori Pass from Jibhi?", answer: "About 12 km (30–40 min drive)." },
  { question: "What is the best time to visit?", answer: "March–June & September–November. Avoid monsoon due to slippery trails." },
];

// === IMPORTANT INFORMATION (From .docx) ===
const importantInfo = [
  {
    title: "Package Inclusions",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Accommodation:</strong> Homestay or cottage in Jibhi.</li>
          <li><strong>Meals:</strong> 5 meals – 2 on Day 1 (Breakfast and Dinner), 2 on Day 2 (Breakfast and Dinner), 1 on Day 3 (Breakfast).</li>
          <li><strong>Transportation:</strong> Volvo from Delhi to Aut and back, internal transfers in Sumo/Tempo.</li>
          <li><strong>Activities:</strong> Guided trek to Serolsar Lake.</li>
          <li><strong>Team Captain:</strong> Throughout the trip.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Exclusions",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Personal Expenses: Any personal expenses or adventure activities not mentioned.</li>
        <li>Meals: Meals and drinks other than those specified.</li>
        <li>Entry Fees: Any kind of entry tickets/fees.</li>
        <li>GST: 5% GST.</li>
      </ul>
    ),
  },
  {
    title: "Cancellation Policy",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>30+ days: 90% refund</li>
        <li>15–29 days: 50% refund</li>
        <li>&lt;15 days: No refund</li>
      </ul>
    ),
  },
  {
    title: "Health & Safety",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Follow guide instructions at all times.</li>
        <li>Carry sufficient water (1.5L minimum).</li>
        <li>Use sunscreen and wear a hat during the day.</li>
        <li>Do not litter — carry back all waste.</li>
        <li>Emergency contact: Team Captain available 24/7.</li>
      </ul>
    ),
  },
];

// === HIGHLIGHT CARD COMPONENT ===
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

// === MAIN COMPONENT ===
export default function TirthanValleyPackage() {
  const [openDay, setOpenDay] = useState(null);
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

  // Toggle Functions
  const toggleDay = useCallback((index) => setOpenDay(prev => prev === index ? null : index), []);
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
    console.log('Tirthan Booking Inquiry:', formData);
    handleCloseModal();
  }, [formData, handleCloseModal]);

  // Rotating Facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % quickFacts.length);
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
              Paradise Bliss
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              Tirthan Valley | 4N/5D
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
              Book Your Escape
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
        className="max-w-5xl mx-auto px-4 py-16 relative"
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
              Escape to the serene <strong>Tirthan Valley</strong> — a hidden paradise in Himachal. Explore waterfalls, trek to sacred lakes, and unwind in cozy homestays. Perfect for nature lovers seeking peace and adventure.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Duration:</strong> 5 Days / 4 Nights
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Base:</strong> Jibhi
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Trek:</strong> Serolsar Lake (5–6 km)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Best Time:</strong> Mar–Jun, Sep–Nov
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A] transition-colors"
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
        className="max-w-5xl mx-auto px-4 py-16 relative"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Detailed Itinerary
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-4">
          {itinerary.map((item, index) => (
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
                className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-[#00453A] to-[#00332A] text-white transition-all hover:from-[#00332A] hover:to-[#00251F]"
              >
                <span className="font-semibold font-sans">{item.day}: {item.title}</span>
                {openDay === index ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              <AnimatePresence initial={false}>
                {openDay === index && (
                  <motion.div
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 600, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 text-gray-700 font-sans whitespace-pre-line">
                      {item.desc}
                    </div>
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
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-4 py-16 relative"
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
            <HighlightCard
              key={index}
              highlight={highlight}
              index={index}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* Did You Know? + CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl relative"
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
              alt="Tirthan Valley"
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
              Get Free Quote
            </motion.button>
            <motion.a
              href="tel:+918449000181"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F5A623] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#E59400] w-full max-w-xs flex items-center justify-center"
            >
              <AiOutlinePhone className="mr-2" /> Call Expert
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Important Information */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16 relative"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Important Information
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
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
        className="max-w-5xl mx-auto px-4 py-16 relative"
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
                {openFaq === index ? (
                  <AiOutlineUp className="text-[#00453A]" />
                ) : (
                  <AiOutlineDown className="text-[#00453A]" />
                )}
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

      {/* Booking Modal */}
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
                alt="Tirthan Valley"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
                quality={75}
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">4N/5D Tirthan Valley – Paradise Bliss</h3>
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
                <label className="block text-sm font-medium text-gray-700 font-sans">Preferred Date</label>
                <div className="relative">
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2"
                    placeholderText="Select date"
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
                Submit Request
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