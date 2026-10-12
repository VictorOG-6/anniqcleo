import Image from "next/image";
import Link from "next/link";
import { FaCopyright, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-screen bg-primary/10">
      <div className="max-w-7xl mx-auto pt-16 pb-5 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between ">
          <div className="flex flex-col gap-5 mb-5 md:mb-0">
            <Image
              src="/logo.png"
              alt="Anniqcleo Logo"
              width={170}
              height={68}
            />
            <div className="hidden md:flex items-center gap-5">
              <Link
                href="https://www.x.com/anniqcleo"
                className="w-12.5 h-12.5 rounded-full bg-white flex items-center justify-center text-secondary cursor-pointer transition-all duration-300 hover:text-primary"
              >
                <FaXTwitter size={30} />
              </Link>
              <Link
                href="https://www.instagram.com/anniqcleo"
                className="w-12.5 h-12.5 rounded-full bg-white flex items-center justify-center text-secondary cursor-pointer transition-all duration-300 hover:text-primary"
              >
                <FaInstagram size={30} />
              </Link>
              <Link
                href="https://www.tiktok.com/@anniqcleo"
                className="w-12.5 h-12.5 rounded-full bg-white flex items-center justify-center text-secondary cursor-pointer transition-all duration-300 hover:text-primary"
              >
                <FaTiktok size={30} />
              </Link>
            </div>
            <span className="hidden md:flex items-center gap-0.5 text-secondary text-lg font-semibold mt-1">
              <FaCopyright size={20} />
              <p>2026 Anniqcleo. All rights reserved.</p>
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-20">
            <div className="flex flex-col gap-5 text-secondary text-lg">
              <h3 className="font-display text-xl font-semibold">Shop</h3>
              <Link
                href="/shop"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                Shop Body Scrub
              </Link>
              <Link
                href="/shop"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                Shop Body Oil
              </Link>
              <Link
                href="/shop"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                Shop Lip Care
              </Link>
              <Link
                href="/shop"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                Shop Brow Kit
              </Link>
            </div>
            <div className="flex flex-col gap-5 text-secondary text-lg">
              <h3 className="font-display text-xl font-semibold">Company</h3>
              <Link
                href="/about"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                About Anniqcleo
              </Link>
              <Link
                href="/privacy-policy"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-condition"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                Terms and Conditions
              </Link>
            </div>
            <div className="flex flex-col gap-5 text-secondary text-lg">
              <h3 className="font-display text-xl font-semibold">Need Help</h3>
              <Link
                href="/contact"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                Contact Us
              </Link>
              <Link
                href="/reviews"
                className="cursor-pointer transition-all duration-300 hover:text-primary"
              >
                Reviews
              </Link>
            </div>
          </div>
          <div className="flex md:hidden flex-col items-center gap-10">
            <div className="hidden md:flex items-center gap-5">
              <Link
                href="https://www.x.com/anniqcleo"
                className="w-12.5 h-12.5 rounded-full bg-white flex items-center justify-center text-secondary cursor-pointer transition-all duration-300 hover:text-primary"
              >
                <FaXTwitter size={30} />
              </Link>
              <Link
                href="https://www.instagram.com/anniqcleo"
                className="w-12.5 h-12.5 rounded-full bg-white flex items-center justify-center text-secondary cursor-pointer transition-all duration-300 hover:text-primary"
              >
                <FaInstagram size={30} />
              </Link>
              <Link
                href="https://www.tiktok.com/@anniqcleo"
                className="w-12.5 h-12.5 rounded-full bg-white flex items-center justify-center text-secondary cursor-pointer transition-all duration-300 hover:text-primary"
              >
                <FaTiktok size={30} />
              </Link>
            </div>
            <span className="flex md:hidden items-center gap-0.5 text-secondary text-lg font-semibold mt-5">
              <FaCopyright size={20} />
              <p>2026 Anniqcleo. All rights reserved.</p>
            </span>
          </div>
        </div>
        <span className="flex w-full justify-center text-center font-display text-[80px] font-medium text-white/45 md:text-[120px] lg:text-[208px]">
          Anniqcleo
        </span>
      </div>
    </footer>
  );
};

export default Footer;
