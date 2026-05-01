"use client";

import { SquarePlay, Tv, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

const VIDEO_SOURCES = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
] as const;

const MediaPlayer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [videoIndex, setVideoIndex] = useState(0);

  const handleVideoEnded = useCallback(() => {
    setVideoIndex((i) => (i + 1) % VIDEO_SOURCES.length);
  }, []);

  return (
    <div className="fixed z-50 bottom-5 right-8">
      {isOpen ? (
        <div className="relative w-[235px] bg-black shadow-2xl rounded-lg">
          <div className="flex items-center justify-center gap-2.5 p-2.5 text-white">
            <Tv size={20} />
            <h2 className="text-sm font-semibold font-roboto-mono">
              Anniqcleo TV
            </h2>
          </div>
          <video
            key={videoIndex}
            src={VIDEO_SOURCES[videoIndex]}
            className="h-[269px] w-full object-cover"
            autoPlay
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
          />
          <div className="flex items-center justify-center gap-3 p-2.5 text-white transition-all duration-300 ">
            <FaXTwitter
              size={20}
              className="cursor-pointer hover:text-primary"
            />
            <AiFillInstagram
              size={20}
              className="cursor-pointer hover:text-primary"
            />
            <FaTiktok size={20} className="cursor-pointer hover:text-primary" />
          </div>
          <div
            className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-white cursor-pointer stransition-all duration-300 bg-black hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </div>
        </div>
      ) : (
        <div
          className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer border transition-all duration-300 hover:bg-white hover:text-primary hover:border-primary shadow-2xl"
          onClick={() => setIsOpen(true)}
        >
          <SquarePlay size={20} />
        </div>
      )}
    </div>
  );
};

export default MediaPlayer;
