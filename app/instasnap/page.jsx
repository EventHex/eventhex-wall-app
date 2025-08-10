"use client";

import { HighlightImage, Instasnapbackground, InstaSnapGlitter, RetreivedImage, UploadImage } from "@/public";
import { PhotoFlow } from "../../components/instasnap/photoWall/left";
import RightSidebar from "@/components/instasnap/RightSidebar";
import { getEventDetails } from "@/lib/data";
import { useEffect, useState } from "react";
import Image from "next/image";

const Index = (props) => {
  const [eventId, setEventId] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [domain, setDomain] = useState(null);

  useEffect(() => {
    console.log(props, "props from instasnap page");
    const fetchEventData = async () => {
      const eventData = await getEventDetails();
      console.log(eventData, "eventData from instasnap page");
      setEventId(eventData.domainData.event._id);
      setEventData(eventData.domainData.event);
      setDomain(eventData.domainData.domain);
    };
    fetchEventData();
  }, []);

  // useEffect(() => {
  //   const fetchInstaSnapImages = async () => {
  //     const instaSnapImages = await getInstaSnapImages(eventId);
  //     console.log(instaSnapImages, "instaSnapImages from instasnap page");
  //   }
  //   fetchInstaSnapImages();
  // }, [eventId]);

  return (
    <div
      style={{
        backgroundImage: `url(${Instasnapbackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        height: "auto",
        width: "100%",
        position: "relative",
      }}
      className="min-h-screen w-full bg-background flex"
    >
      {/* Main photo display area - no content, just flowing photos */}
      <div className="w-[70%]">
        <header className="w-full flex items-center pl-[58px] h-[100px] border-b border-[#D9D9D9]" >
          <div className="flex w-full gap-[36px]">
            <div className="flex gap-2">
              <Image src={UploadImage} alt="upload" width={45} height={45} />
              <div className="flex flex-col">
                <p style={{
                  background: 'linear-gradient(90deg, #9B7EDE 0%, #E6E6FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '500'
                }}>Uploaded</p>
                <p>100</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Image src={RetreivedImage} alt="upload" width={45} height={45} />
              <div className="flex flex-col">
                <p
                 style={{
                  background: 'linear-gradient(90deg, #9B7EDE 0%, #E6E6FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '500'
                }}>Retrieved</p>
                <p>100</p>
              </div>
             
            </div>
            <div className="flex gap-2">
              <Image src={HighlightImage} alt="upload" width={45} height={45} />
              <div className="flex flex-col">
                <p
                 style={{
                  background: 'linear-gradient(90deg, #9B7EDE 0%, #E6E6FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '500'
                }}
                >Hilights</p>
                <p>100</p>
              </div>
            </div>
          </div>
        </header>
        {eventId && eventData && (
          <div className="w-full h-full">

            <PhotoFlow eventId={eventId} eventData={eventData} />
          </div>
        )}
      </div>

      {/* Right sidebar */}
      {/* <EventSidebar /> */}
      <div className="w-[30%]">
        {domain && eventId && eventData && (
          <RightSidebar
            Glitter={InstaSnapGlitter}
            eventId={eventId}
            eventData={eventData}
            domain={domain}
            isInstaSnap
          />
        )}
      </div>
    </div>
  );
};

export default Index;
