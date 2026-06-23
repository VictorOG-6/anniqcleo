"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import EfficacySpectrum from "@/components/shared/efficacy-spectrum";
import UserAvatar from "@/components/shared/user-avatar";
import ReviewModal from "@/components/shared/review-modal";
import { useUserContext } from "@/contexts/user/user-context";
import useFetchEligibleProducts from "@/hooks/review/use-fetch-eligible-products";
import Link from "next/link";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

const Review = () => {
  const { user } = useUserContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { data: eligibleProducts = [] } = useFetchEligibleProducts({
    page_size: 10,
    page: 1,
  });

  const handleOpenReviewModal = (product: Product) => {
    setSelectedProduct(product);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedProduct(null);
  };

  if (!user) return null;

  if (eligibleProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-20">
        <p className="text-sm text-muted-foreground">
          You don&apos;t have any eligible products to review.
        </p>
        <Link
          href="/shop"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div>
      <header className="relative overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <motion.img
            src="/images/review-hero.avif"
            alt="Review Hero"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />

          <div className="absolute bottom-0 inset-x-0 px-6 md:px-16 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Community Verified · 120 Reports
              </p>
              <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] font-light tracking-[-0.02em] text-foreground leading-[1.1]">
                The Anniqcleo Archive
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Efficacy Spectrum */}
        <div className="px-6 md:px-16 py-10 border-b border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-8">
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-5xl font-light text-foreground">
                  4.7
                </span>
                <div
                  className="flex gap-1"
                  aria-label={`Average rating 4.7 out of 5`}
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i <= Math.round(4.7) ? "bg-foreground" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  Based on 120 reviews
                </span>
              </div>
            </div>
            <EfficacySpectrum
              productEffectiveness={92}
              quality={90}
              customerSatisfaction={95}
            />
          </motion.div>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-0 md:px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-2xl font-light text-foreground">
            Result Archive
          </h2>
          <p className="text-sm text-muted-foreground">
            UNEDITED TRANSFORMATIONS · 5 RESULTS DOCUMENTED
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-0 md:px-5">
        <div className="flex items-center gap-3">
          <UserAvatar
            name={user.name}
            seed={user.email}
            src={user.profile_image_url}
            size="sm"
            className="shadow-sm"
          />
          <div>
            <h3 className="text-sm font-medium">{user.name}</h3>
            <p className="text-xs text-muted-foreground">
              Leave a review, share your experience.
            </p>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-50" />
      </section>
      <section className="max-w-7xl mx-auto px-0 md:px-5 py-5">
        {eligibleProducts.map((product: Product) => (
          <div key={product.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-10 h-10 rounded-2xl object-cover"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {product.category}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => handleOpenReviewModal(product)}
                className="bg-primary px-2 py-1 flex items-center justify-center text-white rounded-lg text-sm cursor-pointer transition-all duration-300 hover:bg-primary/80"
              >
                Leave a review
              </Button>
            </div>
            <div className="py-1.5 px-2 bg-gray-50 flex justify-end">
              <img src="/images/0star.png" alt="0 stars" />
            </div>
          </div>
        ))}
      </section>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default Review;
