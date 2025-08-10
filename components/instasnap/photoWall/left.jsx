"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { fetchWallFamePhotos } from "@/utils/data";
import { WallImage } from "@/public";

export const PhotoFlow = ({ eventId, eventData }  ) => {
  const [apiPhotos, setApiPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        // Use centralized data util. See usage note in `@/utils/data`.
        const photosFromApi = await fetchWallFamePhotos(eventId, eventData);
        setApiPhotos(photosFromApi);
      } catch (error) {
        console.error("Failed to fetch wall-fame images", error);
        setApiPhotos([]);
      } finally {
        setIsLoading(false);
      }
    }

    load();
    return () => {};
  }, []);

  const photos = useMemo(() => {
    if (Array.isArray(apiPhotos) && apiPhotos.length > 0) return apiPhotos;
    const wallSrc = typeof WallImage === "string" ? WallImage : WallImage?.src;
    return wallSrc ? [{ src: wallSrc, alt: "Wall photo" }] : [];
  }, [apiPhotos]);

  console.log(`Animation config - float-left/right duration: 30-60s | photos: ${photos.length} | loading: ${isLoading}`);

  if (photos.length === 0) {
    return (
      <div className="relative w-full h-full overflow-hidden" />
    );
  }

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full overflow-hidden ">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(60)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1  rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
          
          {/* Light rays effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent transform rotate-12 animate-shimmer" />
        </div>

        {/* Photos flowing LEFT TO RIGHT */}
        {[...Array(75)].map((_, i) => {
          const photoIndex = i % photos.length;
          const photo = photos[photoIndex];
          const rotation = (Math.random() - 0.5) * 120; // -60 to +60 degrees for dramatic tilt
          const horizontalOffset = (Math.random() - 0.5) * 100; // Random horizontal slide -50px to +50px
          const speed = 30 + Math.random() * 30; // Random speed between 30s and 60s
          return (
            <div
              key={`left-${i}`}
              className="absolute animate-float-left opacity-90 hover:opacity-100 transition-opacity duration-300"
              style={{
                top: `${Math.random() * 80 + 5}%`,
                animationDelay: `${Math.random() * -40}s`,
                animationDuration: `${speed}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                zIndex: 10 + i,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <div className="relative group">
                {/* Small white album frame */}
                <div className="bg-white p-1.5 rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-xl opacity-50" />
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={192}
                    height={128}
                    className="relative w-48 h-32 object-cover rounded-sm"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Photos flowing RIGHT TO LEFT */}
        {[...Array(75)].map((_, i) => {
          const photoIndex = (i + 8) % photos.length;
          const photo = photos[photoIndex];
          const rotation = (Math.random() - 0.5) * 120; // -60 to +60 degrees for dramatic tilt
          const horizontalOffset = (Math.random() - 0.5) * 100; // Random horizontal slide -50px to +50px
          const speed = 30 + Math.random() * 30; // Random speed between 30s and 60s
          return (
            <div
              key={`right-${i}`}
              className="absolute animate-float-right opacity-90 hover:opacity-100 transition-opacity duration-300"
              style={{
                top: `${Math.random() * 80 + 5}%`,
                animationDelay: `${Math.random() * -40}s`,
                animationDuration: `${speed}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                zIndex: 15 + i,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <div className="relative group">
                {/* Small white album frame */}
                <div className="bg-white p-1.5 rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg blur-xl opacity-50" />
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={192}
                    height={128}
                    className="relative w-48 h-32 object-cover rounded-sm"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
