'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// === IMAGES (Update with your actual Kasol-Tosh images) ===
const heroImage = "https://www.adventurush.com/wp-content/uploads/2022/08/Copy-of-IMG_1250.jpg"; // Parvati Valley or Tosh village in snow
const highlightImages = [
  "https://images.picxy.com/cache/2020/10/19/5e9cfe337abde5871f4f6c7f04778baa.jpg",         // Kasol Market & Cafés
  "https://himachalstay.in/wp-content/uploads/2024/10/Trekking-in-Tosh.jpg",          // Chalal Village Trek
  "https://thumbs.dreamstime.com/b/door-tosh-hovli-palace-khiva-uzbekistan-high-quality-photo-door-tosh-hovli-palace-khiva-uzbekistan-282230183.jpg",         // Tosh Village
  "https://toshregency.com/images/attraction/at10.webp",       // Tosh Waterfall
];
const rightSideImage = "/img/logo.png";

// === QUICK FACTS ===
const quickFacts = [
  { text: "Kasol is known as the 'Mini Israel of India' for its vibrant Israeli culture." },
  { text: "Tosh is a hidden gem at 7,900 ft with stunning Himalayan views." },
  { text: "The trek from Barshaini to Tosh is just 2.5 km — perfect for beginners." },
  { text: "Manikaran Gurudwara is famous for its natural hot springs." },
];

// === ITINERARY (Exactly from your document) ===
const itinerary = [
  {
    day: "Day 1",
    title: "Departure from Delhi – Overnight Journey",
    desc: "Evening: Depart from Delhi around 6:00 PM in a comfortable AC Volvo/Semi-Sleeper.\nOvernight journey to Kasol with music, movies, and rest stops."
  },
  {
    day: "Day 2",
    title: "Arrival in Kasol – Hike to Chalal Village",
    desc: "Morning: Arrive in Kasol and check into your hotel.\nFreshen up and explore the vibrant Kasol Market.\nCafé hopping at famous spots like Evergreen Café, Jim Morrison Café, etc.\nAfternoon: Short & easy hike to Chalal Village (3 km round trip) along the Parvati River.\nEvening: Return to Kasol, bonfire (weather permitting), and leisure time.\nOvernight stay in Kasol hotel."
  },
  {
    day: "Day 3",
    title: "Tosh Village Trek – Waterfall & Manikaran – Return Journey",
    desc: "Morning: After breakfast, drive to Barshaini (2 hours).\nBegin the scenic trek to Tosh Village (~2.5 km uphill, easy-moderate).\nExplore Tosh Village, visit the beautiful Tosh Waterfall.\nCafé hopping in Tosh and soak in the hippie vibes.\nAfternoon: Trek back and drive to Kasol.\nVisit Manikaran Gurudwara & natural hot springs.\nEvening: Depart from Kasol to Delhi by AC Volvo.\nOvernight journey."
  },
  {
    day: "Day 4",
    title: "Arrival in Delhi",
    desc: "Morning: Arrive back in Delhi with amazing memories of the Parvati Valley!"
  },
];

// === HIGHLIGHTS ===
const highlights = [
  { title: "Kasol Market & Cafés", image: highlightImages[0], desc: "Vibrant streets, Israeli food, and chill cafés." },
  { title: "Chalal Village Trek", image: highlightImages[1], desc: "Easy 3 km riverside hike through pine forests." },
  { title: "Tosh Village Experience", image: highlightImages[2], desc: "Hippie vibes, stunning views & local culture." },
  { title: "Tosh Waterfall", image: highlightImages[3], desc: "Hidden waterfall near Tosh village." },
];

// === FAQs ===
const faqs = [
  { question: "Is this trek suitable for beginners?", answer: "Yes! The treks to Chalal and Tosh are short and easy to moderate. Perfect for first-timers." },
  { question: "What kind of accommodation is provided?", answer: "1 night in a comfortable hotel in Kasol + 1 night in a cozy homestay in Tosh (Triple/Quad sharing)." },
  { question: "Are meals included?", answer: "Yes — 4 meals: Breakfast on Day 2 & 3, Dinner on Day 2, and Breakfast on Day 3." },
  { question: "What type of transport is used?", answer: "AC Volvo/Semi-Sleeper from Delhi to Delhi. Local taxi from Kasol to Barshaini and back." },
  { question: "Do I need to carry trekking gear?", answer: "Good trekking shoes, warm jacket, water bottle, and sunglasses are recommended. No heavy gear needed." },
  { question: "Is bonfire included?", answer: "Yes, subject to weather and homestay/hotel permission." },
  { question: "Can we extend stay in Kasol or Tosh?", answer: "Yes! Extra nights can be arranged at additional cost." },
  { question: "Is travel insurance included?", answer: "No, but we recommend purchasing personal travel insurance." },
];

