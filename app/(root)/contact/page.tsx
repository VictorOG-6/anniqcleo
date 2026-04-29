"use client";

import { Mail, MapPin, PhoneCall } from "lucide-react";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const [state, handleSubmit] = useForm("xqkowery");

  return (
    <main className="pt-20 md:pt-28">
      <section className="max-w-7xl mx-auto flex flex-col items-center gap-14 pt-5 pb-20 px-5 md:px-0">
        <div className="flex flex-col items-center text-center gap-2.5 md:gap-7">
          <h1 className="text-primary text-sm md:text-3xl">Contact Us</h1>
          <p className="text-secondary text-sm md:text-xl">
            Any questions or remarks? Just write a message!
          </p>
        </div>
        <div className="w-full bg-foreground px-8 pt-10 pb-6 flex flex-col-reverse md:flex-row items-center gap-13 rounded-2xl">
          <div className="relative md:h-[501px] flex flex-col justify-between bg-primary/70 py-7 px-8 md:px-10 gap-5 md:gap-0 rounded-2xl">
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
              <h2 className="text-sm md:text-xl font-bold">
                Contact information
              </h2>
              <p className="max-w-40 text-center md:text-left md:max-w-71.5 text-xs md:text-base font-inter">
                For inquiries, additional information, or feedback, we welcome
                you to reach out.{" "}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-8 text-white text-base">
              <div className="flex items-center gap-4">
                <PhoneCall size={20} />
                +23486748279421
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} />
                anniqcleo@gmail.com
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={20} />
                Lagos, Nigeria
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-7.5 h-7.5 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer transition-all duration-300 border hover:text-white hover:bg-primary hover:border-white">
                <FaXTwitter size={20} />
              </div>
              <div className="w-7.5 h-7.5 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer transition-all duration-300 border hover:text-white hover:bg-primary hover:border-white">
                <AiFillInstagram size={20} />
              </div>
              <div className="w-7.5 h-7.5 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer transition-all duration-300 border hover:text-white hover:bg-primary hover:border-white">
                <FaTiktok size={20} />
              </div>
            </div>
            <img
              src="/images/contact-bg.png"
              alt="Contact Background"
              className="absolute bottom-0 right-0 w-25 h-25 md:w-50 md:h-50 object-cover z-0"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full md:w-80 lg:w-111.5 flex flex-col items-start gap-8 text-[#8E8E93] text-sm md:text-base">
              <div className="w-full flex flex-col items-start gap-4">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="w-full px-2 py-2 pb-1 border-b border-[#8E8E93] outline-none"
                />
                <ValidationError
                  prefix="Full Name"
                  field="full_name"
                  errors={state.errors}
                />
              </div>
              <div className="w-full flex flex-col items-start gap-4">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="w-full px-2 pt-2 pb-1 border-b border-[#8E8E93] outline-none"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div className="w-full flex flex-col items-start gap-4">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="w-full px-2 pt-2 pb-1 border-b border-[#8E8E93] outline-none"
                />
                <ValidationError
                  prefix="Phone Number"
                  field="phone_number"
                  errors={state.errors}
                />
              </div>
              <div className="w-full flex flex-col items-start gap-4">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="w-full md:h-25 px-3 py-2 rounded-2xl border border-[#8E8E93]"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={state.submitting || state.succeeded}
                  className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-primary/70"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
                {state.succeeded && (
                  <p className="text-green-500 text-xs md:text-sm">
                    Thanks! Your submission has been sent.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
