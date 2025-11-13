'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// Images - Update these with actual images
const heroImage = "/optimised/mcleodganj-bir-tirthan-hero.webp";
const highlightImages = [
  "/optimised/bir-paragliding.webp",
  "/optimised/mcleodganj-temple.webp",
  "/optimised/tirthan-river.webp",
  "/optimised/serolsar-lake.webp",
];
const rightSideImage = "/img/logo.png";

// Quick Facts
const quickFacts = [
  { text: "Bir Billing is one of the world's top paragliding sites with 200+ flyable days." },
  { text: "Tirthan Valley is a UNESCO World Heritage Site and part of the Great Himalayan National Park." },
  { text: "McLeodganj is home to the Dalai Lama and the Tibetan government-in-exile." },
  { text: "Serolsar Lake trek is a 5 km moderate hike with stunning alpine views." },
];

// Itinerary - From .docx
const itinerary = [
  {
    day: "Day 1",
    title: "Departure from Delhi – Arrival in Bir",
    desc: "Evening: Depart from Delhi around 7:00 PM in an AC vehicle. Overnight: Travel overnight to Bir."
  },
  {
    day: "Day 2",
    title: "Bir – Local Sightseeing & Camping",
    desc: "Morning: Arrive in Bir. Activities: Explore Bir Monastery and Chokling Monastery. Visit Bir Tibetan Colony and interact with local artisans. Evening: Set up camp near Billing. Overnight: Camping under the stars near Billing."
  },
  {
    day: "Day 3",
    title: "Paragliding in Bir – Depart for McLeodganj",
    desc: "Morning: Experience paragliding in Bir Billing, one of the world's top paragliding destinations. Afternoon: Depart for McLeodganj. Evening: Arrive and check-in. Overnight: Stay in McLeodganj."
  },
  {
    day: "Day 4",
    title: "McLeodganj Sightseeing – Depart for Tirthan Valley",
    desc: "Morning: Visit Dalai Lama Temple, Bhagsu Waterfall, and Bhagsunath Temple. Afternoon: Explore local markets and enjoy Tibetan cuisine. Evening: Depart for Tirthan Valley. Overnight: Stay in Tirthan Valley."
  },
  {
    day: "Day 5",
    title: "Tirthan Valley – Jalori Pass & Serolsar Lake Trek – River Rafting – Return to Delhi",
    desc: "Morning: Trek to Jalori Pass and onward to Serolsar Lake. Afternoon: Enjoy river rafting in the Beas River. Evening: Depart for Delhi. Overnight: Travel overnight to Delhi."
  },
];

// Highlights
const highlights = [
  { title: "Paragliding in Bir", image: highlightImages[0], desc: "Soar like a bird over the Dhauladhar range." },
  { title: "Dalai Lama Temple", image: highlightImages[1], desc: "Spiritual heart of McLeodganj and Tibetan culture." },
  { title: "Tirthan River", image: highlightImages[2], desc: "Pristine trout-filled waters and serene valleys." },
  { title: "Serolsar Lake Trek", image: highlightImages[3], desc: "Mystical alpine lake surrounded by rhododendrons." },
];

// FAQs - Trip-Specific
const faqs = [
  { question: "Is paragliding safe for beginners?", answer: "Yes! Tandem flights with certified pilots. No prior experience needed. Safety gear and briefing provided." },
  { question: "What is the best time for this trip?", answer: "March–June & September–November. Avoid monsoon (July–Aug) due to landslides." },
  { question: "What type of vehicle is used?", answer: "AC Tempo Traveller or Innova for comfort. Pickup from Delhi (Majnu Ka Tila or RK Ashram)." },
  { question: "Are meals vegetarian?", answer: "Yes, all meals are pure veg. Jain food available on request." },
  { question: "Can I extend my stay in Tirthan?", answer: "Yes! Add extra nights for trout fishing, village walks, or homestay experience." },
  { question: "Is rafting included on Day 5?", answer: "Yes, Grade II–III rafting in Beas River (weather permitting). Life jackets provided." },
  { question: "What to pack?", answer: "Trekking shoes, warm jacket, raincoat, sunscreen, power bank, ID proof, and reusable bottle." },
  { question: "Is the trek to Serolsar Lake difficult?", answer: "Moderate 5 km trek. Suitable for beginners with average fitness. Guide included." },
  { question: "Can kids join?", answer: "Yes, 8+ years. Paragliding: 12+ years (with parental consent)." },
  { question: "What if I miss the Delhi pickup?", answer: "Contact coordinator immediately. Alternate pickup at own cost." },
];

// Important Information - From .docx
const importantInfo = [
  {
    title: "Package Inclusions",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Accommodation:</strong> 1 night camping in Bir, 1 night in McLeodganj, 2 nights in Tirthan Valley (tents/homestays).</li>
          <li><strong>Meals:</strong> 8 meals – Breakfast (Day 1–5), Dinner (Day 2–4).</li>
          <li><strong>Transportation:</strong> AC vehicle Delhi ↔ Bir ↔ McLeodganj ↔ Tirthan ↔ Delhi.</li>
          <li><strong>Activities:</strong> Paragliding (Bir), Serolsar Lake Trek, River Rafting (Beas).</li>
          <li><strong>Guides:</strong> Experienced local trekking and activity guides.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Exclusions",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Personal expenses, tips, shopping.</li>
        <li>Meals/drinks not specified.</li>
        <li>Entry fees, monument tickets.</li>
        <li>5% GST (added at checkout).</li>
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
    title: "Travel Tips",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Carry valid ID and 2 passport photos.</li>
        <li>Keep cash (ATMs limited in Tirthan).</li>
        <li>Respect local culture — no loud music near monasteries.</li>
        <li>Book early for peak season (April–June).</li>
      </ul>
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

export default function McLeodganjBirTirthan() {
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
    console.log('Booking inquiry:', formData);
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
              Paradise Bliss
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              McLeodganj – Bir – Tirthan Valley | 5 Days
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
              Book Your Adventure
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
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed font-sans">
              Fly above the clouds in <strong>Bir Billing</strong>, find peace in <strong>McLeodganj</strong>, and reconnect with nature in the serene <strong>Tirthan Valley</strong>. This 5-day journey blends adventure, culture, and tranquility.
            </p>
            <ul className="space-y-2 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Paragliding + Trekking + Rafting</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 4 Nights Stay + 8 Meals</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> AC Travel from Delhi</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Best Time: Mar–Jun, Sep–Nov</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A]"
            >
              Book Now
            </motion.button>
            <motion.a
              href="tel:+918449000181"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F5A623] text-[#00453A] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#E59400] flex items-center justify-center"
            >
              <AiOutlinePhone className="mr-2" /> Call Us
            </motion.a>
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
                className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-[#00453A] to-[#00332A] text-white hover:from-[#00332A] hover:to-[#00251F] transition-all"
              >
                <span className="font-semibold font-sans">{item.day}: {item.title}</span>
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
            <HighlightCard key={index} highlight={highlight} index={index} variants={itemVariants} />
          ))}
        </motion.div>
      </motion.section>

      {/* Did You Know? */}
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
              alt="Trip Logo"
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
              Get Full Itinerary
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
                alt="McLeodganj Bir Tirthan"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
                quality={75}
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">5-Day Himachal Adventure</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-sans">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-sans">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2" />
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
                <input type="number" name="travellers" value={formData.travellers} onChange={handleInputChange} min="1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2" />
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