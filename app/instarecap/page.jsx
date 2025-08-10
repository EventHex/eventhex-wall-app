
"use client"

import React,{useState} from "react";
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
} from "@/public";
import { getEventDetails } from '@/lib/data';
import { fetchSessionDetail } from '@/utils/data';
import { useEffect, } from "react";
import Image from "next/image";
export default function CapitalXClarityPage() {
  const [eventId, setEventId] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [articles, setArticles] = useState([]);
  const [domain, setDomain] = useState(null);

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
    }
    if (eventId) {
      fetchSessionDetails();
    }
  }, [eventId]);

  const [isLogoShow, setIsLogoShow] = useState(true)
  const headerTitle = articles?.[0]?.title || "Capital X Clarity: A Founder's roadmap to fund raising and";
  const headerSpeaker = articles?.[0]?.author || "Safari Sanders Dennyes";
  return (
    <div
    style={{
      backgroundImage: `url(${BackgroundImage.src})`,
      backgroundSize: "cover", // This will cover the entire container
      backgroundPosition: "center center", // Center the background
      backgroundRepeat: "no-repeat", // Prevent repetition for better coverage
      backgroundAttachment: "fixed", // Optional: keeps background fixed while scrolling
      minHeight: "100vh", // Ensure minimum full viewport height
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
                <p className="flex gap">
                  <Mic />
                  <span className="font-[500] text-[16px]">{headerSpeaker}</span>
                </p>
              </div>
            </div>
          </header>
          {/* card loop */}
          <div className="flex flex-col   px-10 gap-[25px]">
            {articles.map((article) => (
              <SpeakersCard key={article.id} article={article} />
            ))}
          </div>
        </div>
        {/* right  */}
        <div 
        
        className="w-[30%]">
        {domain && eventId && eventData && (
          <RightSidebar
            isLogoShow={isLogoShow}
            mode="instarecap"
            Glitter={InstaRecapGlitter}
            eventId={eventId}
            eventData={eventData}
            domain={domain}
          />
        )}
        </div>
      </section>
    </div>
  );
}
