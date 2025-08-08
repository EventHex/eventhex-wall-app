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

  // Generate random floating path in every direction across the entire screen
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
    
    // Generate completely random points across the entire screen
    for (let i = 0; i < 10; i++) {
      // Generate random X position with decimal multiplier
      const randomXMultiplier = Math.random() * 0.95 + 0.025; // 0.025 to 0.975
      const x = minX + (randomXMultiplier * (maxX - minX));
      
      // Generate random Y position with decimal multiplier
      const randomYMultiplier = Math.random() * 0.95 + 0.025; // 0.025 to 0.975
      const y = minY + (randomYMultiplier * (maxY - minY));
      
      points.push({ x, y });
    }
    
    // Add corner and edge points for more variety
    const cornerAndEdgePoints = [
      // Corners with random offset
      { 
        x: minX + (Math.random() * 0.1 * (maxX - minX)), 
        y: minY + (Math.random() * 0.1 * (maxY - minY)) 
      }, // Top-left
      { 
        x: maxX - (Math.random() * 0.1 * (maxX - minX)), 
        y: minY + (Math.random() * 0.1 * (maxY - minY)) 
      }, // Top-right
      { 
        x: minX + (Math.random() * 0.1 * (maxX - minX)), 
        y: maxY - (Math.random() * 0.1 * (maxY - minY)) 
      }, // Bottom-left
      { 
        x: maxX - (Math.random() * 0.1 * (maxX - minX)), 
        y: maxY - (Math.random() * 0.1 * (maxY - minY)) 
      }, // Bottom-right
      
      // Edge centers with random variation
      { 
        x: minX + (Math.random() * 0.05 * (maxX - minX)), 
        y: minY + (0.4 + Math.random() * 0.2) * (maxY - minY) 
      }, // Left edge
      { 
        x: maxX - (Math.random() * 0.05 * (maxX - minX)), 
        y: minY + (0.4 + Math.random() * 0.2) * (maxY - minY) 
      }, // Right edge
      { 
        x: minX + (0.4 + Math.random() * 0.2) * (maxX - minX), 
        y: minY + (Math.random() * 0.05 * (maxY - minY)) 
      }, // Top edge
      { 
        x: minX + (0.4 + Math.random() * 0.2) * (maxX - minX), 
        y: maxY - (Math.random() * 0.05 * (maxY - minY)) 
      }, // Bottom edge
    ];
    
    // Combine all points and shuffle completely randomly
    const allPoints = [...points, ...cornerAndEdgePoints];
    
    // Shuffle array multiple times for true randomness
    for (let i = 0; i < 3; i++) {
      for (let j = allPoints.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [allPoints[j], allPoints[k]] = [allPoints[k], allPoints[j]];
      }
    }
    
    return allPoints;
  };

  // Start floating animation
  const startFloating = () => {
    if (!isFloating) return;
    
    const path = generateFloatingPath();
    if (path.length === 0) return;

    const animateToNextPoint = (index = 0) => {
      if (!isFloating || index >= path.length) {
        if (isFloating) {
          // Restart with new random path, shorter delay for more dynamic movement
          setTimeout(() => startFloating(), 1000 + Math.random() * 2000);
        }
        return;
      }

      const point = path[index];
      // Longer duration with more variety for multi-directional movement
      const baseDuration = 4;
      const randomMultiplier = Math.random() * 0.8 + 0.6; // 0.6 to 1.4
      const duration = baseDuration * randomMultiplier;

      console.log(`Moving to point ${index}:`, point, `Duration: ${duration.toFixed(2)}s`);

      const animation = controls.start({
        x: point.x,
        y: point.y,
        rotate: (Math.random() - 0.5) * 25, // More rotation variety for multi-directional movement
        transition: {
          duration,
          ease: ["easeInOut", "easeIn", "easeOut", "linear"][Math.floor(Math.random() * 4)], // Random easing
          type: "tween",
        },
      });

      animation.then(() => {
        if (isFloating) {
          const pauseDuration = (0.5 + Math.random() * 1.5) * 1000; // 0.5-2 second pause
          setTimeout(() => animateToNextPoint(index + 1), pauseDuration);
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
    const randomDelay = Math.random() * 0.8 * 3000; // Random delay 0-2.4 seconds
    const timer = setTimeout(() => {
      startFloating();
    }, randomDelay);

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
      // Initial position - completely random across entire screen
      initial={{
        x: ((Math.random() - 0.5) * 0.9) * (window?.innerWidth || 0),
        y: ((Math.random() - 0.5) * 0.9) * (window?.innerHeight || 0),
        rotate: (Math.random() - 0.5) * 20, // Random initial rotation
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
          const momentumMultiplier = Math.random() * 0.15 + 0.15; // 0.15 to 0.3
          
          controls.start({
            x: info.point.x + currentVelocityX * momentumMultiplier,
            y: info.point.y + currentVelocityY * momentumMultiplier,
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
        const resumeDelay = (2 + Math.random() * 1.5) * 1000; // 2-3.5 seconds
        setTimeout(() => {
          setIsFloating(true);
          startFloating();
        }, resumeDelay);
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