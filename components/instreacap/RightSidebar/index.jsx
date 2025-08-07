"use client";

import React, { useState } from "react";
import SelectSessionModal from "./SelectSessionModal";
import { Maximize2, Settings, Sparkle } from "lucide-react";
import {
  Mabrook,
  MabrookBanner,
  Barcode,
  EventhexFooter,
} from "@/public";
import Image from "next/image";

export default function RightSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SelectSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="w-[30%] px-[56px]  border  border-l  border-[#D4D4D4] border-t-0 border-b-0 border-r-0 overflow-y-auto no-scrollbar">
        <header className="  px-6 pt-[28px] pb-2">
          <div className=" mx-auto flex justify-between items-center">
            <Image
              width={100}
              height={100}
              src={Mabrook}
              alt="mabrook"
              className="w-[118px] "
            />
            <div className="flex gap-2">
              <button
                className="border border-[#D4D4D4] rounded-xl p-2"
                onClick={() => setIsModalOpen(true)}
              >
                <Settings className="w-[20px] h-[20px]" />
              </button>
              <button className="border border-[#D4D4D4] rounded-xl p-2">
                <Maximize2 className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        </header>

        <div className="px-6 flex flex-col gap-3 py-4">
          <Image
            width={100}
            height={100}
            src={MabrookBanner}
            alt="mabrook banner"
            className="w-full rounded-xl"
          />

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[18px] font-[700]">
              Mabrook Gulf Toppers 2025
            </h1>
            <p className="text-center text-[14px] font-[500] text-[#525866]">
              12 Augest 2025 | 9:00 am
              <br />
              Royal Convention Centre, Calicut
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Background blur overlay */}
          <div className="absolute inset-0 backdrop-blur-lg bg-white/20 rounded-[35px]"></div>

          {/* Original content with relative positioning */}
          <div className="relative border border-[#C7D0FF96] rounded-[35px]  backdrop-blur-md">
            <div className="flex justify-center flex-col gap-[16px] items-center">
              {/* first card */}
              <div className=" flex flex-col px-[24px] gap-[16px] items-center justify-center py-[16px]">
                <div className="px-[24px] py-[26px] bg-white rounded-[24px]">
                  <Image
                    width={100}
                    height={100}
                    src={Barcode}
                    alt="barcode"
                    className="w-[146px]"
                  />
                </div>

                {/* second card */}
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-[18px] font-[600]">Get Your Photos</h1>
                  <p className="text-[14px] text-center font-[400] text-[#525866]">
                    Scan to access your personalized photo gallery instantly
                  </p>
                </div>
                {/* third card */}
                <div className="border  border-[#C7D0FF96] rounded-[15px]">
                  <div className="px-[25px] py-[18px]">
                    <p className="flex items-center justify-center">
                      <Sparkle className="w-[14px]" color="#181fec" />
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
          </div>
        </div>

        <div className="flex items-center justify-center py-[15px]">
          <p className="flex  items-center justify-center gap-[8px]">
            <span className="text-[12px]  flex items-center  justify-center font-[400]">
              Powered by
            </span>
            <Image src={EventhexFooter} alt="eventhex footer" />
          </p>
        </div>
      </div>
    </>
  );
}
