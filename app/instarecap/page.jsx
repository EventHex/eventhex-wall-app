"use client"

import React, { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import RightSidebar from "@/components/instreacap/RightSidebar";
import {
  BackgroundImage,
  InstaRecapGlitter,
} from "@/public";
import { getEventDetails } from '@/lib/data';
import { fetchSessionDetail } from '@/utils/data';
import axios from "axios";

export default function CapitalXClarityPage() {
  const [eventId, setEventId] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [domain, setDomain] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [liveTakeaways, setLiveTakeaways] = useState(null);
  const [isLoadingTakeaways, setIsLoadingTakeaways] = useState(false);

  // Container ref for scrolling
  const containerRef = useRef(null);

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
      
      // Set the first session as default selected session only if no session is currently selected
      if (sessionDetail?.sessions?.length > 0 && !selectedSession) {
        const firstSession = sessionDetail.sessions[0];
        setSelectedSession({
          id: firstSession._id,
          title: firstSession.title || "",
          author: firstSession.speakers?.[0]?.name || null,
          speaker: firstSession.speakers?.[0]?.name || null,
        });
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

  // Function to refresh live takeaways
  const refreshLiveTakeaways = () => {
    if (selectedSession?.id) {
      fetchLiveTakeaways(selectedSession.id);
    }
  };

  // Function to fetch live takeaways for the selected session
  const fetchLiveTakeaways = async (sessionId) => {
    if (!eventId || !sessionId) return;
    
    setIsLoadingTakeaways(true);
    try {
      const base = process.env.NEXT_PUBLIC_INSTARECAP_API || 'https://instarecap-app.ambitiousforest-1ab41110.centralindia.azurecontainerapps.io/api';
      const response = await axios.get(`${base}/live/event/${eventId}/session/${sessionId}/takeaways`);
      
      if (response.data.success && response.data.data) {
        setLiveTakeaways(response.data.data);
      } else {
        setLiveTakeaways(null);
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

    // Set up interval to refresh every 2 minutes
    const interval = setInterval(() => {
      fetchLiveTakeaways(selectedSession.id);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [selectedSession, eventId]);



  const [isLogoShow, setIsLogoShow] = useState(true);
  
  // Use selected session data for header
  const headerTitle = selectedSession?.title || "Select a Session";
  const headerSpeaker = selectedSession?.author || "No speaker selected";

  return (
    <>

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
                  <p className="flex gap">
                    <Mic />
                    <span className="font-[500] text-[16px]">{headerSpeaker}</span>
                  </p>
                </div>
                {selectedSession && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium">Session Active</span>
                    </div>
                    <button
                      onClick={refreshLiveTakeaways}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors"
                      title="Refresh live takeaways"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-sm font-medium">Refresh Takeaways</span>
                    </button>
                  </div>
                )}
              </div>
            </header>
            {/* Live Takeaways Display */}
            <div 
              ref={containerRef}
              className="flex flex-col max-h-[80vh] px-10 gap-[25px] overflow-y-auto"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollBehavior: 'auto'
              }}
            >
              {selectedSession ? (
                isLoadingTakeaways ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-emerald-600 font-medium">Loading live takeaways...</p>
                    </div>
                  </div>
                ) : liveTakeaways && liveTakeaways.takeaways && liveTakeaways.takeaways.length > 0 ? (
                  <>
                    {/* Last Updated Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-blue-700">
                            Live Takeaways • {liveTakeaways.takeaways.length} insights
                          </span>
                        </div>
                        <span className="text-xs text-blue-600">
                          Auto-refreshing every 2 minutes
                        </span>
                      </div>
                    </div>
                    
                    {liveTakeaways.takeaways.map((takeaway, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548-.547z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{takeaway.heading}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">{takeaway.explanation}</p>
                            {takeaway.hashtags && takeaway.hashtags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {takeaway.hashtags.map((tag, tagIdx) => (
                                  <span key={tagIdx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {takeaway.confidence && (
                              <div className="mt-3 text-sm text-gray-500">
                                Confidence: {Math.round(takeaway.confidence * 100)}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Live Takeaways Yet</h3>
                    <p className="text-gray-500">Live takeaways will appear here once the session starts generating content.</p>
                  </div>
                )
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Session</h3>
                  <p className="text-gray-500">Click the settings button in the sidebar to select a session and view live takeaways.</p>
                </div>
              )}
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
                refreshLiveTakeaways={refreshLiveTakeaways}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
}