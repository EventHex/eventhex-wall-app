
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

  // Create stable random values for each photo to prevent repetition
  const photoConfigs = useMemo(() => {
    return shuffledPhotos.map((photo, index) => {
      // Create a stable seed based on photo source to prevent repetition
      const seed = photo.src ? photo.src.charCodeAt(0) + index : index;
      const random = (seed * 9301 + 49297) % 233280; // Simple PRNG with seed
      
      // Use the seeded random for consistent positioning and animation
      const isLeftToRight = (random % 2) === 0;
      const rotation = ((random % 41) - 20) * 0.1; // -2 to +2 degrees
      const duration = 25 + (random % 20); // 25-45 seconds
      
      // Position images on opposite sides based on animation direction
      let leftPosition, topPosition;
      if (isLeftToRight) {
        // Left side images (5% to 35%)
        leftPosition = 5 + (index % 4) * 8;
      } else {
        // Right side images (65% to 95%)
        leftPosition = 65 + (index % 4) * 8;
      }
      
      // Distribute top positions more evenly across the height
      topPosition = 3 + (index % 8) * 12;
      
      return {
        photo,
        index,
        isLeftToRight,
        rotation,
        duration,
        leftPosition,
        topPosition
      };
    });
  }, [shuffledPhotos]);

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
      {photoConfigs.map((config, index) => {
        const { photo, isLeftToRight, rotation, duration, leftPosition, topPosition } = config;
        
        const animationClass = isLeftToRight ? 'animate-float-left' : 'animate-float-right';
        
        // No staggered delays - all images float simultaneously
        const animationDelay = 0;
        
        return (
          <div
            key={`${photo.src}-${index}`}
            className={`absolute ${animationClass}`}
            style={{
              left: `${leftPosition}%`,
              top: `${topPosition}%`,
              animationDelay: `${animationDelay}s`,
              animationDuration: `${duration}s`,
              '--rotation': `${rotation}deg`,
              zIndex: index,
              transform: `rotate(${rotation}deg)`
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt || "Wall photo"}
              width={156}
              height={136}
              className="w-[160px] h-[130px] object-cover rounded-sm shadow-lg hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
        );
      })}
    </div>
  );
};
