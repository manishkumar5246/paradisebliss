'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// Vietnam Images (replace with actual paths)
const heroImage = "/optimised/bana.webp";
const highlightImages = [
  "/optimised/cu-chi-tunnels.jpg",
  "/optimised/vietnam 8.jpg",
  "/optimised/vietnam6.jpg",
  "/optimised/cruice.jpg",
];
const rightSideImage = "/img/logo.png";

// Quick Facts about Vietnam Backpacking Adventure
const quickFacts = [
  { text: "The Mekong Delta is home to over 1,000 species of fish and floating markets that operate daily." },
  { text: "Cham Island is a UNESCO Biosphere Reserve with pristine coral reefs and marine biodiversity." },
  { text: "Ninh Binh is known as 'Halong Bay on Land' with limestone peaks rising from rice fields." },
  { text: "Hoi An’s Japanese Covered Bridge, built in the 1590s, is a symbol of cultural fusion." },
];

// Itinerary - 10 Days / 9 Nights
const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Ho Chi Minh & City Immersion",
    desc: "You arrive in Ho Chi Minh City, settle into your hotel, then set off on an afternoon city-tour. We’ll visit landmarks like Independence Palace, Notre Dame Cathedral, the Central Post Office, and the Opera House. In the evening, stroll through the bustling Ben Thanh Market and experience the lively energy at Bui Vien Walking Street as Saigon lights up with street food, music, and nightlife."
  },
  {
    day: "Day 2",
    title: "Mekong Delta & Cu Chi Tunnels",
    desc: "After breakfast, head out to explore the Mekong Delta, where river life, lush landscapes, floating markets, and rural beauty await. Enjoy a local lunch along the river. Later, return closer to the city for a trip to the legendary Cu Chi Tunnels, used during Vietnam’s war — exploring those tunnels offers a powerful glimpse into the past. Evening is free for you to rest or explore Saigon at your leisure."
  },
  {
    day: "Day 3",
    title: "Flight to Da Nang & Beach Time",
    desc: "Fly to Da Nang, Vietnam’s coastal gem. After arrival and hotel check-in, relax along My Khe Beach, known for its golden sand and soothing waves. As afternoon descends, discover local cafés, enjoy seaside views, and immerse yourself in the laid-back coastal vibe. Evening at your leisure."
  },
  {
    day: "Day 4",
    title: "Ba Na Hills & Golden Bridge Experience",
    desc: "Today is majestic scenery and fun. Take a full-day trip to Ba Na Hills, riding one of the world’s longest cable cars up into the highlands. Walk across the floating Golden Hand Bridge, explore the French Village, wander through Le Jardin D’Amour gardens, and get your thrill with rides at Fantasy Park. Stay overnight in Da Nang, refreshed from the day’s adventures."
  },
  {
    day: "Day 5",
    title: "Hoi An’s Charm & Basket Boat Ride",
    desc: "On Day 5, you travel to Hoi An Ancient Town, famous for its vintage charm, lantern-lit evenings, and riverside beauty. Wander through narrow alleys, shop at artisan stores, savor local food, and enjoy a relaxing basket boat ride through the nearby coconut groves. Evening spent in the magical glow of Hoi An — the lanterns, food, and river drama."
  },
  {
    day: "Day 6",
    title: "Cham Island, Snorkeling & Sea Adventures",
    desc: "After a restful morning, set out to Cham Island for snorkeling, beach time, and an opportunity to soak in coastal natural beauty. Delight in the coral reefs, enjoy lunch on the island, and engage with local island life. Return for an evening of relaxation or optional local exploration."
  },
  {
    day: "Day 7",
    title: "Fly to Hanoi – The Capital’s Old Beauty",
    desc: "Today, fly north to Hanoi, Vietnam’s cultural and political capital. Once you're there, explore the timeless Old Quarter — its narrow lanes, colonial architecture, street vendors, and cafés. Visit Train Street, where everyday life unfolds along the tracks, and soak in the history and energy of Vietnam’s capital city."
  },
  {
    day: "Day 8",
    title: "Ninh Binh Day Tour – Rivers, Valleys & History",
    desc: "Leave the city behind for the day and journey to Ninh Binh, often dubbed “Halong Bay on land.” Explore ancient Hoa Lu, take a relaxing boat ride through river valleys flanked by karst peaks and lush greenery, enjoy a local lunch, and explore rural villages or hidden caves. Return to Hanoi in the evening."
  },
  {
    day: "Day 9",
    title: "Halong Bay Cruise – Water Majesty",
    desc: "On Day 9, set out for Halong Bay for a 4-star cruise. Drift among emerald waters, see dramatic limestone karsts, explore hidden caves, try kayaking among serene coves, and enjoy lunch on board. It’s nature in its grandest form. After your cruise, return to Hanoi and spend the evening with final shopping or strolling."
  },
  {
    day: "Day 10",
    title: "Shopping & Departure",
    desc: "Your last morning in Vietnam is yours to enjoy: perhaps some final shopping in Hanoi, a quiet breakfast, or a walk through nearby streets catching the morning light. Then you’ll be transferred to the airport for your departure home, carrying with you memories of lanterns, landscapes, culture, seas, and smiles."
  },
];

// Highlights
const highlights = [
  { title: "Mekong Delta & Cu Chi Tunnels", image: highlightImages[0], desc: "Floating markets, river life, and wartime history." },
  { title: "Golden Bridge & Ba Na Hills", image: highlightImages[1], desc: "Sky-high bridge, theme park, and misty mountain views." },
  { title: "Cham Island Snorkeling", image: highlightImages[2], desc: "UNESCO biosphere, coral reefs, and island lunch." },
  { title: "Halong Bay 4-Star Cruise", image: highlightImages[3], desc: "Kayaking, caves, and emerald waters in a UNESCO site." },
];

