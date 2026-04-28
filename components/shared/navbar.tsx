"use client";

import {
  Camera,
  CircleUserRound,
  LogOut,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBasket,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrolledUp, setScrolledUp] = useState<boolean>(false);
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      }

      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
        setScrolledUp(currentScrollY > 20);
      }

      if (currentScrollY <= 10) {
        setScrolledUp(false);
      }

      setLastScrollY(currentScrollY);

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${showNavbar ? "translate-y-0" : "translate-y-full"} ${scrolledUp ? "bg-white shadow-md py-4" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-base text-black px-2 md:px-0">
        <nav className="hidden md:flex items-center gap-12 font-inter">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={`transition-all duration-300 cursor-pointer hover:text-primary ${isActive(link.href) ? "text-primary underline" : "text-black"}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Link href={"/"} className="cursor-pointer">
          <img
            src={"/logo.png"}
            alt="Anniqcleo Logo"
            className="w-45 h-10 md:w-60 md:h-24 object-cover"
          />
        </Link>
        <div className="flex items-center gap-8 text-black">
          <Search
            size={24}
            className="cursor-pointer transition-colors duration-300 hover:text-primary"
          />
          <Popover>
            <PopoverTrigger>
              <ShoppingBasket
                size={24}
                className="cursor-pointer transition-colors duration-300 hover:text-primary"
              />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col items-center gap-7 py-4">
                <h2 className="font-roboto-mono text-sm font-medium text-primary">
                  Anniqcleo Cart
                </h2>
                <div>
                  <div className="flex items-center justify-between border-b border-[#8E8E93] gap-10 px-2 pb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/product1.avif"
                        alt="Glow Up Body Scrub"
                        className="w-10 h-10 object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-black">
                          Glow Up Body Scrub
                        </h3>
                        <p className="text-xs text-secondary">₦19,000</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="cursor-pointer text-primary">
                        <Minus size={14} />
                      </span>
                      <p className="text-xs text-secondary font-bold">1</p>
                      <span className="cursor-pointer text-primary">
                        <Plus size={14} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  {isUser ? (
                    <button className="text-xs cursor-pointer bg-primary text-white rounded-sm shadow-sm px-2 py-1.5 transition-all duration-300 hover:bg-primary/80">
                      Checkout
                    </button>
                  ) : (
                    <Link
                      href={"/sign-in"}
                      className="w-30 flex items-center justify-center text-xs cursor-pointer bg-primary text-white rounded-sm shadow-sm px-2 py-1.5 transition-all duration-300 hover:bg-primary/80"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {isUser ? (
            <Popover>
              <PopoverTrigger>
                <CircleUserRound
                  size={24}
                  className="hidden md:block cursor-pointer transition-colors duration-300 hover:text-primary"
                />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col items-center">
                  {isUser ? (
                    <div className="relative text-black hover:text-[#0A66C2] cursor-pointer">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1F1F1F] text-white text-sm">
                        {/* {getInitials(user.name)} */}
                      </div>
                      <div className="absolute -right-2.5 -bottom-2 w-6 h-6 rounded-full flex items-center justify-center bg-gray-200">
                        <Camera size={14} />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image
                        src="/test1.png"
                        alt="User profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  {/* <h2 className='mt-2'>{user?.name}</h2> */}
                  {/* <p className='text-xs text-gray-600 mb-2'>{user?.email}</p> */}
                  <button className="rounded-xl bg-[#E2E8F0] flex items-center justify-center px-2.5 py-1.5 mb-3">
                    <div className="text-gray-600 flex items-center gap-2 hover:text-red-500 cursor-pointer">
                      <LogOut size={14} />
                      {/* <p className='text-sm'>{isLoading ? 'Signing out…' : 'Sign Out'}</p> */}
                    </div>
                  </button>
                  <div className="flex items-center gap-1.5 text-black text-[10px]">
                    <p>Privacy Policy</p>
                    <span className="bg-black w-0.5 h-0.5 rounded-full" />
                    <p>Terms of Service</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href={"/sign-in"}>
              <button className="hidden bg-primary cursor-pointer w-25 rounded-md shadow-md text-white text-sm md:flex items-center justify-center py-1.5 px-2 transition-all duration-300 hover:bg-primary/80">
                Sign in
              </button>
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden transition-all duration-300"
          >
            {isOpen ? (
              <X color="000" size={24} />
            ) : (
              <Menu color="#000" size={24} />
            )}
          </button>
        </div>
      </div>

      <aside
        className={`relative z-40 w-70 h-screen flex flex-col items-center shadow-xl transition-all duration-500 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {isUser && (
          <div>
            <Avatar>
              <AvatarImage></AvatarImage>
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <h2></h2>
            <p></p>
          </div>
        )}
        {navLinks.map((link) => (
          <div
            key={link.href}
            className="px-2 py-1.5 border-b border-[#8E8E93]"
          >
            <Link href={link.href} className="font-inter text-sm text-black">
              {link.href}
            </Link>
          </div>
        ))}
        <button
          className={`${isUser ? "bg-red-500" : "bg-primary"} rounded-md shadow-md text-white text-sm flex items-center justify-center py-1.5 px-2`}
        >
          {isUser ? "Sign out" : "Sign in"}
        </button>
      </aside>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
    </header>
  );
};

export default Navbar;
