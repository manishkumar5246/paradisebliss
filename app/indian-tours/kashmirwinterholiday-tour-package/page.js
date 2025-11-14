'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// === IMAGES (Update with your actual Kashmir winter images) ===
const heroImage = "/optimised/kashmir-winter-hero.webp"; // Snow-covered Dal Lake or Gulmarg
const highlightImages = [
  "/optimised/dal-lake-houseboat.webp",     // Houseboat & Shikara
  "/optimised/gulmarg-gondola-winter.webp", // Gondola in snow
  "/optimised/pahalgam-valley-snow.webp",   // Pahalgam beauty
  "/optimised/sonmarg-winter.webp",         // Sonmarg frozen landscape
];
const rightSideImage = "/img/logo.png";

// === QUICK FACTS ===
const quickFacts = [
  { text: "Kashmir is known as 'Paradise on Earth' – especially breathtaking in winter." },
  { text: "Stay on a traditional houseboat on Dal Lake with Himalayan views." },
  { text: "Gulmarg Gondola is one of the highest cable cars in the world." },
  { text: "Experience fresh snowfall and festive Christmas/New Year celebrations." },
];

// === ITINERARY (Exactly from your document) ===
const itinerary = [
  {
    day: "Day 1",
    title: "Arrival at Srinagar",
    desc: "Arrive at Srinagar airport (preferably before 12 PM). Warm welcome by your Trip Captain and transfer to a charming houseboat on Dal Lake.\nPost check-in, visit the beautiful Mughal Gardens.\nEvening: Enjoy a soothing 1-hour shikara ride on the iconic Dal Lake.\nDinner & overnight stay aboard the houseboat."
  },
  {
    day: "Day 2",
    title: "Srinagar → Gulmarg (~50 km / 2 hrs)",
    desc: "After breakfast, scenic drive to Gulmarg.\nOn arrival, enjoy the Gondola cable car ride (Phase 1 included) to witness panoramic snow-clad vistas.\nEvening at leisure to soak in the winter wonderland.\nDinner & overnight stay in Gulmarg."
  },
  {
    day: "Day 3",
    title: "Gulmarg → Drung Waterfall → Pahalgam (~142 km / 4 hrs)",
    desc: "Depart Gulmarg and visit the scenic frozen Drung Waterfall en route.\nContinue to Pahalgam, check-in at hotel.\nEvening at leisure – stroll along the Lidder River or relax.\nDinner & overnight stay in Pahalgam."
  },
  {
    day: "Day 4",
    title: "Pahalgam Sightseeing → Srinagar",
    desc: "Full day to explore Pahalgam’s beauty – Aru Valley, Betaab Valley, Chandanwadi (local cab included).\nLate afternoon drive back to Srinagar (~90 km / 2 hrs).\nDinner & overnight stay in Srinagar houseboat or hotel."
  },
  {
    day: "Day 5",
    title: "Sonmarg Excursion",
    desc: "After breakfast, full-day excursion to Sonmarg – the 'Meadow of Gold' under snow.\nReturn to Srinagar by evening.\nFestive Christmas / New Year celebration: snacks, music, bonfire & cake (weather permitting).\nDinner & overnight in Srinagar."
  },
  {
    day: "Day 6",
    title: "Departure from Srinagar",
    desc: "After breakfast (time permitting), transfer to Srinagar airport.\nDepart with unforgettable memories of Kashmir’s winter magic."
  },
];

// === HIGHLIGHTS ===
const highlights = [
  { title: "Houseboat Stay & Shikara Ride", image: highlightImages[0], desc: "Live like royalty on a traditional Kashmiri houseboat with a romantic shikara ride." },
  { title: "Gulmarg Gondola (Phase 1)", image: highlightImages[1], desc: "Ride Asia’s highest cable car amidst snow-covered peaks." },
  { title: "Pahalgam Valleys", image: highlightImages[2], desc: "Explore Aru, Betaab Valley & Chandanwadi in winter glory." },
  { title: "Sonmarg Winter Wonderland", image: highlightImages[3], desc: "Witness the frozen beauty of the 'Meadow of Gold'." },
];

