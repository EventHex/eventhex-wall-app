import React from "react";
import { Mic, Share2, Maximize2, Settings, Sparkle } from "lucide-react";
import SpeakersCard from "@/components/instreacap/speakerscard";
import RightSidebar from "@/components/instreacap/RightSidebar";
import {
  Mabrook,
  MabrookBanner,
  Barcode,
  BackgroundImage,
  EventhexFooter,
} from "@/public";
import Image from "next/image";
export default function CapitalXClarityPage() {
  const articles = [
    {
      id: 1,
      title: "Cross-Border Payment Innovations Creating Key Challenges",
      content:
        "EventHex stands out by tackling two key challenges that traditional event management often struggles with: creating personalized experiences and ensuring attendee retention. This platform is built",
      tags: ["#AiGen", "#Prediction", "#Strategy"],
      author: "Safari Sanders Demyès",
    },
    {
      id: 2,
      title: "Cross-Border Payment Innovations Creating Key Challenges",
      content:
        "EventHex stands out by tackling two key challenges that traditional event management often struggles with: creating personalized experiences and ensuring attendee retention. This platform is built",
      tags: ["#AiGen", "#Prediction", "#Strategy"],
      author: null,
    },
    {
      id: 3,
      title: "Cross-Border Payment Innovations Creating Key Challenges",
      content:
        "EventHex stands out by tackling two key challenges that traditional event management often struggles with: creating personalized experiences and ensuring attendee retention. This platform is built",
      tags: ["#AiGen", "#Prediction", "#Strategy"],
      author: null,
    },
    {
      id: 4,
      title: "Cross-Border Payment Innovations Creating Key Challenges",
      content:
        "EventHex stands out by tackling two key challenges that traditional event management often struggles with: creating personalized experiences and ensuring attendee retention. This platform is built",
      tags: ["#AiGen", "#Prediction", "#Strategy"],
      author: null,
    },
    {
      id: 5,
      title: "Cross-Border Payment Innovations Creating Key Challenges",
      content:
        "EventHex stands out by tackling two key challenges that traditional event management often struggles with: creating personalized experiences and ensuring attendee retention. This platform is built",
      tags: ["#AiGen", "#Prediction", "#Strategy"],
      author: null,
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen "
    >
      {/* Header */}

      <section className="w-full flex h-screen">
        {/* left */}
        <div className=" w-[70%] px-2 overflow-y-auto no-scrollbar">
          <header className="bg-white border-b sticky z-10 top-0  mb-5 border-[#D4D4D4] pb-5 px-10 ">
            <div className=" mx-auto flex justify-between pt-[28px] items-center">
              <div className="flex flex-col  gap-3">
                <h1 className="text-[24px] font-[600] text-blue-600">
                  Capital X Clarity: A Founder's roadmap to fund raising and
                  scaling
                </h1>
                <p className="flex gap">
                  <Mic />
                  <span className="font-[500] text-[16px]">
                    Safari Sanders Dennyes
                  </span>
                </p>
              </div>
            </div>
          </header>
          {/* card loop */}
          <div className="flex flex-col px-10 gap-[25px]">
            {articles.map((article) => (
              <SpeakersCard key={article.id} article={article} />
            ))}
          </div>
        </div>
        {/* right  */}
        <RightSidebar />
      </section>
    </div>
  );
}
