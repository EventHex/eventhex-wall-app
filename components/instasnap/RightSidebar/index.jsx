"use client";

import React, { useState } from "react";
import SelectSessionModal from "./SelectSessionModal";
import { Maximize2, Settings } from "lucide-react";
import {
  Mabrook,
  MabrookBanner,
  Barcode,
  EventhexFooter,
  InstasnapLogo,
  InstasnapSider,
  Instasnapbackground,
} from "@/public";
import Image from "next/image";
import ShimmerCard from "../shimmer"; // Import your shimmer component

export default function RightSidebar({
  logo,
  Glitter,
  isLogoShow,
  isInstaSnap,
  isLoading = false, // Add loading prop
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInstaRecap = !isInstaSnap; // Opposite of InstaSnap

  return (
    <>
      <SelectSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Main Container with conditional background */}
      <div className="p-5 flex flex-col gap-5 w-full">
        <div className="w-full items-center h-full flex py-5 justify-end">
          <header className="">
            <div className="flex items-center">
              {/* Buttons */}
              <div className="flex gap-2">
                <button className="border border-[#D4D4D4] rounded-xl p-2 transition-all duration-200 hover:scale-105 active:scale-95 bg-[#C3C3C396] text-white hover:bg-white hover:text-black">
                  <Maximize2 className="w-[20px] h-[20px]" />
                </button>
              </div>
            </div>
          </header>
        </div>

        <div
          className="w-full min-h-screen overflow-y-auto rounded-[32px] border border-gray-500 no-scrollbar"
          style={
            isInstaSnap
              ? {
                  backgroundImage: `url(${Instasnapbackground.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
        >
          {/* Content wrapper with proper spacing */}
          <div className="relative z-10 ph-full">
            {/* Conditional rendering: Show shimmer when loading, actual content when not */}
            {isLoading ? (
              <ShimmerCard />
            ) : (
              <div className="border px-[20px]">
                {/* Event Banner Section */}
                <div className="flex flex-col gap-3 py-4">
                  <Image
                    width={600}
                    height={200}
                    src={MabrookBanner}
                    alt="mabrook banner"
                    className="w-full rounded-xl shadow-lg"
                  />

                  {/* Event Details */}
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-[18px] font-[700] text-white">
                      Mabrook Gulf Toppers 2025
                    </h1>
                    <p
                      className="text-center text-[14px] font-[500] 
                       text-[#B1B1B1]" 
                  
                    >
                      12 August 2025 | 9:00 am
                      <br />
                      Royal Convention Centre, Calicut
                    </p>
                  </div>
                </div>

                {/* Barcode Card */}
                <div className="relative mb-6">
                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex flex-col gap-[16px] items-center px-[24px] py-[16px]">
                      <div className="flex flex-col items-center justify-center gap-3 border border-gray-600 rounded-[35px] py-[16px]">
                        {/* Barcode */}
                        <div className="px-[24px] py-[26px] bg-white rounded-[24px] shadow-md">
                          <Image
                            width={146}
                            height={146}
                            src={Barcode}
                            alt="barcode"
                            className="w-[146px]"
                          />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col items-center px-10 justify-center">
                          <h1
                            className="text-[18px] font-[600] 
                         text-white" 
                          
                          >
                            Get Your Photos
                          </h1>
                          <p
                            className={`text-[14px] text-center font-[400] ${
                              isInstaSnap ? "text-[#B1B1B1]" : "text-[#525866]"
                            }`}
                          >
                            Scan to access your personalized photo gallery instantly
                          </p>
                        </div>

                        {/* AI Recognition */}
                        <div className="rounded-[15px] px-[25px] py-[18px] border border-white/30 bg-white/10">
                          <p className="flex items-center justify-center gap-2">
                            <Image
                              width={20}
                              height={20}
                              src={Glitter}
                              className="w-[20px]"
                              alt="glitter"
                            />
                            <span className="text-[14px] font-[500] text-[#B0A3FF]">
                              AI Facial Recognition
                            </span>
                          </p>
                          <p
                            className={`text-[12px] font-[400] ${
                              isInstaSnap ? "text-[#B1B1B1]" : "text-[#525866]"
                            }`}
                          >
                            Automatically find all your photos with AI
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center py-[15px]">
                  <p className="flex items-center justify-center gap-[8px]">
                    <span
                      className={`text-[12px] font-[400] ${
                        isInstaSnap ? "text-[#B1B1B1]" : "text-[#989898]"
                      }`}
                    >
                      Powered by
                    </span>
                    <Image src={InstasnapLogo} alt="instansnap logo" />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}