// === IMPORTANT INFORMATION ===
const importantInfo = [
  {
    title: "What's Included",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Accommodation: 1 night hotel in Kasol + 1 night homestay in Tosh (Triple/Quad sharing)</li>
        <li>Meals: 4 meals (Breakfast Day 2 & 3, Dinner Day 2, Breakfast Day 3)</li>
        <li>Transportation: AC Volvo Delhi ↔ Delhi + local cabs</li>
        <li>Team Captain throughout the trip</li>
        <li>All tolls, permits & parking charges</li>
      </ul>
    ),
  },
  {
    title: "What's Not Included",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Personal expenses (shopping, tips, etc.)</li>
        <li>Any adventure activities (paragliding, etc.)</li>
        <li>Meals/drinks other than specified</li>
        <li>Entry tickets or fees at any location</li>
        <li>Anything not mentioned in inclusions</li>
      </ul>
    ),
  },
  {
    title: "Best Time to Travel",
    content: (
      <p className="text-gray-700">
        <strong>Throughout the year!</strong><br />
        • Summer (Apr–Jun): Pleasant weather, green valleys<br />
        • Monsoon (Jul–Aug): Lush greenery, fewer crowds<br />
        • Winter (Dec–Feb): Possible snowfall in Tosh
      </p>
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
export default function KasolToshTrekPackage() {
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
    console.log('Kasol-Tosh Booking:', formData);
    alert('Thank you! Our team will contact you soon for your Kasol-Tosh Trek!');
    handleCloseModal();
  }, [formData, handleCloseModal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % quickFacts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
  const factVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };

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
              Kasol – Tosh Trek
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              3 Days / 2 Nights • Parvati Valley Adventure
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
              Book Your Trek Now
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
      <motion.section className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Trip Overview
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-[#F1FDF3] p-6 rounded-2xl shadow-xl">
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Escape to the magical Parvati Valley! This weekend trek takes you through the hippie town of Kasol, a peaceful hike to Chalal, and the dreamy village of Tosh with its stunning waterfall and mountain views.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Duration:</strong> 3 Days / 2 Nights</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Destinations:</strong> Kasol → Chalal → Tosh → Manikaran</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Difficulty:</strong> Easy to Moderate</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Best For:</strong> Weekend Getaway, First Trek</li>
            </ul>
          </div>
          <div className="flex items-center justify-center mt-6 md:mt-0">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A]">
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Itinerary */}
      <motion.section className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Detailed Itinerary
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-4">
          {itinerary.map((item, index) => (
            <motion.div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
      <motion.section initial="hidden" whileInView="show" variants={containerVariants} viewport={{ once: true, amount: 0.2 }} className="max-w-6xl mx-auto px-4 py-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Trip Highlights
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} index={index} variants={itemVariants} />
          ))}
        </motion.div>
      </motion.section>

      {/* Did You Know + CTA */}
      <motion.section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl">
          <div>
            <h3 className="text-2xl font-semibold text-[#00453A] mb-4 font-sans flex items-center">
              <AiOutlineStar className="text-[#F5A623] mr-2" /> Did You Know?
            </h3>
            <AnimatePresence mode="wait">
              <motion.p key={currentFactIndex} variants={factVariants} initial="hidden" animate="show" exit="exit" className="text-gray-700 font-sans text-base leading-relaxed">
                {quickFacts[currentFactIndex].text}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image src={rightSideImage} alt="ParadiseBliss Logo" width={150} height={150} className="object-contain" loading="lazy" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A] w-full max-w-xs">
              Get Free Quote
            </motion.button>
            <motion.a href="tel:+918449000181" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-[#F5A623] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#E59400] w-full max-w-xs flex items-center justify-center">
              <AiOutlinePhone className="mr-2" /> Call Expert
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Important Information */}
      <motion.section className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Important Information
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-4">
          {importantInfo.map((info, index) => (
            <motion.div key={index} className="bg-[#E4DECF] border-l-4 border-[#F5A623] rounded-r-lg shadow-md hover:shadow-lg transition-shadow">
              <button onClick={() => toggleInfo(index)} className="w-full flex justify-between items-center p-5 text-left bg-[#E4DECF] text-[#00453A] font-semibold font-sans">
                <span>{info.title}</span>
                {openInfo === index ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              <AnimatePresence initial={false}>
                {openInfo === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
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
      <motion.section className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Frequently Asked Questions
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div key={index} className="bg-[#E4DECF] border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => toggleFaq(index)} className="w-full flex items-center p-4 text-left">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#F5A623] text-white rounded-full font-semibold mr-3">
                  {index + 1}
                </span>
                <span className="flex-1 text-[#00453A] font-semibold font-sans text-lg">{faq.question}</span>
                {openFaq === index ? <AiOutlineUp className="text-[#00453A]" /> : <AiOutlineDown className="text-[#00453A]" />}
              </button>
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-4 pb-4 pt-2 text-gray-700 font-sans text-sm">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Booking Modal */}
      {isModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleCloseModal}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">×</button>
            <div className="mb-4">
              <Image src={heroImage} alt="Kasol Tosh Trek" width={400} height={128} className="w-full h-32 object-cover rounded-lg" loading="lazy" quality={75} />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Kasol – Tosh Trek • 3 Days</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 font-sans">Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700 font-sans">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700 font-sans">Preferred Date</label>
                <div className="relative">
                  <DatePicker selected={formData.date} onChange={handleDateChange} dateFormat="dd/MM/yyyy" minDate={new Date()} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2" placeholderText="Select date" required />
                  <AiOutlineCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 font-sans">No. of Travellers</label><input type="number" name="travellers" value={formData.travellers} onChange={handleInputChange} min="1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A] px-3 py-2" /></div>
              <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-3 bg-[#F5A623] text-[#00453A] rounded-full font-semibold shadow-lg hover:shadow-xl">
                Submit Request
              </motion.button>
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