'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// === IMAGES (Update with your actual image paths) ===
const heroImage = "/optimised/manali-solang-hero.webp"; // Hero background
const highlightImages = [
  "/optimised/hadimba-temple.webp",      // Hadimba Temple
  "/optimised/solang-valley.webp",       // Solang Valley
  "/optimised/kasol-riverside.webp",     // Kasol Riverside
  "/optimised/manikaran-gurudwara.webp", // Manikaran Gurudwara
];
const rightSideImage = "/img/logo.png";

// === QUICK FACTS ===
const quickFacts = [
  { text: "The Atal Tunnel is the world's longest highway tunnel above 10,000 feet." },
  { text: "Solang Valley is famous for adventure sports like paragliding and zorbing." },
  { text: "Kasol is known as 'Mini Israel' due to its vibrant Israeli backpacker culture." },
  { text: "Manikaran is revered for its natural hot springs and religious significance." },
];

// === ITINERARY (From .docx) ===
const itinerary = [
  {
    day: "Day 1",
    title: "Departure from Delhi – Arrival in Manali",
    desc: "Evening: Depart from Delhi around 6:00 PM in an AC vehicle.\nOvernight: Travel overnight to Manali."
  },
  {
    day: "Day 2",
    title: "Explore Manali – Solang Valley & Sissu",
    desc: "Morning: Arrive in Manali and check-in to your accommodation.\nActivities:\n• Visit Hadimba Temple, a unique wooden structure surrounded by cedar forests.\n• Explore Old Manali and Mall Road for local shopping and café hopping.\nAfternoon: Drive to Solang Valley for adventure activities like skiing, paragliding, or zorbing (at your own cost).\nEvening: Proceed to Sissu via the Atal Tunnel, enjoying the scenic drive.\nOvernight: Stay in Sissu."
  },
  {
    day: "Day 3",
    title: "Sissu – Kasol – Manikaran",
    desc: "Morning: After breakfast, depart for Kasol.\nActivities:\n• Explore the Kasol Market and enjoy riverside cafés.\n• Trek to Chalal Village (approximately 3 km round trip) for a peaceful nature walk.\n• Visit the Manikaran Gurudwara, known for its hot springs.\nEvening: Enjoy a bonfire and dinner at your accommodation in Kasol.\nOvernight: Stay in Kasol."
  },
  {
    day: "Day 4",
    title: "Departure to Delhi",
    desc: "Morning: After breakfast, check out from your accommodation.\nAfternoon: Depart for Delhi.\nEvening: Arrive in Delhi by evening, concluding your trip."
  },
];

// === HIGHLIGHTS ===
const highlights = [
  { title: "Hadimba Temple", image: highlightImages[0], desc: "Ancient wooden temple nestled in deodar forests." },
  { title: "Solang Valley", image: highlightImages[1], desc: "Adventure hub with paragliding, zorbing & stunning views." },
  { title: "Kasol Riverside", image: highlightImages[2], desc: "Chill by the Parvati River with cafés and mountain vibes." },
  { title: "Manikaran Hot Springs", image: highlightImages[3], desc: "Sacred site with natural geothermal springs and langar." },
];

// === FAQs (Trip-Specific) ===
const faqs = [
  { question: "Is the Atal Tunnel drive safe?", answer: "Yes, it's a well-maintained highway tunnel. Our experienced drivers ensure safe travel." },
  { question: "Are adventure activities included?", answer: "No, activities in Solang Valley (paragliding, zorbing, etc.) are at your own cost. We assist with booking." },
  { question: "What type of hotels do we stay in?", answer: "Comfortable 2-3 star hotels in Manali and cozy camps/homestays in Kasol & Sissu with hot water and clean rooms." },
  { question: "Is the Chalal trek difficult?", answer: "No, it's an easy 3 km round trip on a well-marked trail. Suitable for all fitness levels." },
  { question: "Can we visit Rohtang Pass?", answer: "Rohtang Pass is not included due to permit restrictions. Solang Valley offers similar adventure experiences." },
  { question: "Are meals vegetarian?", answer: "Yes, all meals are pure veg. Local Himachali and North Indian cuisine." },
  { question: "What should I pack?", answer: "Warm jacket, comfortable shoes, sunscreen, sunglasses, power bank, personal meds, and a light backpack." },
  { question: "Is network available?", answer: "Good coverage in Manali & Kasol. Limited in Sissu. Jio/Airtel recommended." },
  { question: "Can kids join?", answer: "Yes, 5+ years. Family-friendly itinerary." },
  { question: "What is the best time to visit?", answer: "May–June & September–October. Avoid monsoon (July–Aug) due to landslides." },
];

// === IMPORTANT INFORMATION (From .docx) ===
const importantInfo = [
  {
    title: "Package Inclusions",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Accommodation:</strong> 2 nights in hotels at Manali and 1 night in Kasol (Double/Triple Sharing).</li>
          <li><strong>Meals:</strong> 6 meals (2 on Day 2: Breakfast & Dinner; 2 on Day 3: Breakfast & Dinner; 2 on Day 4: Breakfast).</li>
          <li><strong>Transportation:</strong> AC vehicle for Delhi–Manali–Kasol–Delhi journey.</li>
          <li><strong>Sightseeing:</strong> As per the itinerary.</li>
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
        <li>Follow Team Captain instructions at all times.</li>
        <li>Carry water bottle and stay hydrated.</li>
        <li>Wear sunscreen and sunglasses in Solang Valley.</li>
        <li>Do not litter — keep the mountains clean.</li>
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
export default function ManaliKasolSissuPackage() {
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
    console.log('Manali-Kasol Booking Inquiry:', formData);
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
              Manali – Kasol – Sissu | 3N/4D
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
              Book Your Trip
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
              Experience the best of Himachal in 4 days — from the vibrant streets of <strong>Manali</strong> to the serene <strong>Kasol</strong> and the stunning <strong>Sissu</strong> via the iconic Atal Tunnel. Adventure, culture, and nature await!
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Duration:</strong> 4 Days / 3 Nights
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Route:</strong> Delhi → Manali → Sissu → Kasol → Delhi
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Highlight:</strong> Atal Tunnel Drive
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Best For:</strong> Adventure & Chill
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
              alt="Manali Kasol Sissu"
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
                alt="Manali Kasol Sissu"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
                quality={75}
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">3N/4D Manali – Kasol – Sissu – Paradise Bliss</h3>
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