'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// Images
const heroImage = "/optimised/ladakh-bike-hero.webp";
const highlightImages = [
  "/optimised/khardung-la-bike.webp",
  "/optimised/nubra-bike-dunes.webp",
  "/optimised/pangong-bike-lake.webp",
  "/optimised/royal-enfield-ladakh.webp",
];
const rightSideImage = "/img/logo.png";

// Quick Facts
const quickFacts = [
  { text: "Khardung La is the highest motorable pass in the world at 5,359 meters." },
  { text: "Royal Enfield is the most popular bike for Ladakh expeditions." },
  { text: "Pangong Lake was featured in the movie '3 Idiots'." },
  { text: "Ladakh roads are open only from June to September due to heavy snowfall." },
];

// Itinerary
const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Leh & Acclimatisation",
    desc: "Arrive in Leh. Check-in, rest, and acclimatize to high altitude. Bike handover, safety briefing, and orientation. Overnight in Leh."
  },
  {
    day: "Day 2",
    title: "Leh → Nubra Valley via Khardung La",
    desc: "Morning ride over the world-famous Khardung La (5,359m). Descend into Nubra Valley. Explore Hunder sand dunes. Camp/tent stay in Nubra."
  },
  {
    day: "Day 3",
    title: "Nubra Valley Exploration",
    desc: "Relaxed ride through Nubra. Visit Diskit Monastery, local villages, and enjoy optional Bactrian camel ride on dunes. Overnight in Nubra."
  },
  {
    day: "Day 4",
    title: "Nubra → Pangong Lake",
    desc: "Ride from Nubra to the stunning Pangong Lake via Shyok or Wari La route. Witness dramatic landscapes. Overnight camp/cottage by the lake."
  },
  {
    day: "Day 5",
    title: "Pangong → Leh",
    desc: "Early morning at Pangong for sunrise photography. Ride back to Leh via Chang La Pass. Evening at leisure. Overnight in Leh."
  },
  {
    day: "Day 6",
    title: "Leh Local Sightseeing & Leisure Ride",
    desc: "Explore Leh Palace, Shanti Stupa, and nearby monasteries. Optional light ride in nearby valleys. Final night in Leh."
  },
  {
    day: "Day 7",
    title: "Departure from Leh",
    desc: "After breakfast, return bikes. Transfer to Leh Airport. Depart with unforgettable memories of the high-altitude bike expedition."
  },
];

// Highlights
const highlights = [
  { title: "Khardung La Pass", image: highlightImages[0], desc: "Ride the world’s highest motorable road." },
  { title: "Hunder Sand Dunes", image: highlightImages[1], desc: "Cold desert biking and camel rides." },
  { title: "Pangong Lake", image: highlightImages[2], desc: "Camp by the mesmerizing blue lake." },
  { title: "Royal Enfield Ride", image: highlightImages[3], desc: "The ultimate Himalayan biking experience." },
];

// FAQs
const faqs = [
  { question: "Do I need prior biking experience?", answer: "Yes, riders must be comfortable with high-altitude riding, gears, and long hours on the saddle. Minimum 1 year of experience required." },
  { question: "What type of bikes are provided?", answer: "Royal Enfield Himalayan 410cc or Classic 350cc (well-maintained, serviced before trip). Fuel included for riding days." },
  { question: "Is a mechanic provided?", answer: "Yes, a dedicated mechanic and backup vehicle follow the group throughout the ride for safety and repairs." },
  { question: "What permits are needed?", answer: "Inner Line Permit (ILP) for Nubra and Pangong. We handle all paperwork with your ID proof." },
  { question: "What gear should I bring?", answer: "Helmet (provided), riding jacket, gloves, knee guards, warm layers, sunglasses, sunscreen, and personal meds." },
  { question: "Can I bring my own bike?", answer: "Yes, but you must arrange transport to Leh. No fuel reimbursement. Bike must be in top condition." },
  { question: "What happens in case of bad weather?", answer: "Itinerary may be adjusted for safety. Alternate routes or rest days may be used. No refund for force majeure." },
  { question: "Are meals included?", answer: "Breakfast included daily. Dinner included at camps/hotels. Lunch at local dhabas (self-paid)." },
  { question: "Is oxygen provided?", answer: "Yes, portable oxygen cylinders and first-aid kit in backup vehicle. Medical support available." },
  { question: "What is the group size?", answer: "6–12 riders per batch for safety, camaraderie, and personalized experience." },
];

