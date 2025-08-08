"use client";
import { cn } from "@/utils/utils";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "motion/react";

export const DraggableCardBody = ({
  className,
  children
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);
  const controls = useAnimationControls();
  const [isFloating, setIsFloating] = useState(true);
  const [floatingAnimation, setFloatingAnimation] = useState(null);

  // physics biatch
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [25, -25]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25, 25]), springConfig);
  const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]), springConfig);

  // Generate random floating path
  const generateFloatingPath = () => {
    if (typeof window === "undefined") return [];
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const cardWidth = 320;
    const cardHeight = 384;
    
    // Calculate safe boundaries (keeping cards fully visible)
    const minX = -screenWidth / 2 + cardWidth / 2;
    const maxX = screenWidth / 2 - cardWidth / 2;
    const minY = -screenHeight / 2 + cardHeight / 2;
    const maxY = screenHeight / 2 - cardHeight / 2;
    
    const points = [];
    for (let i = 0; i < 6; i++) {
      // Generate truly random points across the entire screen area
      const x = Math.random() * (maxX - minX) + minX;
      const y = Math.random() * (maxY - minY) + minY;
      
      points.push({ x, y });
    }
    
    // Add some specific diagonal movement patterns
    const patterns = [
      { x: minX, y: minY }, // top-left
      { x: maxX, y: maxY }, // bottom-right  
      { x: minX, y: maxY }, // bottom-left
      { x: maxX, y: minY }, // top-right
      { x: 0, y: minY },    // top-center
      { x: 0, y: maxY },    // bottom-center
    ];
    
    // Mix random points with diagonal patterns
    const shuffledPatterns = patterns.sort(() => Math.random() - 0.5);
    const mixedPoints = [...points.slice(0, 3), ...shuffledPatterns.slice(0, 3)];
    
    return mixedPoints.sort(() => Math.random() - 0.5);
  };

  // Start floating animation
  const startFloating = () => {
    if (!isFloating) return;
    
    const path = generateFloatingPath();
    if (path.length === 0) return;

    const animateToNextPoint = (index = 0) => {
      if (!isFloating || index >= path.length) {
        if (isFloating) {
          // Restart the animation with new random path
          setTimeout(() => startFloating(), 1000);
        }
        return;
      }

      const point = path[index];
      const duration = 4 + Math.random() * 6; // 4-10 seconds per movement

      console.log(`Moving to point ${index}:`, point); // Debug log

      const animation = controls.start({
        x: point.x,
        y: point.y,
        rotate: Math.random() * 30 - 15, // Random rotation during movement
        transition: {
          duration,
          ease: "easeInOut",
          type: "tween",
        },
      });

      animation.then(() => {
        if (isFloating) {
          setTimeout(() => animateToNextPoint(index + 1), 1000 + Math.random() * 2000);
        }
      });
    };

    animateToNextPoint();
  };

  // Stop floating animation
  const stopFloating = () => {
    setIsFloating(false);
    if (floatingAnimation) {
      floatingAnimation.stop();
    }
  };

  useEffect(() => {
    // Start floating after component mounts
    const timer = setTimeout(() => {
      startFloating();
    }, Math.random() * 2000); // Random delay 0-2 seconds

    return () => {
      clearTimeout(timer);
      setIsFloating(false);
    };
  }, []);

  // Restart floating when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (isFloating) {
        stopFloating();
        setTimeout(() => {
          setIsFloating(true);
          startFloating();
        }, 1000);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFloating]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={{
        top: -window.innerHeight,
        left: -window.innerWidth,
        right: window.innerWidth,
        bottom: window.innerHeight,
      }}
      // Initial random position - ensure full coverage
      initial={{
        x: (Math.random() - 0.5) * window?.innerWidth || 0,
        y: (Math.random() - 0.5) * window?.innerHeight || 0,
        rotate: Math.random() * 20 - 10, // Add slight random rotation
      }}
      animate={controls}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
        stopFloating(); // Stop floating when user starts dragging
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = "default";

        // Reset rotation after drag
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        });

        // Add some momentum physics
        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();

        const velocityMagnitude = Math.sqrt(currentVelocityX * currentVelocityX +
          currentVelocityY * currentVelocityY);

        if (velocityMagnitude > 500) {
          // If dragged with high velocity, add momentum
          const bounce = Math.min(0.8, velocityMagnitude / 1000);
          
          controls.start({
            x: info.point.x + currentVelocityX * 0.2,
            y: info.point.y + currentVelocityY * 0.2,
            transition: {
              duration: 0.8,
              ease: [0.2, 0, 0, 1],
              type: "spring",
              stiffness: 50,
              damping: 15,
              mass: 0.8,
              bounce,
            },
          });
        }

        // Resume floating after a delay
        setTimeout(() => {
          setIsFloating(true);
          startFloating();
        }, 2000);
      }}
      style={{
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
        position: "fixed", // Use fixed positioning to avoid container issues
        zIndex: 10,
      }}
      whileHover={{ 
        scale: 1.02,
        zIndex: 20, // Bring hovered card to front
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative min-h-96 w-80 overflow-hidden rounded-md bg-neutral-100 p-3 shadow-2xl transform-3d dark:bg-neutral-900",
        className
      )}>
      {children}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-white select-none" />
    </motion.div>
  );
};

export const DraggableCardContainer = ({
  className,
  children
}) => {
  return (
    <div className={cn("[perspective:3000px] relative w-full h-screen overflow-hidden", className)}>
      {children}
    </div>
  );
};