'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, memo } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

// Images (replace with your actual optimized asset paths)
const heroImage = "/optimised/keralaromenticheaven4.jpg"; // lush backwater / houseboat hero
const highlightImages = [
  "https://www.holidify.com/images/cmsuploads/compressed/Munnar66_20171216205538.jpg",
  "https://tse4.mm.bing.net/th/id/OIP.pgt2tG9qknNl4xiMLgBVpAHaFc?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://alleppeyhouseboatclub.com/wp-content/uploads/2023/10/5-Bedroom-Luxury-Houseboat-in-Alleppey-16.jpg",
  "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/c8/c3/12.jpg",
];
const rightSideImage = "/img/kerala-logo.png"; // small logo or icon

// Quick Facts about Kerala Honeymoon
const quickFacts = [
  { text: "Kerala — the 'God's Own Country' — is famed for its serene backwaters, tea-clad hills and spice gardens." },
  { text: "Munnar is renowned for rolling tea plantations and cool misty vistas." },
  { text: "Thekkady offers spice plantations and wildlife experiences at Periyar." },
  { text: "Alleppey (Alappuzha) is famous for romantic houseboat stays on tranquil backwaters." },
];

// Itinerary data - Lavish Kerala Honeymoon Getaway (5 Days / 4 Nights)
const itinerary = [
  {
    day: "Day 1",
    title: "Arrival Kochi → Transfer to Munnar",
    desc: "Pick-up from Kochi Airport/Railway Station and a scenic drive to Munnar with photo-stops en route. Check-in at a premium resort, relax and enjoy the misty evening at the property."
  },
  {
    day: "Day 2",
    title: "Munnar Sightseeing",
    desc: "Explore tea plantations, viewpoints and waterfalls. Visit a tea factory and enjoy golden-hour views. Evening at leisure — perfect for a romantic resort dinner."
  },
  {
    day: "Day 3",
    title: "Munnar → Thekkady",
    desc: "After breakfast, depart for Thekkady. Explore spice plantations, enjoy a cultural performance or a nature walk. Overnight stay in Thekkady."
  },
  {
    day: "Day 4",
    title: "Thekkady → Alleppey (Houseboat Stay)",
    desc: "Transfer to Alleppey post-breakfast and check in to a traditional houseboat or luxury waterfront accommodation. Drift through backwaters, enjoy freshly prepared meals and spend a tranquil night aboard."
  },
  {
    day: "Day 5",
    title: "Departure from Kochi",
    desc: "After breakfast, transfer from Alleppey to Kochi for onward journey. Cherish memories and request add-ons or extensions if you'd like to stay longer."
  },
];

// Highlights data - Kerala
const highlights = [
  { title: "Tea Gardens of Munnar", image: highlightImages[0], desc: "Verdant hillscapes, tea walks and cool mountain air — perfect for couples." },
  { title: "Spices & Wildlife in Thekkady", image: highlightImages[1], desc: "Spice plantations, guided nature walks and optional boat safari at Periyar." },
  { title: "Houseboat on Alleppey Backwaters", image: highlightImages[2], desc: "Romantic houseboat cruise with private meals and serene canals." },
  { title: "Heritage Kochi", image: highlightImages[3], desc: "Colonial lanes, Chinese fishing nets and boutique cafes." },
];

// FAQ data - Tailored for Kerala honeymoon
const faqs = [
  { question: "What does the package include?", answer: "4 nights’ accommodation (2 nights in Munnar, 1 in Thekkady, 1 in Alleppey), breakfasts from Day 2–Day 5, private transfers per itinerary, airport pickup in Kochi, and all tolls/fees as listed." },
  { question: "Are meals included?", answer: "Breakfasts are included from Day 2 to Day 5. Lunches and dinners are excluded unless specified as part of a specific hotel or houseboat meal plan." },
  { question: "Is the houseboat private?", answer: "Yes — the standard package includes a private houseboat or private waterfront accommodation for the Alleppey night. Specify preferences at booking." },
  { question: "Do I need any ID or documents?", answer: "Valid photo ID (passport/Aadhaar/driver’s license) is required at check-in for all hotels and accommodations." },
  { question: "Can the itinerary be customized?", answer: "Yes, upgrades and customisations (private dinners, spa, extended stays) can be arranged at additional cost." },
  { question: "What is the cancellation policy?", answer: "Standard ParadiseBliss Tours cancellation policy applies — dates and refund slabs are provided at booking. Early cancellations may get partial or full refunds depending on timing." },
];

