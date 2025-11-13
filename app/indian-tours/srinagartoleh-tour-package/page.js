'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// Updated images for Srinagar to Leh Bike Trip (replace with actual image paths)
const heroImage = "/optimised/srinagar-leh-bike-hero.jpg";
const highlightImages = [
  "/optimised/zoji-la-pass.webp",
  "/optimised/pangong-lake.jpeg",
  "/optimised/khardung-la.jpg",
  "/optimised/lamayuru-monastery.png",
];
const rightSideImage = "/img/logo.png";

// Quick Facts about Srinagar to Leh Bike Trip
const quickFacts = [
  { text: "Zoji La Pass at 11,575 ft connects Kashmir Valley with Ladakh." },
  { text: "Khardung La is one of the highest motorable passes in the world at 17,582 ft." },
  { text: "Pangong Tso is a high-altitude saltwater lake that changes colors throughout the day." },
  { text: "The route passes through Drass, the second coldest inhabited place on Earth." },
];

// Itinerary data - Updated for 8-Day Srinagar to Leh Bike Trip
const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Srinagar",
    desc: "Arrive in Srinagar and check-in at the hotel or houseboat. Meet your fellow riders and tour captain for briefing and bike allocation. Spend the evening exploring Dal Lake or local markets. Overnight stay in Srinagar."
  },
  {
    day: "Day 2",
    title: "Srinagar to Kargil (Approx. 200 km)",
    desc: "Begin the ride towards Kargil after breakfast. Cross the scenic Sonmarg Valley and the legendary Zoji La Pass (11,575 ft). Visit Drass, the second coldest inhabited place in the world, and the Kargil War Memorial. Arrive in Kargil by evening and rest overnight."
  },
  {
    day: "Day 3",
    title: "Kargil to Leh (Approx. 220 km)",
    desc: "Ride through Mulbekh, Namika La, and Fotu La Pass (13,479 ft). Stop at the ancient Lamayuru Monastery and admire its moon-like landscape. Continue towards Leh, passing magnetic hill and the confluence of Indus & Zanskar Rivers. Check-in at Leh hotel and rest."
  },
  {
    day: "Day 4",
    title: "Leh Local Sightseeing",
    desc: "Visit top attractions in Leh: Shanti Stupa, Leh Palace, and Thiksey Monastery. Explore the bustling Leh Market and local cafes. Prepare for the next leg of your journey. Overnight stay in Leh."
  },
  {
    day: "Day 5",
    title: "Leh to Nubra Valley via Khardung La (Approx. 130 km)",
    desc: "Ride through the world-famous Khardung La Pass (17,582 ft). Descend into the stunning Nubra Valley — a cold desert with sand dunes and Bactrian camels. Visit Diskit Monastery and enjoy a short camel ride (optional). Overnight stay in Hunder/Nubra."
  },
  {
    day: "Day 6",
    title: "Nubra Valley to Pangong Tso (Approx. 160 km)",
    desc: "Ride via the scenic Shyok Valley route to the mesmerizing Pangong Lake (14,270 ft). Marvel at the changing shades of blue and green in the world’s highest saltwater lake. Dinner and overnight stay at Pangong."
  },
  {
    day: "Day 7",
    title: "Pangong Tso to Leh (Approx. 160 km)",
    desc: "Wake up early to catch the sunrise over the lake. Ride back to Leh via Chang La Pass (17,590 ft), one of the highest motorable passes in the world. En-route visit Shey Palace and Hemis Monastery. Return to Leh and rest overnight."
  },
  {
    day: "Day 8",
    title: "Departure from Leh",
    desc: "After breakfast, bid farewell to Leh. Trip ends with unforgettable memories and new friendships."
  },
];

// Highlights data - Updated for Srinagar to Leh Bike Trip
const highlights = [
  { title: "Zoji La & Kargil Memorial", image: highlightImages[0], desc: "Thrilling high pass and tribute to Kargil War heroes." },
  { title: "Pangong Tso Lake", image: highlightImages[1], desc: "Stunning high-altitude lake with ever-changing colors." },
  { title: "Khardung La Pass", image: highlightImages[2], desc: "World’s highest motorable road at 17,582 ft." },
  { title: "Lamayuru Monastery", image: highlightImages[3], desc: "Ancient 'Moonland' monastery in surreal landscape." },
];

// FAQ data - Tailored for Srinagar to Leh Bike Trip
const faqs = [
  { question: "What is the group size?", answer: "Small groups of 8–15 riders for safety, camaraderie, and personalized support." },
  { question: "Do I need a bike license?", answer: "Yes, a valid motorcycle license is mandatory. International riders need an IDP." },
  { question: "Is travel insurance included?", answer: "No, but mandatory. Must cover high-altitude biking, medical evacuation, and trip cancellation." },
  { question: "What is the accommodation standard?", answer: "Comfortable hotels, guesthouses, and Swiss camps with attached bathrooms where possible." },
  { question: "Can I ride pillion?", answer: "Yes, pillion riders are welcome. Helmets and safety gear provided." },
  { question: "What is the best time to go?", answer: "June to September — roads are open and weather is favorable." },
  { question: "Are permits included?", answer: "Yes, Inner Line Permits (ILP) and environmental fees are included." },
  { question: "What about altitude sickness?", answer: "We follow gradual acclimatization. Oxygen cylinders and first-aid available." },
  { question: "Is the backup vehicle always with us?", answer: "Yes, it carries luggage, spare parts, and supports in case of breakdown." },
  { question: "What is the cancellation policy?", answer: "Full refund minus fees if canceled 45+ days prior. No refund within 15 days." },
];

