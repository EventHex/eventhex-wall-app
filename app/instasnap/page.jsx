
"use client"

import React,{useState} from "react";
import { DraggableCardDemo } from "@/components/instasnap/animationcard";
import RightSidebar from "@/components/instasnap/RightSidebar";
import {
  Mabrook,
  MabrookBanner,
  Barcode,
  BackgroundImage,
  EventhexFooter,
  InstaSnapGlitter,
  Instasnapbackground,
  InstasnapLogo
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
  const [isLogoShow, setIsLogoShow] = useState(false)
  const [isInstaSnap, setIsInstaSnap] = useState(true);

  // animation cards 
  const AnimationCards = [
    {
      title: "Tyler Durden",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      image:
        "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      image:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      image:
        "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <div
  style={{
    backgroundImage: `url(${Instasnapbackground.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
  }}

>

  <section className="w-full px-5 justify-between flex min-h-screen relative z-10">
    {/* Your content */}
    <div className="w-[60%]  ">
      <header className="w-full h-24 bg-transparent">
      </header>
      <DraggableCardDemo AnimationCards={AnimationCards}/>
    </div>
    <div className="w-[35%]  items-center flex ">
   
      <RightSidebar  logo={InstasnapLogo} isLogoShow={isLogoShow} isInstaSnap={isInstaSnap} Glitter={InstaSnapGlitter}/>
    
    </div>
  </section>
</div>
  );
}