// Important Information - FIXED: Removed extra </div>
const importantInfo = [
  {
    title: "Inclusions & Exclusions",
    content: (
      <div className="space-y-4">
        <div>
          <strong className="block mb-2">What's Included:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>6 nights accommodation (hotels, camps, tents – twin/triple sharing).</li>
            <li>Bike rental (Royal Enfield) + fuel for itinerary rides.</li>
            <li>Private mechanic & backup vehicle with spare parts.</li>
            <li>Inner Line Permits (ILP) for restricted areas.</li>
            <li>Experienced Trip Captain + local riding guide.</li>
            <li>Airport pickup in Leh (Day 1).</li>
            <li>All road taxes, tolls, parking fees.</li>
            <li>Basic helmet and riding gear (jacket, gloves optional).</li>
          </ul>
        </div>
        <div>
          <strong className="block mb-2">What's Not Included:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Flight/train to/from Leh.</li>
            <li>Meals except breakfast (lunch/dinner self-paid).</li>
            <li>Personal expenses, tips, drinks.</li>
            <li>Monument/entry fees.</li>
            <li>Any cost due to roadblocks, landslides, or weather.</li>
            <li>5% GST (applicable on total).</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Package Cost (Per Person)",
    content: (
      <p>
        <strong>Starting from ₹29,999</strong> per rider (double/triple sharing)<br />
        <em>*Final price depends on batch date, bike model, and group size.</em>
      </p>
    ),
  },
  {
    title: "Who Should Join & Trip Vibe",
    content: (
      <p>
        For passionate bikers, adventure junkies, and explorers who live for the throttle. Ride with a tribe of like-minded riders, conquer high passes, camp under starlit skies, and return with stories for a lifetime.
      </p>
    ),
  },
  {
    title: "Important Notes",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Riders must carry valid DL, Aadhaar/Passport, and medical fitness certificate.</li>
        <li>Weather in Ladakh is unpredictable — itinerary subject to change.</li>
        <li>Book early (June–Sep peak season) for best bikes and camps.</li>
        <li>Standard cancellation policy: 50% refund if canceled 30+ days prior.</li>
        <li>Respect local culture and environment — no littering, no loud music.</li>
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

export default function LadakhBikeExpedition() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#00453A]/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 font-serif"
            >
              Ladakh Bike Expedition
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              6 Nights / 7 Days – Leh → Nubra → Pangong → Leh
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
              Gear up for the ultimate high-altitude motorcycle adventure through Ladakh’s dramatic landscapes. Ride the world’s highest passes, camp by frozen lakes, and live the biker’s dream.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Duration:</strong> 6 Nights / 7 Days
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Route:</strong> Leh → Nubra → Pangong → Leh
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Price:</strong> From ₹29,999
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Best Time:</strong> June–September
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
            <h3 className="text-2xl font-semibold text-[#00453A] mb-4 font-sans">Package Cost (Per Rider)</h3>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-[#00453A]">₹29,999</span>
              <span className="text-lg font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">Starting Price</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-sans">Varies by date, bike, and group size.</p>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Key Inclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Bike + Fuel + Mechanic</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 6 Nights Stay (Camps/Hotels)</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Permits & Backup Vehicle</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Trip Captain + Guide</li>
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
              alt="Ladakh Bike Expedition"
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
              ✕
            </button>
            <div className="mb-4">
              <Image
                src={heroImage}
                alt="Ladakh Bike Expedition"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
                quality={75}
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Ladakh Bike Expedition – 6N/7D</h3>
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
                  <label className="block text-sm font-medium text-gray-700 font-sans">Number of Riders</label>
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