// Important Information data - Adapted for Srinagar to Leh Bike Trip
const importantInfo = [
  {
    title: "Inclusions & Exclusions",
    content: (
      <div className="space-y-4">
        <div>
          <strong className="block mb-2">What's Included:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Royal Enfield bike (350cc/500cc/Classic/Himalayan) with fuel.</li>
            <li>Accommodation on double/triple sharing basis (hotel/camp/guesthouse).</li>
            <li>Breakfast and dinner as per itinerary.</li>
            <li>Backup vehicle for luggage and mechanical support.</li>
            <li>Experienced road captain and mechanic.</li>
            <li>Helmets for riders and pillion.</li>
            <li>Inner line permits and environmental fees.</li>
            <li>All applicable taxes.</li>
          </ul>
        </div>
        <div>
          <strong className="block mb-2">What's Not Included:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Airfare/train fare to and from Srinagar/Leh.</li>
            <li>Lunch and personal beverages.</li>
            <li>Security deposit for bike.</li>
            <li>Cost of spare parts used due to rider damage.</li>
            <li>Travel insurance, medical expenses, and evacuation charges.</li>
            <li>Anything not mentioned under inclusions.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Price & Batches",
    content: (
      <p>
        <strong>Starting Price:</strong> ₹32,999 (Rider) | ₹24,999 (Pillion)<br />
        <em>Batches: June to September | Early booking recommended.</em>
      </p>
    ),
  },
  {
    title: "Who Should Join & Trip Vibe",
    content: (
      <p>
        For adventure enthusiasts, seasoned riders, and thrill-seekers ready to conquer high passes and rugged terrain. A brotherhood on wheels — raw, real, and unforgettable.
      </p>
    ),
  },
  {
    title: "Travel Tips",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Carry warm layers — weather can change suddenly at high altitudes.</li>
        <li>Stay hydrated and avoid alcohol for the first 48 hours to prevent AMS.</li>
        <li>Always wear protective gear while riding.</li>
        <li>Carry basic medicines and sunscreen.</li>
        <li>Respect local culture and avoid littering.</li>
        <li>Keep digital copies of ID proof and permits handy.</li>
      </ul>
    ),
  },
];

// Memoized Highlight Card Component (unchanged)
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

export default function SrinagarLehBikeTrip() {
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
    console.log('Form submitted:', formData);
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
              Srinagar to Leh Bike Trip
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              Paradise Bliss Tours – 8 Days of High-Altitude Adventure
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
              Book Your Ride
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
              The Srinagar to Leh route is one of the most thrilling and scenic bike expeditions in India. Ride through high-altitude passes, rugged mountains, and surreal landscapes — from lush Kashmir to the cold desert of Ladakh.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Duration:</strong> 8 Days / 7 Nights
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Route:</strong> Srinagar → Kargil → Leh → Nubra → Pangong → Leh
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Price:</strong> ₹32,999 (Rider)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Vibe:</strong> Adventure, brotherhood, high-altitude
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
          Itinerary
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
          className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative"
        >
          Pricing & Details
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl relative"
        >
          <div>
            <h3 className="text-2xl font-semibold text-[#00453A] mb-4 font-sans">Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Rider (Own Bike):</span>
                <span className="font-bold text-[#00453A]">₹28,999</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Rider (RE 350cc/500cc):</span>
                <span className="font-bold text-[#00453A]">₹32,999</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pillion:</span>
                <span className="font-bold text-[#00453A]">₹24,999</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-sans">June–Sept batches | Limited seats</p>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Key Inclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Royal Enfield + Fuel</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 7 nights accommodation</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Breakfast & dinner</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Backup vehicle & mechanic</li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2 space-y-4">
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
              alt="Srinagar to Leh Icon"
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
              className="bg-[#00453A] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A] transition-colors w-full max-w-xs"
            >
              Request Callback
            </motion.button>
            <motion.a
              href="tel:+918449000181"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F5A623] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#E59400] transition-colors w-full max-w-xs flex items-center justify-center"
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <div className="mb-4">
              <Image
                src={heroImage}
                alt="Srinagar to Leh Bike Trip"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
                quality={75}
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Srinagar to Leh Bike Trip – 8 Days - Paradise Bliss Tours</h3>
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A]"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A]"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A]"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00453A] focus:ring-[#00453A]"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-[#F5A623] text-[#00453A] rounded-full font-semibold shadow-lg hover:shadow-xl transition-colors"
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