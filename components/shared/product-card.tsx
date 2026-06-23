import { formatToNaira } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  stars: number;
  reviews: number;
  href?: string;
}

const ProductCard = ({
  image,
  name,
  price,
  stars,
  reviews,
  href,
}: ProductCardProps) => {
  const content = (
    <>
      <img
        src={image}
        alt={name}
        className="w-37.5 h-50 md:w-60 md:h-80 object-cover"
      />
      <div className="flex flex-col items-center gap-2.5 font-roboto-mono">
        <h3 className="text-secondary text-sm md:text-xl">{name}</h3>
        <span className="text-[#96959A] text-sm md:text-xl">
          {formatToNaira(price)}
        </span>
        {stars !== 0 && (
          <div className="flex items-center justify-between">
            <img
              src="/images/5star.png"
              alt={`${stars} Stars`}
              className="w-16 h-4 md:w-25 md:h-5"
            />
            <span className="text-[#96959A] text-xs md:text-xl">{`(${reviews} reviews)`}</span>
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex flex-col items-center gap-5 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex flex-col items-center gap-5">{content}</div>;
};

export default ProductCard;
