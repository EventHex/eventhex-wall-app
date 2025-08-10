"use client";

import { X, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchSessionDetail } from "@/utils/data";

export default function SelectSessionModal({ isOpen, onClose, eventId, onSessionSelect, selectedSession }) {
  const [isClosing, setIsClosing] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  useEffect(() => {
    async function load() {
      if (!eventId) return;
      const data = await fetchSessionDetail(eventId);
      const list = Array.isArray(data?.sessions)
        ? data.sessions.map((s) => ({
            id: s._id || s.title,
            title: s?.title || "",
            speaker: s?.speakers?.[0]?.name || "",
            description: s?.description || "",
            author: s?.speakers?.[0]?.name || "",
          }))
        : [];
      setSessions(list);
      
      // Set the currently selected session as default
      if (selectedSession && list.length > 0) {
        const currentIndex = list.findIndex(s => s.id === selectedSession.id);
        setSelectedSessionId(currentIndex >= 0 ? currentIndex : 0);
      } else if (list.length > 0) {
        setSelectedSessionId(0);
      }
    }
    if (isOpen) load();
  }, [isOpen, eventId, selectedSession]);

  const handleSessionSelect = (index) => {
    setSelectedSessionId(index);
    const selectedSessionData = sessions[index];
    if (selectedSessionData && onSessionSelect) {
      onSessionSelect(selectedSessionData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 z-20 flex justify-center items-center">
      <div 
        className={`bg-white rounded-2xl shadow-lg p-6 w-full max-w-[900px] transform transition-all duration-300 ease-out ${
          isClosing ? 'animate-modal-slide-out' : 'animate-modal-slide'
        }`}
        style={{
          transformOrigin: 'top right',
          animation: isClosing ? 'modalSlideOut 0.2s ease-in forwards' : 'modalSlide 0.3s ease-out'
        }}
      >
        <style jsx>{`
          @keyframes modalSlide {
            from {
              opacity: 0;
              transform: scale(0.8) translate(30%, -30%);
            }
            to {
              opacity: 1;
              transform: scale(1) translate(0, 0);
            }
          }
          @keyframes modalSlideOut {
            from {
              opacity: 1;
              transform: scale(1) translate(0, 0);
            }
            to {
              opacity: 0;
              transform: scale(0.8) translate(30%, -30%);
            }
          }
        `}</style>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-[400] text-gray-800">Select Sessions</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <div>
          {sessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50"
              onClick={() => handleSessionSelect(index)}
            >
              <div>
                <h3 className="  text-[24px] font-[600] text-blue-600">{session.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Mic size={20} className="mr-2" />
                  <span className="text-[16px] font-[500]">{session.speaker}</span>
                </div>
              </div>
              <input
                type="radio"
                name="session"
                className="form-radio h-5 w-5 text-blue-600"
                checked={selectedSessionId === index}
                onChange={() => handleSessionSelect(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
