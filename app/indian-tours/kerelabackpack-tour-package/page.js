'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// Kerala Images (Replace these with your actual image paths)
const heroImage = "https://wallpapercave.com/wp/wp2894143.jpg";
const highlightImages = [
  "https://tse1.mm.bing.net/th/id/OIP.kbGsjvf_D3R6ib4xrERfywHaFj?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse2.mm.bing.net/th/id/OIP.e23tMbdJTF5ML7Fudx6wbgHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse1.mm.bing.net/th/id/OIP.3PJTDtzDuNukXzYmRboaQQHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/39/7f/0f/cheeyappara-waterfalls.jpg?w=1800&h=1000&s=1",
];
const rightSideImage = "/img/logo.png"; // Your logo

// Quick Facts
const quickFacts = [
  { text: "Kerala is called 'God's Own Country' for its unmatched natural beauty." },
  { text: "Munnar produces some of the finest tea in the world." },
  { text: "Alleppey backwaters are a UNESCO World Heritage candidate." },
  { text: "Kovalam is famous for its lighthouse beach and Ayurvedic wellness." },
];

// Itinerary – 6 Nights / 7 Days
const itinerary = [
  { day: "Day 1", title: "Arrival Kochi → Munnar (~4 hrs)", desc: "Pick-up from Kochi airport/railway station. Enroute visit Cheeyappara & Valara waterfalls, spice plantations, tea gardens, and Karadippara viewpoint. Check-in at Munnar. Overnight stay." },
  { day: "Day 2", title: "Munnar Sightseeing", desc: "Explore tea estate walks, Mattupetty Dam, Echo Point, Top Station, and optional zip-lining/adventure. Evening at leisure. Overnight in Munnar." },
  { day: "Day 3", title: "Munnar → Alleppey/Kumarakom (~4 hrs)", desc: "Drive to the serene backwaters. Check into homestay or houseboat. Enjoy village life, coconut groves, and sunset views. Overnight in Alleppey/Kumarakom." },
  { day: "Day 4", title: "Alleppey/Kumarakom → Kovalam (~4.5 hrs)", desc: "After breakfast, proceed to Kovalam. Check into beachside stay. Evening beach stroll and relax by the Arabian Sea. Overnight in Kovalam." },
  { day: "Day 5", title: "Kovalam + Trivandrum Sightseeing", desc: "Morning free at Kovalam beach. Later visit Trivandrum – Padmanabhaswamy Temple, Napier Museum, and local beaches. Return to Kovalam. Overnight stay." },
  { day: "Day 6", title: "Leisure Day at Kovalam", desc: "Full day free for beach relaxation, optional Ayurvedic spa, watersports, or local exploration. Overnight in Kovalam." },
  { day: "Day 7", title: "Departure from Trivandrum", desc: "After breakfast, check-out and transfer to Trivandrum airport/railway station. Trip ends with beautiful memories!" },
];

// Highlights
const highlights = [
  { title: "Munnar Tea Gardens", image: highlightImages[0], desc: "Walk through endless emerald plantations in the Western Ghats." },
  { title: "Alleppey Backwaters", image: highlightImages[1], desc: "Peaceful houseboat or village stay surrounded by palm-fringed lakes." },
  { title: "Kovalam Beach", image: highlightImages[2], desc: "Golden sands, lighthouse, and Ayurvedic wellness by the sea." },
  { title: "Cheeyappara Waterfalls", image: highlightImages[3], desc: "Stunning cascading falls on the way to Munnar." },
];

// FAQs – Kerala Specific
const faqs = [
  { question: "What type of accommodation is provided?", answer: "Comfortable mix of hill-station hotels/homestays, backwater homestay or houseboat, and beach stays – all clean and local-flavored." },
  { question: "Is this trip good for solo travelers?", answer: "Yes! Many solo backpackers join. It's safe, social, and perfect for making new friends." },
  { question: "How much walking is involved?", answer: "Moderate walking in Munnar hills and backwater villages. Basic fitness required, nothing extreme." },
  { question: "Are meals included?", answer: "Daily breakfast + some dinners included. Plenty of local eateries for other meals." },
  { question: "What should I pack?", answer: "Light cotton clothes, comfortable shoes, rain jacket (monsoon), sunscreen, hat, mosquito repellent, and swimwear!" },
  { question: "Is travel insurance included?", answer: "No, but we strongly recommend purchasing comprehensive travel insurance." },
  { question: "Can the itinerary change?", answer: "Yes, slightly due to weather, road conditions, or local events – always for your safety and best experience." },
];

