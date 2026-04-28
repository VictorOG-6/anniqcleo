import { heroContent } from '@/constants/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const About = () => {
  return (
    <main className='pt-20 md:pt-28'>
        <section className='bg-foreground pt-2'>
            <div className='relative max-w-7xl mx-auto flex-col-reverse flex md:flex-row px-5 md:px-0 bg-foreground text-secondary pt-[140px] overflow-hidden'>
                <div className='hidden md:flex flex-col justify-center gap-4'>
                    <p>At Anniqcleo, we believe in the power of nature to nurture and restore your skin. Our products are crafted with the purest organic ingredients, harnessing the gifts of the earth to create a radiant, healthy glow for your skin.</p>
                    <div className='flex items-center gap-6'>
                        <div className='w-12.5 h-12.5 flex rounded-full items-center justify-center bg-secondary text-white transition-colors duration-300 cursor-pointer hover:text-primary hover:bg-white'>
                            <AiFillInstagram size={35}/>
                        </div>
                        <div className='w-12.5 h-12.5 flex rounded-full items-center justify-center bg-secondary text-white transition-colors duration-300 cursor-pointer hover:text-primary hover:bg-white'>
                            <FaYoutube size={35}/>
                        </div>
                        <div className='w-12.5 h-12.5 flex rounded-full items-center justify-center bg-secondary text-white transition-colors duration-300 cursor-pointer hover:text-primary hover:bg-white'>
                            <FaXTwitter size={35}/>
                        </div>
                    </div>
                </div>
                <img src="/images/ceo.avif" alt="Annabel Odiete Chi" className='w-[380px] h-[450px] md:w-[415px] md:h-[492px] relative z-10'/>
                <div className='flex flex-col justify-end gap-4 text-secondary text-sm md:text-base md:mb-20'>
                    <p>My vision is “To redefine online fashion shopping by merging style and technology, empowering everyone to confidently explore, try, and wear what suits them best anytime, anywhere</p>
                    <h2 className='font-inter font-bold'>~CEO, ANNABEL ODIETE CHI</h2>
                </div>
                <h1 className='text-[60px] md:text-[120px] lg:text-[207px] text-center text-primary/45 relative md:absolute md:top-2 md:left-1/2 md:-translate-x-1/2 z-0 mb-5 md:mb-0'>ANNIQCLEO</h1>
            </div>
        </section>
        <section className="max-w-7xl mx-auto flex flex-col gap-8 items-center py-20 px-5 md:px-10">
          <h1 className="text-primary text-center text-sm md:text-3xl">
            How we do things, the Anniqcleo way
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-y-7 lg:gap-y-0 text-secondary text-sm md:text-xl font-bold text-center">
            {heroContent.map((item, index) => (
              <div key={index} className="flex flex-col gap-3 items-center">
                <img
                  src={`/images/icon${index + 1}.png`}
                  alt={item}
                  className="w-33.75 h-30 md:w-37.75 md:h-33.75"
                />
                <p className="max-w-55.75">{item}</p>
              </div>
            ))}
          </div>
      </section>
      <section className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between py-20 px-5 md:px-0'>
            <div className='max-w-[526px] flex flex-col items-center md:items-start text-center md:text-left'>
                <h1 className='text-primary text-sm md:text-3xl mb-4 md:mb-7'>The Brand</h1>
                <p className='text-secondary text-sm md:text-xl mb-6 md:mb-11'>Shop our At Anniqcleo, we believe in the power of nature to nurture and restore your skin. Our products are crafted with the purest organic ingredients, harnessing the gifts of the earth to create a radiant, healthy glow for your skin. range of botanical powered skincare essentials.</p>
                <div className='flex items-center gap-7'>
                    <div className='space-y-6'>
                        <h3 className='text-primary text-sm md:text-3xl'>50</h3>
                        <p className='text-xs md:text-xl text-secondary font-bold'>Ingredients</p>
                    </div>
                    <div className='space-y-6'>
                        <h3 className='text-primary text-sm md:text-3xl'>2</h3>
                        <p className='text-xs md:text-xl text-secondary font-bold'>Countries</p>
                    </div>
                    <div className='space-y-6'>
                        <h3 className='text-primary text-sm md:text-3xl'>2yr</h3>
                        <p className='text-xs md:text-xl text-secondary font-bold'>R&D</p>
                    </div>
                </div>
            </div>
            <div className='relative'>
                <img src="/images/about-hero.avif" alt="About Anniqcleo" className='w-full md:w-[556px] md:h-[482px] object-cover' />
                <img src="/images/shopping-bag.png" alt="Anniqcleo Shopping Bag" className='absolute md:w-[371px] md:h-[266px] z-10 -bottom-1/3 md:-bottom-1/4 right-0' />
            </div>
      </section>
      <section className="py-20 px-5 md:px-0">
        <div
          className="max-w-7xl mx-auto flex items-center justify-center py-10 md:py-36"
          style={{
            backgroundImage: 'url("/images/about-cta.avif")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col items-center text-center gap-6 md:gap-16 text-white">
            <h1 className="text-base md:text-5xl lg:leading-[58px]">Your Journey To <br /> <span className='text-primary font-bold italic'>Beautiful Skin</span> <br /> Starts Here</h1>
            <Link
              href={"/shop"}
              className="bg-primary flex items-center justify-center gap-2.5 py-4 md:py-7 pl-7 pr-7 md:pr-12 text-sm md:text-2xl text-white font-semibold rounded-2xl mt-2 shadow-md cursor-pointer transition-all duration-300 hover:gap-3"
            >
              Explore Collection
              <ArrowRight size={30} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About