// Important Information data - Inclusions / Exclusions / Notes
const importantInfo = [
  {
    title: "Inclusions",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li>4 nights’ accommodation: 2 nights in Munnar, 1 night in Thekkady, 1 night in Alleppey (houseboat or waterfront stay).</li>
          <li>Breakfast from Day 2 to Day 5.</li>
          <li>Private transfers & vehicle for inter-city travel as per itinerary (pickup from Kochi).</li>
          <li>All tolls, parking fees, driver allowances and fuel charges.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Exclusions",
    content: (
      <div>
        <ul className="list-disc pl-5 space-y-1">
          <li>Air / train travel to/from Kochi.</li>
          <li>Lunches, dinners (unless specified), entry fees, and optional activities.</li>
          <li>Personal expenses like tips, laundry, beverages, and shopping.</li>
          <li>5% GST and any additional costs due to weather or route changes.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Price & Booking Notes",
    content: (
      <p>
        <strong>Starting Price (Per Person):</strong> ₹[Insert Starting Price] (price varies by travel dates, room category & availability).<br />
        <em>Contact us for exact pricing, room upgrades, and private arrangements.</em>
      </p>
    ),
  },
  {
    title: "Important Notes",
    content: (
      <div>
        <ul className="list-disc pl-5 space-y-1">
          <li>Itinerary may be modified due to local conditions (weather, road closures, etc.).</li>
          <li>Accommodation upgrades and private meals can be arranged on request.</li>
          <li>Valid photo ID proof required at check-in.</li>
          <li>Standard cancellation / date-change policy of ParadiseBliss Tours applies.</li>
        </ul>
      </div>
    ),
  },
];

// Memoized Highlight Card Component
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
      <h3 className="text-lg font-semibold text-[#0B5E3B] font-sans">{highlight.title}</h3>
      <p className="text-sm text-gray-600 mt-2 font-sans">{highlight.desc}</p>
    </div>
    <motion.div
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3 }}
      className="absolute top-4 right-4 text-[#F59E0B]"
    >
      <AiOutlineStar size={24} />
    </motion.div>
  </motion.div>
));
HighlightCard.displayName = 'HighlightCard';

