"use client";

import React, { useEffect, useState } from "react";
import SelectSessionModal from "./SelectSessionModal";
import { Maximize2, Minimize2, Settings } from "lucide-react";
import {
  Mabrook,
  MabrookBanner,
  Barcode,
  EventhexFooter,
  InstasnapLogo,
  InstasnapSider,
} from "@/public";
import Image from "next/image";

export default function RightSidebar({
  logo,
  Glitter,
  isLogoShow,
  isInstaSnap,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isInstaRecap = !isInstaSnap; // Opposite of InstaSnap

  useEffect(() => {
    const updateIsFullscreen = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(Boolean(fsElement));
    };

    document.addEventListener("fullscreenchange", updateIsFullscreen);
    document.addEventListener("webkitfullscreenchange", updateIsFullscreen);
    document.addEventListener("mozfullscreenchange", updateIsFullscreen);
    document.addEventListener("MSFullscreenChange", updateIsFullscreen);

    updateIsFullscreen();

    return () => {
      document.removeEventListener("fullscreenchange", updateIsFullscreen);
      document.removeEventListener("webkitfullscreenchange", updateIsFullscreen);
      document.removeEventListener("mozfullscreenchange", updateIsFullscreen);
      document.removeEventListener("MSFullscreenChange", updateIsFullscreen);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (typeof document === "undefined") return;
    try {
      const isCurrentlyFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      if (isCurrentlyFullscreen) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) await document.mozCancelFullScreen();
        else if (document.msExitFullscreen) await document.msExitFullscreen();
      } else {
        const rootElement = document.documentElement;
        if (rootElement.requestFullscreen) await rootElement.requestFullscreen();
        else if (rootElement.webkitRequestFullscreen) await rootElement.webkitRequestFullscreen();
        else if (rootElement.mozRequestFullScreen) await rootElement.mozRequestFullScreen();
        else if (rootElement.msRequestFullscreen) await rootElement.msRequestFullscreen();
      }
    } catch (err) {
      // ignore
    }
  };

  return (
    <>
      <SelectSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div 
      className="w-full  overflow-y-auto no-scrollbar">
        {/* Header */}
        <header className="px-6 pt-[28px] pb-2">
          <div
            className={`mx-auto flex items-center ${
              isLogoShow ? "justify-between" : "justify-end"
            }`}
          >
            {/* Logo */}
            <Image
              width={118}
              height={118}
              src={Mabrook}
              alt="mabrook"
              className={`${isLogoShow ? "block" : "hidden"}`}
            />

            {/* Buttons */}
            <div className="flex gap-2">
              {isLogoShow && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border border-[#D4D4D4] rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95"
                >
                  <Settings className="w-[20px] h-[20px]" />
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className={`border border-[#D4D4D4] rounded-xl p-2 transition-all duration-200 hover:scale-105 active:scale-95
                  ${
                    isInstaRecap
                      ? "bg-white text-black hover:bg-black hover:text-white"
                      : "bg-[#C3C3C396] text-white hover:bg-white hover:text-black"
                  }
                `}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-[20px] h-[20px]" />
                ) : (
                  <Maximize2 className="w-[20px] h-[20px]" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div 


style={
  isInstaSnap
    ? {
        backgroundImage: `url(${InstasnapSider.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {}
}
         className="">
        <div className="flex flex-col gap-3 px-4 py-4">
          <Image
            width={600}
            height={200}
            src={MabrookBanner}
            alt="mabrook banner"
            className="w-full rounded-xl"
          />
          <div className=" flex flex-col gap-5 px-12">
          <div className="flex flex-col justify-center items-center">
            <h1
              className={`   ${
                isInstaSnap ? "text-white" : ""
              } text-[18px] font-[700]`}
            >
              Mabrook Gulf Toppers 2025
            </h1>
            <p
              className="text-[#B1B1B1]    text-center text-[14px] font-[500]"
            >
              12 August 2025 | 9:00 am
              <br />
              Royal Convention Centre, Calicut
            </p>
          </div>
      

        {/* Barcode Card */}
        <div className="relative">
          {/* Background blur overlay */}
          <div className="absolute inset-0 backdrop-blur-lg bg-white/20 rounded-[35px]"></div>

          {/* Original content */}
          <div className="relative border border-[#C7D0FF96] rounded-[35px] backdrop-blur-md">
            <div className="flex flex-col gap-[16px] items-center px-[24px] py-[16px]">
              {/* Barcode */}
              <div className="px-[24px] py-[26px] bg-white rounded-[24px]">
                <Image
                  width={146}
                  height={146}
                  src={Barcode}
                  alt="barcode"
                  className="w-[146px]"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-[18px] text-[#375DFB] font-[600]">Get Your Photos</h1>
                <p className="text-[14px] text-center font-[400] text-[#525866]">
                  Scan to access your personalized photo gallery instantly
                </p>
              </div>

              {/* AI Recognition */}
              <div className="border border-[#C7D0FF96] rounded-[15px] px-[25px] py-[18px]">
                <p className="flex items-center justify-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    src={Glitter}
                    className="w-[20px]"
                    alt="glitter"
                  />
                  <span className="text-[14px] font-[500] text-[#181fec]">
                    AI Facial Recognition
                  </span>
                </p>
                <p className="text-[12px] font-[400] text-[#525866]">
                  Automatically find all your photos with AI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center ">
          <p className="flex items-center justify-center gap-[8px]">
            <span className= "text-[#989898]text-black text-[12px] font-[400]">Powered by</span>
            {isInstaSnap ? (
              <Image src={InstasnapLogo} alt=" eventlogo" />
            ) : (
              <Image src={EventhexFooter} alt="eventhex footer" />
            )}
          </p>
        </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}
