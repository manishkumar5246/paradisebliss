'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { AiOutlineCalendar, AiOutlineDown, AiOutlineUp, AiOutlineStar, AiOutlinePhone } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { memo } from 'react';

// Update these with your actual Kerala images
const heroImage = "https://tse3.mm.bing.net/th/id/OIP.rkZG0JT6ASsrapR18RrjGwHaEK?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3";     // Houseboat or Alleppey sunset
const highlightImages = [
  "https://www.tyndistravel.com/uploads/editor/mceu_5522354311659782136703-1659782136.jpg",     // Backwaters
  "https://tse3.mm.bing.net/th/id/OIP.SEV7ED07l-h2FVFYnp4C-gHaFI?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",      // Munnar
  "https://www.visittnt.com/blog/wp-content/uploads/2017/09/image_14908459336960.jpg",          // Kovalam/Varkala
  "https://tse4.mm.bing.net/th/id/OIP.6UrYoqvLLuL9Etc3ebTk7QHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",        // Culture
];
const rightSideImage = "/img/logo.png";

// Quick Facts – Kerala
const quickFacts = [
  { text: "Kerala has India’s highest literacy rate and life expectancy." },
  { text: "Alleppey is called the 'Venice of the East' due to its stunning backwaters." },
  { text: "Munnar produces some of the world’s finest tea and spices." },
  { text: "Kerala is the only state in India where it rains for 6 months a year — perfect for Ayurveda!" },
];

// Highlights
const highlights = [
  { title: "Alleppey Backwaters", image: highlightImages[0], desc: "Cruise through serene canals on a traditional houseboat." },
  { title: "Munnar Tea Estates", image: highlightImages[1], desc: "Mist-covered hills, endless green carpets of tea gardens." },
  { title: "Kovalam & Varkala Beaches", image: highlightImages[2], desc: "Golden sands, turquoise waters, and stunning sunsets." },
  { title: "Kathakali & Cultural Shows", image: highlightImages[3], desc: "Experience the dramatic art forms and vibrant traditions." },
];

// FAQ – Kerala Specific
const faqs = [
  { question: "Is Kerala safe for solo female travelers?", answer: "Absolutely! Kerala is one of the safest states in India with warm, respectful locals." },
  { question: "What is the best time to visit Kerala?", answer: "October to February for pleasant weather. June–September for lush greenery and Ayurvedic treatments." },
  { question: "Are houseboat stays included in packages?", answer: "Yes! Most Kerala packages include a relaxing overnight houseboat experience in Alleppey." },
  { question: "Can we get Ayurvedic massages?", answer: "Yes — authentic rejuvenating therapies are a highlight of every Kerala trip." },
  { question: "Is Kerala good for honeymooners?", answer: "It’s one of the top honeymoon destinations in India — romantic backwaters, beaches, and hill stations." },
  { question: "Do you offer family-friendly packages?", answer: "Yes! Kerala is perfect for families with calm beaches, wildlife sanctuaries, and cultural experiences." },
  { question: "What cuisine will we experience?", answer: "Delicious Kerala Sadya, seafood, Appam-Stew, Puttu-Kadala, and coconut-rich dishes served on banana leaves." },
];

// Important Information
const importantInfo = [
  {
    title: "Best Time to Visit",
    content: (
      <div className="space-y-3 text-gray-700">
        <p><strong>Winter (Oct–Feb):</strong> Ideal for sightseeing, backwaters, beaches</p>
        <p><strong>Monsoon (Jun–Sep):</strong> Lush greenery, best for Ayurveda & rejuvenation</p>
        <p><strong>Summer (Mar–May):</strong> Perfect for hill stations like Munnar & Wayanad</p>
      </div>
    ),
  },
  {
    title: "Top Experiences Included",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Overnight Houseboat Cruise in Alleppey/Kumarakom</li>
        <li>Visit to Munnar Tea Plantations & Spice Gardens</li>
        <li>Beach time at Kovalam or Varkala</li>
        <li>Wildlife Safari in Periyar/Thekkady (optional)</li>
        <li>Kathakali Dance Performance</li>
        <li>Authentic Kerala Sadya Meal</li>
        <li>Ayurvedic Wellness Session (in select packages)</li>
      </ul>
    ),
  },
  {
    title: "Who Should Join",
    content: (
      <p className="text-gray-700">
        Perfect for honeymooners, families, nature lovers, wellness seekers, culture enthusiasts, and anyone craving peace, beauty, and warm hospitality. Kerala welcomes everyone with open arms.
      </p>
    ),
  },
];

// Highlight Card Component (unchanged)
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
    <motion.div whileHover={{ rotate: 180 }} className="absolute top-4 right-4 text-[#F5A623]">
      <AiOutlineStar size={24} />
    </motion.div>
  </motion.div>
));
HighlightCard.displayName = 'HighlightCard';

