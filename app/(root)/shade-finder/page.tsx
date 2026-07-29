"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  shadeFamilies,
  undertones,
  getFilteredShades,
  type FilteredShade,
  type ShadeFamilyId,
  type UndertoneId,
} from "@/lib/shadeFinderData";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const stepLabels = ["Shade Family", "Undertone", "Shade Depth"];

export default function ShadeFinder() {
  const [step, setStep] = useState(0);
  const [selectedFamily, setSelectedFamily] = useState<ShadeFamilyId>("fair");
  const [selectedUndertone, setSelectedUndertone] =
    useState<UndertoneId | null>(null);
  const [selectedShade, setSelectedShade] = useState<FilteredShade | null>(
    null,
  );

  const reset = () => {
    setStep(0);
    setSelectedFamily("fair");
    setSelectedUndertone(null);
    setSelectedShade(null);
  };

  const filteredShades =
    selectedFamily && selectedUndertone
      ? getFilteredShades(selectedFamily, selectedUndertone)
      : [];

  const familyData = shadeFamilies.find((f) => f.id === selectedFamily);
  const undertoneData = undertones.find((u) => u.id === selectedUndertone);

  return (
    <div className="min-h-[80vh] bg-primary/5">
      {/* Tab indicators */}
      {step > 0 && step < 4 && (
        <div className="max-w-2xl mx-auto px-4 pt-25">
          <div className="flex items-center justify-center">
            {stepLabels.map((label, i) => (
              <div key={i} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i + 1 === step
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : i + 1 < step
                          ? "bg-green-500 text-white"
                          : "bg-neutral-100 text-neutral-400"
                    }`}
                  >
                    {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:inline ${i + 1 === step ? "text-neutral-900" : "text-neutral-400"}`}
                  >
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`w-6 sm:w-10 h-px mx-1 sm:mx-3 ${i + 1 < step ? "bg-green-500" : "bg-neutral-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Intro */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 py-25 md:py-20 text-center flex flex-col md:flex-row items-center md:justify-between gap-7 md:gap-4"
          >
            <div className="max-w-121 flex flex-col items-center text-left">
              <h1 className="w-full text-primary text-left text-sm md:text-3xl mb-4">
                Discover Your Perfect Match
              </h1>
              <p className="text-secondary text-sm md:text-xl mb-6">
                Find your best shade match for the True to Myself Natural Matte
                Longwear Foundation in just 4 simple steps.
              </p>
              <div className="w-full flex flex-col md:flex-row gap-2.5 mt-2">
                <Button
                  onClick={() => setStep(1)}
                  className="w-full md:w-80 h-8 bg-primary flex items-center justify-center gap-1.5 py-4 px-4 text-sm md:text-base text-white font-semibold rounded-2xl shadow-md cursor-pointer transition-all duration-300 hover:bg-primary/70 hover:gap-2.5"
                >
                  MATCH ME
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
            <Image
              src="/images/shade-hero.avif"
              alt="Anniqcleo Products"
              width={500}
              height={500}
              className="object-cover"
            />
          </motion.div>
        )}

        {/* Step 1: Shade Family */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-5xl mx-auto px-4 py-8"
          >
            <h2 className="font-display text-2xl font-bold text-center mb-2">
              Which shade family best represents your skin tone?
            </h2>
            <p className="text-neutral-500 text-center mb-8">
              Select the range that looks closest to you
            </p>

            <div className="grid md:grid-cols-5 gap-6">
              {/* Left: Color grid */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-3">
                  {shadeFamilies.map((family) => (
                    <button
                      key={family.id}
                      onClick={() => setSelectedFamily(family.id)}
                      className={`p-3 rounded-2xl cursor-pointer border-2 transition-all text-center ${
                        selectedFamily === family.id
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-neutral-100 hover:border-neutral-200"
                      }`}
                    >
                      <div
                        className="w-full h-14 rounded-xl mb-2 shadow-sm"
                        style={{ backgroundColor: family.color }}
                      />
                      <p className="font-semibold text-sm text-neutral-900">
                        {family.name}
                      </p>
                      <p className="text-xs text-neutral-400">{family.range}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Selected family collage image */}
              <div className="md:col-span-3">
                <div className="rounded-3xl overflow-hidden bg-white border border-neutral-100 shadow-sm">
                  <img
                    src={familyData?.collageImage}
                    alt={`${familyData?.name} shades`}
                    className="w-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl font-bold">
                      {familyData?.name}
                    </p>
                    <p className="text-sm text-neutral-400">
                      {familyData?.range}
                    </p>
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    className="rounded-full bg-primary hover:bg-primary/90 cursor-pointer"
                  >
                    Continue <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Undertone */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-3xl mx-auto px-4 py-8"
          >
            <button
              onClick={() => setStep(1)}
              className="text-sm cursor-pointer text-neutral-500 hover:text-neutral-900 flex items-center mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <h2 className="font-display text-2xl font-bold text-center">
              What's your undertone?
            </h2>
            <p className="text-neutral-500 text-center mt-2 mb-8">
              Choose the description that best describes your skin
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {undertones.map((ut) => (
                <button
                  key={ut.id}
                  onClick={() => {
                    setSelectedUndertone(ut.id);
                    setStep(3);
                  }}
                  className={`text-left p-6 bg-white cursor-pointer rounded-3xl border-2 transition-all shadow-md hover:shadow-lg ${
                    selectedUndertone === ut.id
                      ? "border-primary shadow-lg bg-primary/5"
                      : "border-neutral-100 hover:border-neutral-200"
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-full mb-4 border-4 border-white shadow-lg"
                    style={{ backgroundColor: ut.color }}
                  />
                  <h3 className="text-black font-semibold text-lg mb-2">
                    {ut.name}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {ut.description}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Shade Depth */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-4xl mx-auto px-4"
          >
            <button
              onClick={() => setStep(2)}
              className="text-sm cursor-pointer text-neutral-500 hover:text-neutral-900 flex items-center my-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <h2 className="font-display text-2xl font-bold text-center">
              Which skin tone is closest to yours?
            </h2>
            <p className="text-neutral-500 text-center mt-2">
              Showing{" "}
              <span className="font-medium text-primary">
                {familyData?.name}
              </span>{" "}
              shades with{" "}
              <span className="font-medium text-primary">
                {undertoneData?.name}
              </span>{" "}
              undertone
            </p>
            <p className="text-sm text-neutral-400 text-center mb-8">
              Choose the one that best matches you
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {filteredShades.map((shade) => (
                <button
                  key={shade.number}
                  onClick={() => {
                    setSelectedShade(shade);
                    setStep(4);
                  }}
                  className="group rounded-3xl cursor-pointer overflow-hidden border-2 border-neutral-100 hover:border-primary hover:shadow-xl transition-all"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={shade.image}
                      alt={`Shade ${shade.number}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow flex-shrink-0"
                      style={{ backgroundColor: shade.color }}
                    />
                    <div className="text-left">
                      <h3 className="text-primary font-semibold">
                        Shade {shade.number}
                      </h3>
                      <p className="text-xs text-neutral-400 capitalize">
                        {shade.undertone} undertone
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Result */}
        {step === 4 && selectedShade && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg mx-auto px-4 pt-25 pb-12 text-center"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl mb-6 max-w-xs mx-auto">
              <img
                src={selectedShade.image}
                alt={`Shade ${selectedShade.number}`}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-2">
              Your Perfect Match
            </p>
            <h2 className="font-display text-3xl font-bold text-black">
              Shade {selectedShade.number}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: selectedShade.color }}
              />
              <p className="text-neutral-500 capitalize">
                {selectedShade.family} · {selectedShade.undertone} Undertone
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 cursor-pointer"
                >
                  Shop Matching Products
                </Button>
              </Link>
              <Button
                onClick={reset}
                size="lg"
                className="rounded-full px-8 cursor-pointer bg-white hover:bg-gray-200 text-black"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Start Over
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
