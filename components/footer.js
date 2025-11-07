'use client';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="text-black p-8">
      <div className="container mx-auto">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo */}
          <Image
            src="https://raw.githubusercontent.com/aryanrajput955/icons_paradise/refs/heads/main/logo.png" // Replace with your logo path
            alt="Paradise Bliss"
            width={200} // Adjust width as needed
            height={50} // Adjust height as needed
            className="object-contain mt-10 mb-6"
          />

          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-10">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://raw.githubusercontent.com/aryanrajput955/icons_paradise/refs/heads/main/twitter.png" // Replace with X (Twitter) icon path
                alt="X (Twitter)"
                width={30}
                height={30}
                className="hover:scale-125 transition-transform duration-100 ease-in-out"
              />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://raw.githubusercontent.com/aryanrajput955/icons_paradise/refs/heads/main/fb.png" // Replace with Facebook icon path
                alt="Facebook"
                width={30}
                height={30}
                className="hover:scale-125 transition-transform duration-100 ease-in-out"
              />
            </a>
            <a href="https://www.instagram.com/paradiseblisstours?igsh=YXZpaHE3ZHBxZ3gy" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://raw.githubusercontent.com/aryanrajput955/icons_paradise/refs/heads/main/instagram2.png" // Replace with Instagram icon path
                alt="Instagram"
                width={30}
                height={30}
                className="hover:scale-125 transition-transform duration-100 ease-in-out"
              />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://raw.githubusercontent.com/aryanrajput955/icons_paradise/refs/heads/main/whatsapp1.png" // Replace with WhatsApp icon path
                alt="WhatsApp"
                width={30}
                height={30}
                className="hover:scale-125 transition-transform duration-100 ease-in-out"
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://raw.githubusercontent.com/aryanrajput955/icons_paradise/refs/heads/main/linkedin.png" // Replace with LinkedIn icon path
                alt="LinkedIn"
                width={30}
                height={30}
                className="hover:scale-125 transition-transform duration-100 ease-in-out"
              />
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-2">About Us</h3> {/* Reduced margin-bottom */}
            <p className="text-sm ">
              Paradise Bliss Tours is a travel company that makes planning your perfect trip easy and hassle-free. Whether you’re looking for a peaceful escape, an exciting adventure, or a spiritual journey, we take care of everything so you can simply enjoy the experience. We offer customized trips, from relaxing beach vacations and exploring vibrant cities to special religious tours across India. Our spiritual journeys include the sacred Char Dham Yatra, Jyotirlinga Yatras, and pilgrimages to other sacred destinations. No matter where you want to go, we’re here to turn your travel dreams into reality with smooth planning and unforgettable experiences!                        </p>
          </div>

          {/* Blogs Section */}
          <div>
            <h3 className="text-xl font-bold mb-2">Blogs</h3>
            <ul style={{ fontFamily: 'jost' }} className="sm:text-base lg:text-md">
              <li>
                <Link href="/top-10-tourist-attractions-in-kedarnath">
                  <span className="text-green-500">#</span>Top 10 Tourist Attractions in Kedarnath
                </Link>
              </li>
              <li>
                <Link href="/best-places-to-visit-in-spiti-valley">
                  <span className="text-green-500">#</span> Best places to visit in Spiti Valley for a Happy Vacations
                </Link>
              </li>
              <li>
                <Link href="/manali-zen-town-of-himachal">
                  <span className="text-green-500">#</span>Manali: The Zen Town of Himachal, India's Best Hill Station
                </Link>
              </li>
              <li>
                <Link href="/interesting-ways-to-explore-manali">
                  <span className="text-green-500">#</span> The Interesting Ways to Explore Manali
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-2">Quick Links</h3> {/* Reduced margin-bottom */}
            <ul style={{ fontFamily: 'jost' }} className="sm:text-base lg:text-md">
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/cancellation-policy">Cancellation Policy</Link></li>
              <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link href="/write-for-us">Write for Us</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-sm">
              Paradise Bliss Tours Pvt Ltd – Haridwar<br />
              2nd Floor Plaza Complex, Chandra Charya Chowk, Haridwar, Uttarakhand -249401<br />
              Mobile: +91-8449000181
            </p>
            <p className="text-sm mt-2">
              Paradise Bliss Tours Pvt Ltd – Bengaluru <br />
              TF-2, CJN Heritage, A.Narayanapura, Mahadevpura, Bengaluru, Karnataka -560016  <br />
              Mobile: +91-8459000182
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 text-sm flex flex-col items-center">
  {/* Centered for all screen sizes */}
  <p>
    © {new Date().getFullYear()} Paradise Bliss Tour All Rights Reserved.
  </p>
  {/* Below the copyright text */}
  <p className="mt-2  ">
    Designed and developed by <a href="https://thecraftsync.com" className=" text-sm text-yellow-400 hover:text-yellow-600">TheCraftSync.com</a>
  </p>
</div>
      </div>
    </footer>
  );
};

export default Footer;