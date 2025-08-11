"use client"

import React, { useState, useEffect, useRef } from "react";
import { Mic, Share2, Maximize2, Settings, Sparkle } from "lucide-react";
import SpeakersCard from "@/components/instreacap/speakerscard";
import RightSidebar from "@/components/instreacap/RightSidebar";
import {
  Mabrook,
  MabrookBanner,
  Barcode,
  BackgroundImage,
  EventhexFooter,
  InstaRecapGlitter,
  MicIcon,
} from "@/public";
import { getEventDetails } from '@/lib/data';
import { fetchSessionDetail } from '@/utils/data';
import Image from "next/image";

export default function CapitalXClarityPage() {
  const [eventId, setEventId] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [articles, setArticles] = useState([]);
  const [domain, setDomain] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  // Auto-scroll refs and variables
  const containerRef = useRef(null);
  const scrollSpeed = 1; // pixels per frame
  const animationRef = useRef();

  useEffect(() => {
    const fetchEventData = async () => {
      const eventData = await getEventDetails();
      setEventId(eventData.domainData.event._id);
      setEventData(eventData.domainData.event);
      setDomain(eventData.domainData.domain);
    }
    fetchEventData();
  }, []);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      const sessionDetail = await fetchSessionDetail(eventId);
      console.log(sessionDetail, "sessionDetail from instarecap page");
      // Transform API response to match existing card design props
      const dynamicArticles = Array.isArray(sessionDetail?.sessions)
        ? sessionDetail.sessions.map((s, index) => ({
            id: s._id || index,
            title: s.title || "",
            content: s.description || "",
            tags: ["#AiGen", "#Prediction", "#Strategy"],
            author: s.speakers?.[0]?.name || null,
          }))
        : [];
      setArticles(dynamicArticles);
      
      // Set the first session as default selected session only if no session is currently selected
      if (dynamicArticles.length > 0 && !selectedSession) {
        setSelectedSession(dynamicArticles[0]);
      }
    }
    if (eventId) {
      fetchSessionDetails();
    }
  }, [eventId]); // Remove selectedSession from dependency to avoid infinite loops

  // Function to handle session selection from modal
  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const container = containerRef.current;
    if (!container || articles.length === 0) return;

    let scrollTop = 0;
    const maxScroll = container.scrollHeight / 2; // Half because we'll duplicate content

    const animate = () => {
      scrollTop += scrollSpeed;
      
      // Reset scroll position when we reach the end of the first set
      if (scrollTop >= maxScroll) {
        scrollTop = 0;
      }
      
      container.scrollTop = scrollTop;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Pause scrolling on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleMouseLeave = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [articles]);

  const [isLogoShow, setIsLogoShow] = useState(true);
  
  // Use selected session data for header, fallback to first article if no session selected
  const headerTitle = selectedSession?.title || articles?.[0]?.title || "";
  const headerSpeaker = selectedSession?.author || articles?.[0]?.author || "";

  // Create duplicated articles array for infinite scrolling
  const duplicatedArticles = [...articles, ...articles];

  return (
    <>
      <style jsx>{`
        .auto-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: "cover", // This will cover the entire container
          backgroundPosition: "center center", // Center the background
          backgroundRepeat: "no-repeat", // Prevent repetition for better coverage
          backgroundAttachment: "fixed", // Optional: keeps background fixed while scrolling
          Height: "100vh", // Ensure minimum full viewport height
          width: "100%",
        }}
        className="w-full flex items-center justify-center"
      >
        {/* Header */}

        <section className="w-full flex min-h-screen">
          {/* left */}
          <div className=" w-[70%]  border border-l-0 border-[#D4D4D4] border-t-0 border-b-0 border-r px-2 overflow-y-auto no-scrollbar">
            <header className="bg-white border-b sticky z-10 top-0  mb-5 border-[#D4D4D4] pb-5 px-10 ">
              <div className=" mx-auto flex justify-between pt-[28px] items-center">
                <div className="flex flex-col  gap-3">
                  <h1 className="text-[24px] font-[600] text-blue-600">{headerTitle}</h1>
                  <p className="flex gap-[4px]">
                  <Image src={MicIcon} alt="MicIcon" width={24} height={24} />
                    <span className="font-[500] text-[16px] text-[#525866]">{headerSpeaker}</span>
                  </p>
                </div>
              </div>
            </header>
            {/* card loop with auto-scroll */}
            <div 
              ref={containerRef}
              className="auto-scroll-container flex flex-col max-h-[80vh] px-10 gap-[25px] overflow-y-auto"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollBehavior: 'auto'
              }}
            >
              {duplicatedArticles.map((article, index) => (
                <SpeakersCard 
                  key={`${article.id}-${index}`} 
                  article={article} 
                />
              ))}
            </div>
          </div>
          {/* right  */}
          <div className="w-[30%]">
            {domain && eventId && eventData && (
              <RightSidebar
                isLogoShow={isLogoShow}
                mode="instarecap"
                Glitter={InstaRecapGlitter}
                eventId={eventId}
                eventData={eventData}
                domain={domain}
                onSessionSelect={handleSessionSelect}
                selectedSession={selectedSession}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
}