// Important Information
const importantInfo = [
  {
    title: "Inclusions & Exclusions",
    content: (
      <div className="space-y-4">
        <div>
          <strong className="block mb-2">What's Included:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>6 nights accommodation on twin-sharing (hotels, homestays, houseboat)</li>
            <li>Daily breakfast + select dinners</li>
            <li>A/C vehicle for all transfers & sightseeing</li>
            <li>All tolls, parking, driver allowance</li>
            <li>Experienced driver cum guide</li>
          </ul>
        </div>
        <div>
          <strong className="block mb-2">What's Not Included:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Flight/train to Kochi & from Trivandrum</li>
            <li>Lunches & meals not mentioned</li>
            <li>Entry fees to monuments/sightseeing spots</li>
            <li>Adventure activities (zip-lining, boating extra, etc.)</li>
            <li>Personal expenses, tips, shopping</li>
            <li>Anything not listed in inclusions</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Price",
    content: (
      <p>
        <strong>Starting from ₹18,999 per person</strong> (twin-sharing)<br />
        <em>Final price depends on travel dates, group size & accommodation category.</em>
      </p>
    ),
  },
  {
    title: "Who Should Join",
    content: (
      <p>
        Perfect for backpackers, solo travelers, couples, and small friend groups who love nature, slow travel, local stays, tea gardens, backwaters, and beach relaxation on a budget.
      </p>
    ),
  },
  {
    title: "Travel Tips",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Pack light – backpacker style!</li>
        <li>Carry valid photo ID at all times</li>
        <li>Dress modestly at temples</li>
        <li>Stay hydrated – Kerala can be humid</li>
        <li>Keep some cash handy (ATMs available)</li>
      </ul>
    ),
  },
];

// Highlight Card Component
const HighlightCard = memo(({ highlight, index, variants }) => (
  <motion.div
    variants={variants}
    whileHover={{ scale: 1.02 }}
    className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
    initial="hidden"
    animate="show"
  >
    <Image src={highlight.image} alt={highlight.title} width={500} height={192} className="w-full h-48 object-cover" loading="lazy" quality={75} />
    <div className="p-5">
      <h3 className="text-lg font-semibold text-[#00453A] font-sans">{highlight.title}</h3>
      <p className="text-sm text-gray-600 mt-2 font-sans">{highlight.desc}</p>
    </div>
    <motion.div whileHover={{ rotate: 180 }} className="absolute top-4 right-4 text-[#F5A623]">
      <AiOutlineStar size={24} />
    </motion.div>
  </motion.div>
));
HighlightCard.displayName = 'HighlightCard';