export default function KeralaGodsOwnCountry() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openInfo, setOpenInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: null, travellers: '' });
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

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
    console.log('Kerala Enquiry:', formData);
    alert('Thank you! Our Kerala expert will call you shortly!');
    handleCloseModal();
  }, [formData, handleCloseModal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % quickFacts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };
  const factVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };

  return (
    <div className="bg-[#F1FDF3] min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#00453A]/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 font-serif"
            >
              Kerala – God’s Own Country
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-2xl mb-6 font-sans"
            >
              Backwaters • Beaches • Hills • Culture • Wellness
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              className="bg-[#F1FDF3] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl"
            >
              Plan Your Kerala Escape
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Wave */}
      <div className="relative h-12 bg-[#00453A]">
        <svg className="absolute bottom-0 w-full text-[#F1FDF3]" viewBox="0 0 1440 60">
          <path fill="currentColor" d="M0,0L1440,60H0Z"></path>
        </svg>
      </div>

      {/* Trip Overview */}
      <motion.section className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Welcome to Paradise
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-white to-[#F1FDF3] p-8 rounded-2xl shadow-xl">
          <div className="space-y-5 text-gray-700">
            <p className="leading-relaxed text-base">
              Welcome to <strong>Kerala</strong>, the land where nature whispers peace and beauty flows through every corner. Known as <em>God’s Own Country</em>, Kerala is a paradise of swaying coconut palms, tranquil backwaters, misty hills, and golden beaches.
            </p>
            <p className="leading-relaxed">
              Whether you’re seeking romance, relaxation, adventure, or cultural exploration — Kerala offers the perfect blend of all. With its pristine landscapes, vibrant traditions, and warm hospitality, it truly captures the essence of heaven on earth.
            </p>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Serene Backwaters & Houseboats</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Lush Hill Stations – Munnar, Wayanad</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Pristine Beaches – Kovalam, Varkala</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Rich Culture, Kathakali & Festivals</li>
              <li className="flex items-center"><AiOutlineStar className="text-[#F5A623] mr-2" /> Authentic Kerala Cuisine & Ayurveda</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-[#00332A]">
              Get Custom Quote
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Highlights */}
      <motion.section initial="hidden" whileInView="show" variants={containerVariants} viewport={{ once: true }} className="max-w-6xl mx-auto px-4 py-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Why Kerala Captivates Hearts
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((h, i) => (
            <HighlightCard key={i} highlight={h} index={i} variants={itemVariants} />
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
              <motion.p key={currentFactIndex} variants={factVariants} initial="hidden" animate="show" exit="exit"
                className="text-gray-700 font-sans text-base leading-relaxed">
                {quickFacts[currentFactIndex].text}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6">
            <Image src={rightSideImage} alt="Paradise Bliss Logo" width={150} height={150} className="object-contain" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleOpenModal}
              className="bg-[#00453A] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#00332A] w-full max-w-xs">
              Request Callback
            </motion.button>
            <motion.a href="tel:+918449000181" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-[#F5A623] text-[#00453A] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#E59400] w-full max-w-xs flex items-center justify-center">
              <AiOutlinePhone className="mr-2" /> Call Now
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Important Info */}
      <motion.section className="max-w-5xl mx-auto px-4 py-16">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-[#00453A] text-center mb-12 font-serif relative">
          Good to Know
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-[#F5A623]"></span>
        </motion.h2>
        <div className="space-y-4">
          {importantInfo.map((info, i) => (
            <motion.div key={i} className="bg-[#E4DECF] border-l-4 border-[#F5A623] rounded-r-lg shadow-md hover:shadow-lg">
              <button onClick={() => toggleInfo(i)} className="w-full flex justify-between items-center p-5 text-left bg-[#E4DECF] text-[#00453A] font-semibold font-sans">
                <span>{info.title}</span>
                {openInfo === i ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              <AnimatePresence>
                {openInfo === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
                    <div className="p-5 text-gray-700 font-sans">{info.content}</div>
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
          {faqs.map((faq, i) => (
            <motion.div key={i} className="bg-[#E4DECF] border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => toggleFaq(i)} className="w-full flex items-center p-4 text-left">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#F5A623] text-white rounded-full font-semibold mr-3">
                  {i + 1}
                </span>
                <span className="flex-1 text-[#00453A] font-semibold font-sans text-lg">{faq.question}</span>
                {openFaq === i ? <AiOutlineUp className="text-[#00453A]" /> : <AiOutlineDown className="text-[#00453A]" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-4 pb-4 pt-2 text-gray-700 font-sans text-sm">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Modal */}
      {isModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleCloseModal}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl">×</button>
            <div className="mb-4">
              <Image src={heroImage} alt="Kerala" width={400} height={128} className="w-full h-32 object-cover rounded-lg" />
              <h3 className="mt-3 text-lg font-bold text-[#00453A] font-sans">Kerala – God’s Own Country</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:border-[#00453A]" />
              <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:border-[#00453A]" />
              <div className="relative">
                <DatePicker selected={formData.date} onChange={handleDateChange} placeholderText="Preferred Travel Month" className="w-full px-4 py-2 border rounded-md" />
                <AiOutlineCalendar className="absolute right-3 top-3 text-gray-400" />
              </div>
              <input type="number" name="travellers" placeholder="No. of Travellers" min="1" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md" />
              <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-[#F5A623] text-[#00453A] rounded-full font-semibold shadow-lg hover:shadow-xl">
                Get Free Quote
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
}