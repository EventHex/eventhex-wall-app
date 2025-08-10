"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { fetchWallFamePhotos } from "@/utils/data";
import { WallImage } from "@/public";

export const PhotoFlow = ({ eventId, eventData }) => {
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

  // Create a shuffled array of photos to avoid repetition
  const shuffledPhotos = useMemo(() => {
    if (photos.length === 0) return [];

    // Just shuffle the original photos once, no duplication
    return [...photos].sort(() => Math.random() - 0.5);
  }, [photos]);

  console.log(
    `Animation config - float-left/right duration: 30-60s | photos: ${photos.length} | loading: ${isLoading}`
  );

  // Debug: Check if animations are working
  useEffect(() => {
    if (shuffledPhotos.length > 0) {
      console.log(`PhotoWall Debug: ${shuffledPhotos.length} photos positioned`);
      console.log('Animation classes applied:', document.querySelectorAll('.animate-float-left').length);
    }
  }, [shuffledPhotos]);

  if (photos.length === 0) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">No photos available</p>
          {isLoading && <p className="text-blue-500">Loading photos...</p>}
          <p className="text-sm text-gray-400">Photos: {photos.length} | API Photos: {apiPhotos.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {shuffledPhotos.map((photo, index) => {
        // Randomly decide if image floats left-to-right or right-to-left
        const isLeftToRight = Math.random() < 0.5;
        const animationClass = isLeftToRight ? 'animate-float-left' : 'animate-float-right';
        
        // Position images on opposite sides based on animation direction
        let leftPosition, topPosition;
        if (isLeftToRight) {
          // Left side images (10% to 40%)
          leftPosition = 10 + (index % 3) * 10;
        } else {
          // Right side images (60% to 90%)
          leftPosition = 60 + (index % 3) * 10;
        }
        
        // Distribute top positions evenly
        topPosition = 5 + (index % 7) * 13;
        const animationDelay = index * 1.5; // Staggered delays
        
        return (
          <div
            key={`${photo.src}-${index}`}
            className={`absolute ${animationClass}`}
            style={{
              left: `${leftPosition}%`,
              top: `${topPosition}%`,
              animationDelay: `${animationDelay}s`,
              zIndex: index
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt || "Wall photo"}
              width={156}
              height={136}
              className="w-[160px] h-[130px] object-cover rounded-sm shadow-lg"
              unoptimized
            />
          </div>
        );
      })}
    </div>
  );
};
