"use client";

import React, { useState } from "react";
import SelectSessionModal from "./SelectSessionModal";
import { Maximize2, Settings } from "lucide-react";
import { Mabrook, MabrookBanner, Barcode, EventhexFooter } from "@/public";
import Image from "next/image";

export default function RightSidebar({ Glitter, isLogoShow, isInstaSnap }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInstaRecap = !isInstaSnap; // Opposite of InstaSnap

  return (
    <>
      <SelectSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="w-full px-[56px] border border-l border-[#D4D4D4] border-t-0 border-b-0 border-r-0 overflow-y-auto no-scrollbar">
        
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
                className={`border border-[#D4D4D4] rounded-xl p-2 transition-all duration-200 hover:scale-105 active:scale-95
                  ${isInstaRecap ? "bg-white text-black hover:bg-black hover:text-white" : "bg-black text-white hover:bg-white hover:text-black"}
                `}
              >
                <Maximize2
                  className={'w-[20px] h-[20px] '}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Banner */}
        <div className="flex flex-col gap-3 py-4">
          <Image
            width={600}
            height={200}
            src={MabrookBanner}
            alt="mabrook banner"
            className="w-full rounded-xl"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[18px] font-[700]">Mabrook Gulf Toppers 2025</h1>
            <p className="text-center text-[14px] font-[500] text-[#525866]">
              12 August 2025 | 9:00 am
              <br />
              Royal Convention Centre, Calicut
            </p>
          </div>
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
                <h1 className="text-[18px] font-[600]">Get Your Photos</h1>
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
        <div className="flex items-center justify-center py-[15px]">
          <p className="flex items-center justify-center gap-[8px]">
            <span className="text-[12px] font-[400]">Powered by</span>
            <Image src={EventhexFooter} alt="eventhex footer" />
          </p>
        </div>
      </div>
    </>
  );
}
