import FeaturedProducts from "@/components/shared/featured-products";
import OtherProducts from "@/components/shared/other-products";
import TextBanner from "@/components/shared/text-banner";
import { heroContent } from "@/constants/data";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const essentials = [
  {
    href: "/shop?categories=Scrubs",
    image: "/images/product1.avif",
    alt: "Anniqcleo Glow Body Scrub",
    title: "Glow Body Scrub",
    description:
      "Rich natural ingredients that deeply cleanse and nourish your skin.",
    className: "md:w-[30rem] md:h-[15.5rem]",
  },
  {
    href: "/shop?categories=Lip+Kits",
    image: "/images/product2.avif",
    alt: "Anniqcleo Lip Care Kits",
    title: "Lip Care Kits",
    description: "Soft, smooth, hydrated lips with lasting moisture.",
    className: "md:w-[30rem] md:h-[15.5rem]",
  },
  {
    href: "/shop?categories=Oils",
    image: "/images/product3.avif",
    alt: "Anniqcleo Glow Body Oil",
    title: "Glow Body Oil",
    description:
      "A lit-from-within shimmer that melts in for smooth, luminous skin.",
    className: "md:w-[39rem] md:h-[23.5rem]",
  },
  {
    href: "/shop?categories=Brow+Kits",
    image: "/images/product4.avif",
    alt: "Anniqcleo Brow Kits",
    title: "Brow Kits",
    description: "Bold, flawless brows with a single confident stroke.",
    className: "md:w-[22.5rem] md:h-[23.5rem]",
  },
] as const;

function ProductSpotlight({
  href,
  image,
  alt,
  title,
  description,
  className,
}: (typeof essentials)[number]) {
  return (
    <Link
      href={href}
      className={`group relative block w-full cursor-pointer overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl ${className}`}
    >
      <img
        src={image}
        alt={alt}
        className="h-48.75 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 md:h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 z-10 max-w-[95%] p-5 text-white">
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-white/90 md:text-sm">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="w-full pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 md:pb-24">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.625_0.1592_2.72/0.12),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-32 top-24 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          aria-hidden
        />

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row md:gap-16 md:px-0">
          <div className="flex max-w-xl flex-col items-center gap-4 text-center md:items-start md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
              <Leaf className="size-3.5" aria-hidden />
              Organic · Clean beauty
            </span>
            <p className="font-display text-lg text-secondary md:text-xl">
              Discover nature with
            </p>
            <h1 className="font-display text-5xl font-medium leading-[0.95] text-primary md:text-[5.5rem]">
              Anniqcleo
            </h1>
            <p className="max-w-md text-sm text-secondary/90 md:text-base">
              At Anniqcleo, we believe in the power of nature to nurture and
              restore your skin. Our products are crafted with pure organic
              ingredients to reveal a radiant, healthy glow.
            </p>
            <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:gap-2.5 md:text-base"
              >
                Explore collection
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/shade-finder"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/20 bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-foreground md:text-base"
              >
                <Sparkles size={18} aria-hidden />
                Find my shade
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-md shrink-0 md:max-w-lg">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/25 via-primary/10 to-transparent md:-inset-4"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-black/5 shadow-2xl">
              <Image
                src="/images/hero-img3.jpeg"
                alt="Anniqcleo skincare collection"
                width={494}
                height={478}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-2 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm md:-left-6">
              <p className="font-display text-2xl font-semibold text-primary">
                100%
              </p>
              <p className="text-xs font-medium text-secondary">
                Naturally sourced
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full border-y border-primary/10 bg-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-5 py-14 md:px-10 md:py-16">
          <h2 className="max-w-2xl text-center font-display text-2xl text-primary md:text-4xl">
            How we do things, the Anniqcleo way
          </h2>
          <div className="grid w-full grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {heroContent.map((item, index) => (
              <div
                key={item}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white/60 p-6 shadow-sm ring-1 ring-black/[0.04] transition-shadow hover:shadow-md"
              >
                <img
                  src={`/images/icon${index + 1}.png`}
                  alt=""
                  className="h-24 w-28 object-contain md:h-28 md:w-32"
                />
                <p className="max-w-[14rem] font-display text-lg font-medium leading-snug text-secondary">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essentials */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-0 md:py-24">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <h2 className="font-display text-3xl text-primary md:text-4xl">
            Anniqcleo essentials
          </h2>
          <p className="text-secondary md:text-lg">
            Your skin problems, solved here
          </p>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-12">
            <ProductSpotlight {...essentials[0]} />
            <ProductSpotlight {...essentials[1]} />
          </div>
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-7">
            <ProductSpotlight {...essentials[2]} />
            <ProductSpotlight {...essentials[3]} />
          </div>
        </div>
      </section>

      <TextBanner />

      {/* CTA */}
      <section className="px-5 pb-5 pt-5 md:px-0 md:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/cta.avif")' }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-primary/40 mix-blend-multiply"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"
            aria-hidden
          />
          <div className="relative flex flex-col items-center justify-center px-6 py-16 text-center text-white md:py-32">
            <h2 className="font-display text-3xl md:text-5xl">
              Protect. Repair. Strengthen.
            </h2>
            <p className="mt-4 max-w-lg text-sm text-white/90 md:text-xl">
              Glow isn&apos;t just skin deep—it&apos;s self-care in action.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary shadow-lg transition-all duration-300 hover:gap-3 md:text-lg"
            >
              Explore collection
              <ArrowRight size={22} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <TextBanner />

      {/* Social / community */}
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-0 md:pb-20">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <h2 className="font-display text-3xl text-primary md:text-4xl">
            Made for you, loved by you
          </h2>
          <div className="flex items-center gap-3 text-xs text-primary md:text-sm">
            <p className="font-semibold tracking-wide">Follow the glow</p>
            <span className="h-4 w-px bg-secondary/30" aria-hidden />
            <FaInstagram
              size={22}
              className="cursor-pointer transition-colors hover:text-primary/70"
              aria-label="Instagram"
            />
            <span className="h-4 w-px bg-secondary/30" aria-hidden />
            <FaTiktok
              size={22}
              className="cursor-pointer transition-colors hover:text-primary/70"
              aria-label="TikTok"
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <img
            src="/images/model1.avif"
            alt="Anniqcleo community"
            className="h-99 w-full rounded-3xl object-cover shadow-md ring-1 ring-black/5 md:h-[37.5rem]"
          />
          <div className="flex flex-col gap-6">
            <img
              src="/images/model2.avif"
              alt="Anniqcleo skincare in use"
              className="h-99 w-full rounded-3xl object-cover shadow-md ring-1 ring-black/5 md:h-72"
            />
            <img
              src="/images/model3.avif"
              alt="Anniqcleo glow"
              className="h-99 w-full rounded-3xl object-cover shadow-md ring-1 ring-black/5 md:h-72"
            />
          </div>
        </div>
      </section>

      <OtherProducts />
    </main>
  );
}
