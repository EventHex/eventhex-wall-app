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
  Instasnapbackground,
} from "@/public";
import Image from "next/image";


export default function RightSidebar({
  logo,
  Glitter,
  isLogoShow,
  isInstaSnap,
  eventId,
  eventData,
  domain,
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

  const BASE_CDN = "https://event-manager.syd1.digitaloceanspaces.com/";
  const toAbsoluteCdnUrl = (path) => {
    if (!path || typeof path !== "string") return null;
    if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
    const base = BASE_CDN.replace(/\/+$/, "");
    const key = path.replace(/^\/+/, "");
    return `${base}/${key}`;
  };

  const formatDateTime = (iso, tz = "Asia/Kolkata") => {
    if (!iso) return null;
    const d = new Date(iso);
    const date = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: tz,
    });
    const time = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: tz,
    }).toLowerCase();
    return `${date} | ${time}`;
  };

  const bannerSrc = toAbsoluteCdnUrl(eventData?.banner) || MabrookBanner;
  const titleText = eventData?.title || "Mabrook Gulf Toppers 2025";
  const subText = `${formatDateTime(eventData?.startDate, eventData?.timezone)}${
    eventData?.venue ? `\n${eventData.venue}` : ""
  }`;

  const resolveOrigin = () => {
    const raw = domain || (typeof window !== "undefined" ? window.location.origin : "");
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw.replace(/\/$/, "");
    return `https://${raw.replace(/\/$/, "")}`;
  };
  const qrTarget = `${resolveOrigin()}/instasnap`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=146x146&data=${encodeURIComponent(
    qrTarget
  )}`;

  return (
    <>
      <SelectSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventId={eventId}
      />

      {/* Main Container with conditional background */}
      <div className="p-5 flex flex-col gap-5 w-full">
        <div className="w-full items-center h-full flex py-5 justify-end">
          <header className="">
            <div className="flex items-center">
              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="border border-[#D4D4D4] rounded-xl p-2 transition-all duration-200 hover:scale-105 active:scale-95 bg-[#C3C3C396] text-white hover:bg-white hover:text-black"
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
         
              <div className="border px-[20px]">
                {/* Event Banner Section */}
                <div className="flex flex-col gap-3 py-4">
                  <Image
                    width={600}
                    height={200}
                    src={bannerSrc}
                    alt="event banner"
                    className="w-full rounded-xl shadow-lg"
                    unoptimized
                  />

                  {/* Event Details */}
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-[18px] font-[700] text-white">{titleText}</h1>
                    <p
                      className="text-center text-[14px] font-[500] 
                       text-[#B1B1B1]" 
                  
                    >
                      {formatDateTime(eventData?.startDate, eventData?.timezone)}
                      {eventData?.venue && (
                        <>
                          <br />
                          {eventData.venue}
                        </>
                      )}
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
                            src={qrSrc}
                            alt="instasnap qr"
                            className="w-[146px] h-[146px]"
                            unoptimized
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
            
          </div>
        </div>
      </div>
    </>
  );
}