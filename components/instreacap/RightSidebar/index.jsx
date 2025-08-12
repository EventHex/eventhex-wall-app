"use client";

import React, { useEffect, useState } from "react";
import SelectSessionModal from "./SelectSessionModal";
import { Maximize2, Minimize2, Settings, Sparkle } from "lucide-react";
import axios from "axios";
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
  eventId,
  eventData,
  domain,
  onSessionSelect,
  selectedSession,
}) {

  console.log(eventData,'daaat  ');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liveTakeaways, setLiveTakeaways] = useState(null);
  const [isLoadingTakeaways, setIsLoadingTakeaways] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const isInstaRecap = !isInstaSnap; // Opposite of InstaSnap

  // Function to fetch live takeaways for a session
  const fetchLiveTakeaways = async (sessionId) => {
    if (!eventId || !sessionId) return;
    
    setIsLoadingTakeaways(true);
    try {
      const base = process.env.NEXT_PUBLIC_INSTARECAP_API || 'https://instarecap-app.ambitiousforest-1ab41110.centralindia.azurecontainerapps.io/api';
      const response = await axios.get(`${base}/live/event/${eventId}/session/${sessionId}/takeaways`);
      
      if (response.data.success && response.data.data) {
        setLiveTakeaways(response.data.data);
        setLastUpdated(new Date());
      } else {
        setLiveTakeaways(null);
        setLastUpdated(null);
      }
    } catch (error) {
      console.error('Error fetching live takeaways:', error);
      setLiveTakeaways(null);
    } finally {
      setIsLoadingTakeaways(false);
    }
  };

  // Fetch takeaways when selectedSession changes
  useEffect(() => {
    if (selectedSession?.id) {
      fetchLiveTakeaways(selectedSession.id);
    } else {
      setLiveTakeaways(null);
    }
  }, [selectedSession, eventId]);

  // Set up periodic refresh of live takeaways
  useEffect(() => {
    if (!selectedSession?.id || !eventId) return;

    // Initial fetch
    fetchLiveTakeaways(selectedSession.id);

    // Set up interval to refresh every 5 minutes
    const interval = setInterval(() => {
      fetchLiveTakeaways(selectedSession.id);
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [selectedSession, eventId]);

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
  const logoSrc = toAbsoluteCdnUrl(eventData?.logo) || Mabrook;
  console.log(logoSrc,'logoSrc  ');
  const titleText = eventData?.title || "Mabrook Gulf Toppers 2025";
  const resolveOrigin = () => {
    const raw = domain || (typeof window !== "undefined" ? window.location.origin : "");
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw.replace(/\/$/, "");
    return `https://${raw.replace(/\/$/, "")}`;
  };
  const qrTarget = `${resolveOrigin()}/instarecap`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=146x146&data=${encodeURIComponent(
    qrTarget
  )}`;

  return (
    <>
      <SelectSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventId={eventId}
        onSessionSelect={onSessionSelect}
        selectedSession={selectedSession}
      />
      <div 
      className="w-full  py-[22px] overflow-y-auto no-scrollbar">
        {/* Header */}
        <header className="px-6  pb-[18px]">
          <div
            className=" w-full flex items-center  relative   justify-between "
         
          >
            {/* Logo */}
                         <Image
        
               src={logoSrc}
               // src={Mabrook}
               alt="mabrook"
               width={118}
               height={25}
               className="w-[118px] h-[25px]"
             />

            {/* Buttons */}
            <div className="flex w-[40%] justify-end gap-2">
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
        <div className="flex flex-col gap-[32px] px-4 ">
          <div className="w-full  flex justify-center ">

          <Image
            width={600}
            height={150}
            src={bannerSrc}
            alt="event banner"
            className="h-[150px] w-[360x] rounded-xl object-fit"
            unoptimized
            />
            </div>
          <div className=" flex flex-col gap-[28px] px-12">
          <div className="flex flex-col justify-center items-center">
            <h1
              className=" text-[18px] text-center font-[700]" >
              {titleText}
            </h1>
            <p
              className="text-[#B1B1B1]    text-center text-[14px] font-[500]"
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
                  src={qrSrc}
                  alt="instarecap qr"
                  className="w-[146px] h-[146px]"
                  unoptimized
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

        {/* Live Takeaways Section */}
        {selectedSession ? (
          <div className="relative">
            {/* Background blur overlay */}
            <div className="absolute inset-0 backdrop-blur-lg bg-white/20 rounded-[35px]"></div>
            
            {/* Content */}
            <div className="relative border border-[#C7D0FF96] rounded-[35px] backdrop-blur-md p-6">
              {/* Session Info */}
              <div className="mb-4 p-3 bg-blue-50/80 rounded-xl border border-blue-200/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-[12px] font-[600] text-blue-700 uppercase tracking-wide">Current Session</span>
                </div>
                <h4 className="text-[14px] font-[600] text-blue-800 mb-1">{selectedSession.title}</h4>
                {selectedSession.speaker && (
                  <p className="text-[12px] text-blue-600">{selectedSession.speaker}</p>
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkle className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-[18px] font-[600] text-emerald-700">Live Takeaways</h3>
                </div>
                <div className="flex items-center gap-2">
                  {isLoadingTakeaways && (
                    <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <button
                    onClick={() => selectedSession?.id && fetchLiveTakeaways(selectedSession.id)}
                    disabled={isLoadingTakeaways}
                    className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-colors disabled:opacity-50"
                    title="Refresh takeaways"
                  >
                    <svg className="w-3 h-3 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {liveTakeaways && liveTakeaways.takeaways && liveTakeaways.takeaways.length > 0 ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {liveTakeaways.takeaways.map((takeaway, idx) => (
                    <div key={idx} className="bg-white/80 rounded-xl p-3 border border-emerald-200/50">
                      <h4 className="text-[14px] font-[600] text-emerald-800 mb-2">{takeaway.heading}</h4>
                      <p className="text-[12px] text-slate-700 leading-relaxed">{takeaway.explanation}</p>
                      {takeaway.hashtags && takeaway.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {takeaway.hashtags.map((tag, tagIdx) => (
                            <span key={tagIdx} className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Last Updated Timestamp */}
                  {lastUpdated && (
                    <div className="text-center pt-3 border-t border-emerald-200/50">
                      <span className="text-[10px] text-emerald-600">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  {isLoadingTakeaways ? (
                    <div className="text-[14px] text-slate-600">
                      {liveTakeaways === null ? "Fetching takeaways..." : "Loading takeaways..."}
                    </div>
                  ) : (
                    <div className="text-[14px] text-slate-500">
                      No live takeaways available yet
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* No Session Selected State */
          <div className="relative">
            {/* Background blur overlay */}
            <div className="absolute inset-0 backdrop-blur-lg bg-white/20 rounded-[35px]"></div>
            
            {/* Content */}
            <div className="relative border border-[#C7D0FF96] rounded-[35px] backdrop-blur-md p-6">
              <div className="text-center py-8">
                <div className="mb-3">
                  <Sparkle className="w-8 h-8 text-slate-400 mx-auto" />
                </div>
                <h3 className="text-[16px] font-[600] text-slate-600 mb-2">No Session Selected</h3>
                <p className="text-[12px] text-slate-500">
                  Click the settings button to select a session and view live takeaways
                </p>
              </div>
            </div>
          </div>
        )}

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