// === FAQs (Kashmir Winter Specific) ===
const faqs = [
  { question: "Is Gondola ride guaranteed in winter?", answer: "Phase 1 is included, but operations depend on weather. If closed due to heavy snow, an alternative activity will be arranged." },
  { question: "What clothes should I pack?", answer: "Heavy woollens, thermals, waterproof jacket, snow boots, gloves, cap, sunglasses, moisturizer & lip balm are essential." },
  { question: "Will there be snow during the trip?", answer: "Yes! December–February brings fresh snowfall. Perfect for snow lovers and festive celebrations." },
  { question: "Is the trip suitable for senior citizens or kids?", answer: "Designed for 18–42 yrs, but custom departures can be arranged for families/seniors on request." },
  { question: "What if roads are blocked due to snow?", answer: "Itinerary is flexible. We adjust sequence or provide alternatives in case of roadblocks/weather issues." },
  { question: "Are adventure activities included?", answer: "No. Skiing, sledging, snowmobile, ATV, horse ride are optional and at extra cost." },
  { question: "Is travel insurance included?", answer: "No. We strongly recommend purchasing comprehensive travel insurance." },
  { question: "What meals are provided?", answer: "10 meals total: Dinner on Day 1; Breakfast + Dinner on Days 2–5; Breakfast on Day 6." },
];

// === IMPORTANT INFORMATION ===
const importantInfo = [
  {
    title: "What's Included",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Accommodation on twin/triple sharing basis for 5 nights</li>
        <li>10 meals (as per itinerary)</li>
        <li>All transfers & sightseeing by Tempo Traveller</li>
        <li>Experienced Trip Captain throughout</li>
        <li>1-hour Shikara ride on Dal Lake</li>
        <li>Gondola Cable Car (Phase 1) tickets</li>
        <li>Local cab for Aru, Betaab Valley, Chandanwadi & Drung Waterfall</li>
        <li>All permits, tolls, parking, driver allowance</li>
        <li>First-aid kit</li>
      </ul>
    ),
  },
  {
    title: "What's Not Included",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>5% GST</li>
        <li>Lunches & any meals not mentioned</li>
        <li>Adventure activities (skiing, sledging, snowmobile, horse ride, etc.)</li>
        <li>Airfare / train fare to & from Srinagar</li>
        <li>Monument / garden entry fees unless specified</li>
        <li>Personal expenses & shopping</li>
        <li>Extra costs due to weather delays, roadblocks or flight cancellations</li>
      </ul>
    ),
  },
  {
    title: "Package Cost",
    content: (
      <p className="text-gray-700">
        <strong className="text-xl">Starting from ₹25,499/- per person</strong><br />
        <em>(Twin/Triple sharing | Group size & seasonal surcharges may apply)</em>
      </p>
    ),
  },
  {
    title: "Important Notes",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Itinerary may change due to weather or road conditions</li>
        <li>Guests should arrive before 12 PM on Day 1</li>
        <li>Gondola availability depends on weather</li>
        <li>Wear heavy woollens & snow gear</li>
        <li>Cancellation policy as per company norms</li>
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
export default function WinterKashmirPackage() {
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
    console.log('Winter Kashmir Booking:', formData);
    alert('Thank you! Our team will call you shortly for your Winter Kashmir trip.');
    handleCloseModal();
  }, [formData, handleCloseModal]);

  // Rotating Facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % quickFacts.length);
    }, 3500);
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
              Winter Kashmir Extravaganza
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              6 Days / 5 Nights • Christmas & New Year Special
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
              Book Your Winter Wonderland
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
              Celebrate the festive season amid snow-draped valleys, willow trees, and serene waterways of Kashmir. This special Christmas & New Year edition includes houseboat stays, shikara rides, gondola adventures, and warm hospitality by ParadiseBliss Tours.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Duration:</strong> 6 Days / 5 Nights</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Destinations:</strong> Srinagar → Gulmarg → Pahalgam → Sonmarg</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Price:</strong> Starting ₹25,499 per person</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> <strong>Best For:</strong> Snow, Festive Vibes & Houseboat Experience</li>
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

      {/* Did You Know? + CTA */}
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

      {/* Important Information, FAQs, Modal – all using new data */}
      {/* (Same structure as original – fully functional) */}

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
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
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
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
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
              <Image src={heroImage} alt="Winter Kashmir" width={400} height={128} className="w-full h-32 object-cover rounded-lg" loading="lazy" quality={75} />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Winter Kashmir Extravaganza – 6D/5N</h3>
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