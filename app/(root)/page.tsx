import FeaturedProducts from "@/components/shared/featured-products";
import OtherProducts from "@/components/shared/other-products";
import TextBanner from "@/components/shared/text-banner";
import { heroContent } from "@/constants/data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Home() {
  return (
    <main className="pt-20 md:pt-28">
      <section className="relative overflow-hidden max-w-7xl mx-auto px-5 md:px-0 py-20 md:py-25 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-121 flex flex-col items-center md:items-start gap-3 md:gap-4 text-secondary">
          <h2 className="font-roboto-mono text-sm md:text-xl">
            Discover the Nature with
          </h2>
          <h1 className="font-roboto-mono text-primary text-5xl md:text-[90px] font-medium">
            ANNIQCLEO
          </h1>
          <p className="text-sm md:text-base">
            At Anniqcleo, we believe in the power of nature to nurture and
            restore your skin. Our products are crafted with the purest organic
            ingredients, harnessing the gifts of the earth to create a radiant,
            healthy glow for your skin.
          </p>
          <Link
            href={"/shop"}
            className="bg-primary flex items-center justify-center gap-2.5 py-2.5 md:py-4 px-7 text-sm md:text-xl text-white font-semibold rounded-2xl mt-2 shadow-md cursor-pointer transition-all duration-300 hover:bg-primary/70 hover:gap-3"
          >
            Explore Collection
            <ArrowRight size={25} />
          </Link>
        </div>
        <Image
          src="/images/hero-img.avif"
          alt="Anniqcleo Products"
          width={394}
          height={378}
        />
        <img
          src={"/images/hero-bg.png"}
          alt="Hero Background Content"
          className="h-150 w-190.25 absolute top-4 -right-50 -z-1"
        />
      </section>
      <section className="bg-foreground w-screen">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 items-center pt-7 pb-20 px-5 md:px-10">
          <h1 className="font-roboto-mono text-primary text-center text-sm md:text-3xl">
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
                <p className="max-w-55.75 font-roboto-mono">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto flex flex-col gap-20 py-20 px-5 md:px-0">
        <div className="flex flex-col items-center text-center gap-2.5 md:gap-5">
          <h1 className="text-primary text-sm md:text-3xl font-roboto-mono">
            Anniqcleo Essentials
          </h1>
          <p className="text-secondary text-xs md:text-xl">
            Your skin problems, solved here
          </p>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-12">
            <Link
              href={"/shop"}
              className="relative cursor-pointer overflow-hidden rounded-[40px]"
            >
              <img
                src="/images/product1.avif"
                alt="Anniqcleo Glow Body Scrub"
                className="w-full h-48.75 md:w-121.25 md:h-61.75 transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 text-white z-10 pl-4 pb-5">
                <h2 className="font-semibold text-sm md:text-xl">
                  Glow Body Scrub
                </h2>
                <p className="text-xs md:text-base max-w-101.75">
                  Packed with rich, natural ingredients that go beyond the
                  surface deeply cleansing and nourishing your skin
                </p>
              </div>
            </Link>
            <Link
              href={"/shop"}
              className="relative cursor-pointer overflow-hidden rounded-[40px]"
            >
              <img
                src="/images/product2.avif"
                alt="Anniqcleo Lip Care Kits"
                className="w-full h-48.75 md:w-121.25 md:h-61.75 transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 text-white z-10 pl-4 pb-5">
                <h2 className="font-semibold text-sm md:text-xl">
                  Lip Care Kits
                </h2>
                <p className="text-xs md:text-base max-w-101.75">
                  Designed to leave your lips soft, smooth, hydrated, and deeply
                  moisturized
                </p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-7">
            <Link
              href={"/shop"}
              className="relative cursor-pointer overflow-hidden rounded-[40px] w-full md:w-fit"
            >
              <img
                src="/images/product3.avif"
                alt="Anniqcleo Glow Body Oil"
                className="w-full h-48.75 md:w-157.5 md:h-94.25 transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 text-white z-10 pl-4 pb-5">
                <h2 className="font-semibold text-sm md:text-xl">
                  Glow Body Oil
                </h2>
                <p className="text-xs md:text-base max-w-101.75">
                  Designed to give you that soft, radiant, “lit-from-within”
                  glow, this shimmer melts into your skin, leaving it smooth,
                  hydrated, and effortlessly luminous.
                </p>
              </div>
            </Link>
            <Link
              href={"/shop"}
              className="relative cursor-pointer overflow-hidden rounded-[40px] w-full md:w-fit"
            >
              <img
                src="/images/product4.avif"
                alt="Anniqcleo Brow Kits"
                className="w-full h-48.75 md:w-90.75 md:h-94.25 transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 text-white z-10 pl-4 pb-5">
                <h2 className="font-semibold text-sm md:text-xl">Brow Kits</h2>
                <p className="text-xs md:text-base max-w-101.75">
                  Designed to give you that bold, flawless finish with just one
                  stroke
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <TextBanner />
      <section className="pt-25 pb-5 md:pb-25 px-5 md:px-0">
        <div
          className="max-w-7xl mx-auto flex items-center justify-center py-10 md:py-36"
          style={{
            backgroundImage: 'url("/images/cta.avif")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col items-center text-center gap-3 md:gap-6 text-white font-roboto-mono">
            <h1 className="text-base md:text-5xl">Protect.Repair.Strengthen</h1>
            <p className="text-sm md:text-2xl">
              Glow isn’t just skin deep, it’s self-care in action
            </p>
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
      <FeaturedProducts />
      <TextBanner />
      <section className="max-w-7xl mx-auto pt-20 pb-5 md:pb-20 px-5 md:px-0">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 text-primary mb-20">
          <h1 className="text-sm md:text-3xl font-roboto-mono">
            Made for you, loved by you
          </h1>
          <div className="flex items-center gap-3 text-primary text-xs md:text-sm">
            <p className="font-bold font-roboto-mono">Follow the glow</p>
            <div className="bg-[#D9D9D9] w-0.5 h-4" />
            <FaInstagram size={24} className="cursor-pointer" />
            <div className="bg-[#D9D9D9] w-0.5 h-4" />
            <FaTiktok size={24} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0">
          <img
            src="/images/model1.avif"
            alt="Anniqcleo Model"
            className="w-full h-99 md:w-139.5 md:h-150.5"
          />
          <div className="flex flex-col items-center gap-8">
            <img
              src="/images/model2.avif"
              alt="Anniqcleo Model 2"
              className="w-full h-99 md:w-138 md:h-71.75"
            />
            <img
              src="/images/model3.avif"
              alt="Anniqcleo Model 3"
              className="w-full h-99 md:w-138 md:h-71.75"
            />
          </div>
        </div>
      </section>
      <OtherProducts />
    </main>
  );
}