export default function KeralaBackpackingEscape() {
  const [openDay, setOpenDay] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [openInfo, setOpenInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: null, travellers: '' });
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const toggleDay = useCallback((i) => setOpenDay(prev => prev === i ? null : i), []);
  const toggleFaq = useCallback((i) => setOpenFaq(prev => prev === i ? null : i), []);
  const toggleInfo = useCallback((i) => setOpenInfo(prev => prev === i ? null : i), []);
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
    console.log('Kerala Booking Enquiry:', formData);
    alert('Thank you! We’ll call you shortly for your Kerala Backpacking Escape 🌴');
    handleCloseModal();
  }, [formData, handleCloseModal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % quickFacts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };
  const factVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };

  return (
    <div className="bg-[#F1FDF3] min-h-screen">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-[600px] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#00453A]/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-4 font-serif">
              Kerala Backpacking Escape
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-2xl mb-6 font-sans">
              6 Nights / 7 Days – Hills, Backwaters & Beaches
            </motion.p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleOpenModal}
              className="bg-[#F1FDF3] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl">
              Book Your Escape
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Wave Divider */}
      <div className="relative h-12 bg-[#00453A]">
        <svg className="absolute bottom-0 w-full text-[#F1FDF3]" viewBox="0 0 1440 60">
          <path fill="currentColor" d="M0,0L1440,60H0Z"></path>
        </svg>
      </div>

      {/* Trip Overview */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Trip Overview
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-[#F1FDF3] p-6 rounded-2xl shadow-xl">
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Explore the lush, diverse landscapes of Kerala — from tea plantations and waterfalls in the hills to tranquil backwaters and golden beaches. A true backpacking journey blending nature, culture, and relaxation.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Duration:</strong> 6 Nights / 7 Days</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Route:</strong> Kochi → Munnar → Alleppey → Kovalam → Trivandrum</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Starting From:</strong> ₹18,999 per person</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Vibe:</strong> Relaxed, Nature, Budget-Friendly</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A]">
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Itinerary */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Itinerary
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-4">
          {itinerary.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button onClick={() => toggleDay(i)} className="w-full flex justify-between items-center p-5 text-left bg-gradient-to-r from-[#00453A] to-[#00332A] text-white hover:from-[#00332A] hover:to-[#00251F] transition-all">
                <span className="font-semibold font-sans">{item.day}: {item.title}</span>
                {openDay === i ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              <AnimatePresence>
                {openDay === i && (
                  <motion.div initial={{ maxHeight: 0, opacity: 0 }} animate={{ maxHeight: 500, opacity: 1 }} exit={{ maxHeight: 0, opacity: 0 }} transition={{ duration: 0.4 }}>
                    <div className="p-5 text-gray-700 font-sans">{item.desc}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Highlights */}
      <motion.section initial="hidden" whileInView="show" variants={containerVariants} viewport={{ once: true }} className="max-w-6xl mx-auto px-4 py-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Trip Highlights
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((h, i) => <HighlightCard key={i} highlight={h} index={i} variants={itemVariants} />)}
        </motion.div>
      </motion.section>

      {/* Pricing & Details */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Pricing & Details
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl">
          <div>
            <h3 className="text-2xl font-semibold text-[#00453A] mb-4 font-sans">Package Cost (Per Person)</h3>
            <div className="text-4xl font-bold text-[#00453A]">₹18,999 onwards</div>
            <p className="text-sm text-gray-600 mt-2 font-sans">Best price for early booking & groups</p>
            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Key Inclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 6 nights accommodation (sharing)</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Breakfast + select dinners</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> A/C vehicle throughout</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> All tolls & parking</li>
            </ul>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-sm bg-white border-2 border-dashed border-[#00453A] rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-semibold text-[#00453A] mb-3 flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Did You Know?</h4>
              <AnimatePresence mode="wait">
                <motion.div key={currentFactIndex} variants={factVariants} initial="hidden" animate="show" exit="exit" className="text-gray-700 font-sans">
                  {quickFacts[currentFactIndex].text}
                </motion.div>
              </AnimatePresence>
            </div>
            <Image src={rightSideImage} alt="Logo" width={150} height={150} className="object-contain" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-8 py-3 rounded-full font-semibold shadow-lg w-full max-w-xs">
              Request Callback
            </motion.button>
            <motion.a href="tel:+918449000181" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-[#F5A623] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg flex items-center justify-center w-full max-w-xs">
              <AiOutlinePhone className="mr-2" /> Call Us
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Important Information */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Important Information
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-4">
          {importantInfo.map((info, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-[#E4DECF] border-l-4 border-[#F5A623] rounded-r-lg shadow-md hover:shadow-lg transition-shadow">
              <button onClick={() => toggleInfo(i)} className="w-full flex justify-between items-center p-5 text-left bg-[#E4DECF] text-[#00453A] font-semibold font-sans">
                <span>{info.title}</span>
                {openInfo === i ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              <AnimatePresence>
                {openInfo === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="p-5 text-gray-700 font-sans">{info.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQs */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Frequently Asked Questions
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-[#E4DECF] border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => toggleFaq(i)} className="w-full flex items-center p-4 text-left">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#F5A623] text-white rounded-full font-semibold mr-3">{i + 1}</span>
                <span className="flex-1 text-[#00453A] font-semibold font-sans text-lg">{faq.question}</span>
                {openFaq === i ? <AiOutlineUp className="text-[#00453A]" /> : <AiOutlineDown className="text-[#00453A]" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
            <div className="mb-4">
              <Image src={heroImage} alt="Kerala" width={400} height={128} className="w-full h-32 object-cover rounded-lg" />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Kerala Backpacking Escape – 6N/7D</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" value={formData.name} onChange={handleInputChange} required placeholder="Name" className="w-full px-4 py-2 border rounded-md focus:border-[#00453A]" />
              <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required placeholder="Phone" className="w-full px-4 py-2 border rounded-md focus:border-[#00453A]" />
              <div className="relative">
                <DatePicker selected={formData.date} onChange={handleDateChange} minDate={new Date()} dateFormat="dd/MM/yyyy" required placeholderText="Preferred Date" className="w-full px-4 py-2 border rounded-md" />
                <AiOutlineCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <input name="travellers" type="number" min="1" value={formData.travellers} onChange={handleInputChange} required placeholder="No. of Travellers" className="w-full px-4 py-2 border rounded-md" />
              <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-[#F5A623] text-[#00453A] rounded-full font-semibold shadow-lg">
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