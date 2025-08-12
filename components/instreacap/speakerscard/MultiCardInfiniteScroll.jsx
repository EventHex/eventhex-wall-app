import React, { useState, useEffect, useRef } from 'react';
import SpeakersCard from './index';

export default function MultiCardInfiniteScroll({ articles = [], autoScroll = true, scrollSpeed = 3000, visibleCards = 3 }) {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Default articles if none provided
  const defaultArticles = [
    {
      id: 1,
      title: "AI-Powered Financial Insights",
      content: "Discover how artificial intelligence is revolutionizing financial decision-making and market analysis.",
      tags: ["#AiGen", "#Finance", "#Innovation"]
    },
    {
      id: 2,
      title: "Future of Digital Banking",
      content: "Exploring the next generation of banking technology and customer experience.",
      tags: ["#DigitalBanking", "#Technology", "#CustomerExperience"]
    },
    {
      id: 3,
      title: "Blockchain in Modern Finance",
      content: "Understanding the impact of blockchain technology on traditional financial systems.",
      tags: ["#Blockchain", "#Finance", "#Technology"]
    },
    {
      id: 4,
      title: "Sustainable Investment Strategies",
      content: "How ESG principles are shaping investment decisions and portfolio management.",
      tags: ["#ESG", "#Investment", "#Sustainability"]
    },
    {
      id: 5,
      title: "Fintech Innovation Trends",
      content: "Latest developments in financial technology and their impact on traditional banking.",
      tags: ["#Fintech", "#Innovation", "#Banking"]
    },
    {
      id: 6,
      title: "Cryptocurrency Market Analysis",
      content: "Deep dive into cryptocurrency trends and market dynamics.",
      tags: ["#Crypto", "#Market", "#Analysis"]
    }
  ];

  const displayArticles = articles.length > 0 ? articles : defaultArticles;

  // Create a circular array for infinite scrolling
  const getVisibleArticles = () => {
    if (displayArticles.length === 0) return [];
    
    const result = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentStartIndex + i) % displayArticles.length;
      result.push({
        ...displayArticles[index],
        originalIndex: index
      });
    }
    return result;
  };

  useEffect(() => {
    if (!autoScroll || displayArticles.length <= visibleCards) return;

    // Start auto-scrolling
    intervalRef.current = setInterval(() => {
      setCurrentStartIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % displayArticles.length;
        return nextIndex;
      });
    }, scrollSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoScroll, scrollSpeed, displayArticles.length, visibleCards]);

  // Intersection Observer to pause scrolling when not visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause/resume scrolling based on visibility
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isVisible && autoScroll && displayArticles.length > visibleCards) {
      intervalRef.current = setInterval(() => {
        setCurrentStartIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % displayArticles.length;
          return nextIndex;
        });
      }, scrollSpeed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, autoScroll, scrollSpeed, displayArticles.length, visibleCards]);

  const visibleArticles = getVisibleArticles();

  if (displayArticles.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No articles available
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Progress indicator */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-10 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 font-medium">
            Auto-scrolling through {displayArticles.length} articles
          </span>
          <span className="text-xs text-gray-500">
            {currentStartIndex + 1} - {Math.min(currentStartIndex + visibleCards, displayArticles.length)} / {displayArticles.length}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
            style={{ 
              width: `${((currentStartIndex + visibleCards) / displayArticles.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Cards container */}
      <div className="space-y-6">
        {visibleArticles.map((article, idx) => (
          <div key={`${article.id}-${article.originalIndex}-${idx}`} className="relative">
            <SpeakersCard 
              articles={[article]} 
              autoScroll={false}
            />
            
            {/* Card position indicator */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {article.originalIndex + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      {displayArticles.length > visibleCards && (
        <div className="sticky bottom-4 z-20 flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setCurrentStartIndex(prevIndex => {
                    const newIndex = prevIndex - 1;
                    return newIndex < 0 ? displayArticles.length - 1 : newIndex;
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous set of articles"
              >
                ←
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.ceil(displayArticles.length / visibleCards) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStartIndex(i * visibleCards)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentStartIndex / visibleCards) === i
                        ? 'bg-blue-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => {
                  setCurrentStartIndex(prevIndex => {
                    const newIndex = prevIndex + 1;
                    return newIndex >= displayArticles.length ? 0 : newIndex;
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next set of articles"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



