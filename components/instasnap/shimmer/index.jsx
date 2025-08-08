import React from "react";
import "./inde.css"; // We'll add shimmer CSS below


// right side 
export default function ShimmerCard() {
  return (
    <div className="shimmer-card">
      {/* Banner */}
      <div className="shimmer shimmer-banner" />
      {/* Title and subtitle */}
      <div className="shimmer shimmer-title" />
      <div className="shimmer shimmer-subtitle" />
      {/* QR code box */}
      <div className="shimmer shimmer-qrcode" />
      <div className="shimmer shimmer-maintext" />
      <div className="shimmer shimmer-subtext" />
      {/* Facial Recognition box */}
      <div className="shimmer shimmer-rect shimmer-facial" />
      {/* Footer */}
      <div className="shimmer shimmer-footer" />
    </div>
  );
}