"use client";

import { Camera, Sparkles, QrCode, Maximize2 } from 'lucide-react';

export const EventSidebar = () => {
  return (
    <div className="w-full max-w-sm h-screen max-h-[800px] relative">
      {/* Main Glass Container */}
      <div className="h-full bg-white/4 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl" />
        
        {/* Fullscreen Button - Top Right */}
        <button 
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }}
          className="absolute top-6 right-6 p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 z-50"
        >
          <Maximize2 className="w-5 h-5 text-white/90" />
        </button>

        {/* Content Container */}
        <div className="h-full flex flex-col p-6 pt-8 relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-4">
            {/* Logo */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-xl">
              <Camera className="w-7 h-7 text-white" />
            </div>
            
            {/* Event Title */}
            <h1 className="text-xl font-bold text-white mb-3 leading-tight">
              Annual Tech Conference
            </h1>
            
            {/* Event Details */}
            <div className="text-white/80 space-y-0.5">
              <p className="text-sm">December 15, 2024</p>
              <p className="text-sm">Grand Convention Center</p>
              <p className="text-xs text-white/60">Downtown District</p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex-1 flex flex-col justify-center min-h-0 mb-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
              
              {/* QR Code */}
              <div className="w-36 h-36 bg-white rounded-xl mx-auto mb-5 p-3 shadow-lg">
                <QrCode className="w-full h-full text-gray-800" />
              </div>
              
              {/* Instructions */}
              <h2 className="text-lg font-semibold text-white mb-2">
                Get Your Photos
              </h2>
              <p className="text-white/70 text-sm mb-5 leading-relaxed">
                Scan to access your personalized photo gallery instantly
              </p>
              
              {/* AI Feature Badge */}
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30 p-4">
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="w-4 h-4 text-purple-300 mr-2" />
                  <span className="text-purple-200 font-medium text-sm">AI Facial Recognition</span>
                </div>
                <p className="text-purple-200/80 text-xs">
                  Automatically find all your photos with AI
                </p>
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="text-center pt-4 border-t border-white/10 mt-2">
            <p className="text-white/50 text-xs mb-2">Powered by</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                EventHex
              </span>
            </div>
            <p className="text-white/40 text-xs mt-1">
              Smart Event Photography
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