export default function KeralaHoneymoonPackage() {
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
    // Replace with actual submit logic (API call / lead capture)
    console.log('Kerala booking request submitted:', formData);
    handleCloseModal();
  }, [formData, handleCloseModal]);

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
    <div className="bg-[#F8FFF7] min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[560px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#0B5E3B]/20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-3 font-serif"
            >
              Lavish Kerala Honeymoon Getaway
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-md md:text-xl mb-5 font-sans"
            >
              5 Days / 4 Nights — Kochi → Munnar → Thekkady → Alleppey → Kochi
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#F8FFF7] text-[#0B5E3B] px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl"
            >
              Enquire / Book
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Divider */}
      <div className="relative h-12 bg-[#0B5E3B]">
        <svg className="absolute bottom-0 w-full text-[#F8FFF7]" viewBox="0 0 1440 60">
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
          className="text-3xl md:text-4xl font-bold text-[#0B5E3B] text-center mb-8 font-serif relative"
        >
          Trip Overview
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F59E0B]"></span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-[#F8FFF7] p-6 rounded-2xl shadow-xl"
        >
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Indulge in a romantic and refined 5-day honeymoon across Kerala’s best-loved destinations — from misty hill stations to tranquil houseboats. Perfect for newlyweds seeking relaxation, scenic beauty, and intimate experiences.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F59E0B] mr-2 flex-shrink-0" />
                <strong className="mr-1">Duration:</strong> 5 Days / 4 Nights
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F59E0B] mr-2 flex-shrink-0" />
                <strong className="mr-1">Destinations:</strong> Kochi → Munnar → Thekkady → Alleppey → Kochi
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F59E0B] mr-2 flex-shrink-0" />
                <strong className="mr-1">Group:</strong> Private / Couple-friendly experiences
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#0B5E3B] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#08492f] transition-colors"
            >
              Request Pricing
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
        className="max-w-5xl mx-auto px-4 py-12 relative"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#0B5E3B] text-center mb-8 font-serif relative"
        >
          Itinerary
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F59E0B]"></span>
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
                className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-[#0B5E3B] to-[#08492f] text-white transition-all hover:from-[#08492f] hover:to-[#06371f]"
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
                    <div className="p-5 text-gray-700 font-sans">
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
          className="text-3xl md:text-4xl font-bold text-[#0B5E3B] text-center mb-10 font-serif relative"
        >
          Trip Highlights
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F59E0B]"></span>
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

      {/* Pricing & Inclusions */}
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
          className="text-3xl md:text-4xl font-bold text-[#0B5E3B] text-center mb-8 font-serif relative"
        >
          Pricing & Details
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F59E0B]"></span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F8FFF7] p-8 rounded-2xl shadow-xl relative"
        >
          <div>
            <h3 className="text-2xl font-semibold text-[#0B5E3B] mb-4 font-sans">Pricing</h3>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-[#0B5E3B]">₹[Insert Starting Price]</span>
              <span className="text-sm text-gray-500"> (Per person — varies by season & room)</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-sans">Contact us for exact quotes, room upgrades and private arrangements.</p>

            <h3 className="text-2xl font-semibold text-[#0B5E3B] mt-6 mb-4 font-sans">Key Inclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F59E0B] mr-2" /> 4 nights accommodation across Munnar, Thekkady & Alleppey</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F59E0B] mr-2" /> Breakfasts from Day 2–Day 5</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F59E0B] mr-2" /> Private transfers, tolls & driver allowances</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F59E0B] mr-2" /> Houseboat stay or waterfront accommodation in Alleppey</li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2 space-y-4">
            <div className="w-full max-w-sm bg-white border-2 border-dashed border-[#0B5E3B] rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-semibold text-[#0B5E3B] font-sans mb-3 flex items-center">
                <AiOutlineStar className="text-[#F59E0B] mr-2" /> Did You Know?
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
              alt="Kerala Icon"
              width={150}
              height={150}
              className="object-cover"
              loading="lazy"
              quality={75}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#0B5E3B] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#08492f] transition-colors w-full max-w-xs"
            >
              Request Callback
            </motion.button>
            <motion.a
              href="tel:+918449000181"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F59E0B] text-[#0B5E3B] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#e08a00] transition-colors w-full max-w-xs flex items-center justify-center"
            >
              <AiOutlinePhone className="mr-2" /> Call Us
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
          className="text-3xl md:text-4xl font-bold text-[#0B5E3B] text-center mb-8 font-serif relative"
        >
          Important Information
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F59E0B]"></span>
        </motion.h2>
        <div className="space-y-4">
          {importantInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#FFF9F0] border-l-4 border-[#F59E0B] rounded-r-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleInfo(index)}
                className="w-full flex justify-between items-center p-5 text-left bg-[#FFF9F0] text-[#0B5E3B] font-semibold font-sans"
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
          className="text-3xl md:text-4xl font-bold text-[#0B5E3B] text-center mb-8 font-serif relative"
        >
          Frequently Asked Questions
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F59E0B]"></span>
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#FFF9F0] border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center p-4 text-left"
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#F59E0B] text-white rounded-full font-semibold mr-3">
                  {index + 1}
                </span>
                <span className="flex-1 text-[#0B5E3B] font-semibold font-sans text-lg">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <AiOutlineUp className="text-[#0B5E3B]" />
                ) : (
                  <AiOutlineDown className="text-[#0B5E3B]" />
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

      {/* Booking Form Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="mb-4">
              <Image
                src={heroImage}
                alt="Kerala Honeymoon"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
                quality={75}
              />
              <h3 className="mt-3 text-lg font-bold text-[#0B5E3B] font-sans">Lavish Kerala Honeymoon Getaway - ParadiseBliss Tours</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B5E3B] focus:ring-[#0B5E3B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B5E3B] focus:ring-[#0B5E3B]"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B5E3B] focus:ring-[#0B5E3B]"
                      placeholderText="Select date"
                      required
                    />
                    <AiOutlineCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-sans">Number of Travellers</label>
                  <input
                    type="number"
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleInputChange}
                    min="1"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B5E3B] focus:ring-[#0B5E3B]"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-[#F59E0B] text-[#0B5E3B] rounded-full font-semibold shadow-lg hover:shadow-xl transition-colors"
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
        .-rotate-2 { transform: rotate(-2deg); }
      `}</style>
    </div>
  );
}
