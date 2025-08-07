
import React from 'react';

export default function SpeakersCard() {
  return (
    <div className="relative">
      <div className="absolute inset-0 backdrop-blur-lg bg-white/20 rounded-lg"></div>
      <div className="relative border border-[#CCDDFF] rounded-lg p-6 backdrop-blur-md">
      <div className="flex items-start gap-3">
        <div className="text-[22px]"></div>
        <div className="flex-1">
          <h2 className="text-[16px] flex gap-2 font-[600] mb-3">
            <span>🤙</span>
            Cross-Border Payment Innovations Creating Key Challenges
          </h2>
          <p className="text-gray-700 mb-4">
            EventHex stands out by tackling two key challenges that traditional event management often struggles with: creating personalized experiences and ensuring attendee retention. This platform is built
          </p>
          <div className="flex gap-2">
            <span 
            className="bg-blue-100 font-[400] text-[#375DFB] px-3 py-1 rounded text-[18px]">
              #AiGen
            </span>
            <span
            className="bg-blue-100 font-[400] text-[#375DFB] px-3 py-1 rounded text-[18px]">
              #Prediction
            </span>
            <span 
            className="bg-blue-100 font-[400] text-[#375DFB] px-3 py-1 rounded text-[18px]">
              #Strategy
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
