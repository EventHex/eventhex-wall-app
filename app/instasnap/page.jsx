'use client'

import { Instasnapbackground, InstaSnapGlitter } from '@/public';
import { PhotoFlow } from '../../components/instasnap/photoWall/left';
import RightSidebar from "@/components/instasnap/RightSidebar";
import { getEventDetails } from '@/lib/data';
import { useEffect, useState } from 'react';

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
    }
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
    
    className="min-h-screen w-full bg-background flex">
      {/* Main photo display area - no content, just flowing photos */}
      <div className="w-[70%]">
        {eventId && eventData && <PhotoFlow eventId={eventId} eventData={eventData} />}
      </div>

      {/* Right sidebar */}
      {/* <EventSidebar /> */}
      <div className="w-[30%]">
        {domain && eventId && eventData && <RightSidebar   Glitter={InstaSnapGlitter} eventId={eventId} eventData={eventData} domain={domain} isInstaSnap/>}
      </div>
    </div>
  );
};

export default Index;