// FAQ data
const faqs = [
  { question: "What is the group size for this tour?", answer: "Small group (8–20 travelers) for an adventurous, social, and flexible experience." },
  { question: "Do I need a visa to visit Vietnam?", answer: "Many nationalities get 15-day visa exemption or e-visa. Check with your embassy." },
  { question: "Are internal flights included?", answer: "Yes, flights from Ho Chi Minh → Da Nang → Hanoi are included." },
  { question: "What is the accommodation standard?", answer: "9 nights in 3★ / 4★ hotels, twin/double sharing, centrally located or beachfront." },
  { question: "Can dietary requirements be accommodated?", answer: "Yes, vegetarian, vegan, halal, gluten-free with prior notice." },
  { question: "Is the Halong Bay cruise overnight?", answer: "This is a full-day 4-star cruise with lunch. Overnight option available at extra cost." },
  { question: "What currency should I bring?", answer: "Vietnamese Dong (VND). ATMs widely available; USD accepted in tourist areas." },
  { question: "Is snorkeling gear provided on Cham Island?", answer: "Yes, mask, snorkel, and fins are included. Bring swimwear and towel." },
  { question: "What is the cancellation policy?", answer: "Full refund (minus fees) 60+ days prior. Partial 30–60 days. No refund within 30 days." },
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
            <li>9 nights’ accommodation in 3- & 4-star hotels</li>
            <li>Private airport transfers in & out</li>
            <li>Flights (Ho Chi Minh → Da Nang → Hanoi)</li>
            <li>All breakfasts + 4 lunches (Mekong Delta, Halong Bay, Cham Island, Ninh Binh)</li>
            <li>Day cruise on Halong Bay with kayaking & cave exploration</li>
            <li>Ba Na Hills & Golden Bridge; Hoi An basket boat ride; Cu Chi Tunnels</li>
            <li>Cham Island snorkeling; Ninh Binh river boat ride</li>
            <li>English-speaking local guides throughout</li>
            <li>All sightseeing, ticket fees, and transfers as per itinerary</li>
          </ul>
        </div>
        <div>
          <strong className="block mb-2">What's Not Included:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>International flight to Vietnam</li>
            <li>Visa fees, travel insurance, personal & incidental expenses</li>
            <li>Meals beyond those listed (dinners, additional lunches)</li>
            <li>Tips and gratuities for guides and drivers</li>
            <li>Optional extras or activities not mentioned</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Price & Batches",
    content: (
      <p>
        <strong>Double-Sharing Price:</strong> ₹89,999 (with internal flights)<br />
        <em>Seasonal variations apply. Early bird & group discounts available.</em>
      </p>
    ),
  },
  {
    title: "Best Time to Visit",
    content: (
      <p>
        The best time is <strong>February–April</strong> and <strong>September–November</strong> for pleasant weather, clear waters, and vibrant local life.
      </p>
    ),
  },
  {
    title: "Health & Safety Guidelines",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Wear reef-safe sunscreen and water shoes for Cham Island snorkeling.</li>
        <li>Bring insect repellent for Mekong Delta and Ninh Binh.</li>
        <li>Stay hydrated; bottled water provided on all tours.</li>
        <li>Follow guide instructions during boat rides, kayaking, and tunnel visits.</li>
        <li>Respect local customs: dress modestly at temples, remove shoes indoors.</li>
        <li>Emergency contact available 24/7 via your tour leader.</li>
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

export default function VietnamBackpacking10DayPackage() {
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
              Vietnam Backpacking Adventure – 10 Days / 9 Nights
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              Paradise Bliss Tours - South to North Epic Journey
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
              Start Your Adventure
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
              Get ready to dive deep into Vietnam’s vibrant culture, stunning landscapes, and rich history on our 10-day backpacking tour with Paradise Bliss Tours. From the bustling streets of Ho Chi Minh to the mountain vistas of Sapa, the lantern glow of Hoi An, the calm waters of Halong Bay, and the beauty of Vietnam’s rural heartlands, this trip is perfect for travellers who want a mix of adventure, culture, nature, and unforgettable memories.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Duration:</strong> 10 Days / 9 Nights
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Destinations:</strong> HCMC → Mekong → Da Nang → Hoi An → Cham Island → Hanoi → Ninh Binh → Halong
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Price:</strong> ₹89,999 (incl. flights)
              </li>
              <li className="flex items-center">
                <AiOutlineStar className="text-[#F5A623] mr-2 flex-shrink-0" />
                <strong className="mr-1">Group Vibe:</strong> Adventure, culture, nature
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
                    animate={{ maxHeight: 800, opacity: 1 }}
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
            <h3 className="text-2xl font-semibold text-[#00453A] mb-4 font-sans">Pricing (Double-Sharing)</h3>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-[#00453A]">₹89,999</span>
              <span className="text-sm text-gray-600">(with internal flights)</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-sans">Group & early bird discounts available.</p>

            <h3 className="text-2xl font-semibold text-[#00453A] mt-6 mb-4 font-sans">Key Inclusions</h3>
            <ul className="space-y-3 text-gray-700 font-sans">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 9 nights in 3-4 star hotels</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> 2 internal flights + all transfers</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Halong Bay cruise + Cham Island snorkeling</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Ninh Binh boat ride + Mekong Delta</li>
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
              alt="Vietnam Backpacking Icon"
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
                alt="Vietnam Backpacking 10-Day Tour"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
                quality={75}
              />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Vietnam Backpacking Adventure – 10 Days / 9 Nights</h3>
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