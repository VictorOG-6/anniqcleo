import { featuredProducts } from "@/constants/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import ProductCard from "./product-card";

const FeaturedProducts = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-5 md:px-0 overflow-hidden">
      <div className="flex items-center justify-between text-primary mb-25">
        <h1 className="text-sm md:text-3xl font-roboto-mono">Anniqcleo Featured</h1>
        <div className="flex items-center gap-2.5">
          <ChevronLeft className="cursor-pointer" size={40} />
          <div className="w-0.5 h-4 bg-[#D9D9D9]" />
          <ChevronRight className="cursor-pointer" size={40} />
        </div>
      </div>
      <div className="flex items-center gap-6 md:gap-10">
        {featuredProducts.map((item) => (
          <ProductCard
            key={item.name}
            name={item.name}
            image={item.image}
            price={item.price}
            reviews={item.reviews}
            stars={5}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
