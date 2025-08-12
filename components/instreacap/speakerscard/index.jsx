
import React from 'react';

export default function SpeakersCard({ article }) {
  const title = article?.title || "";
  const content = article?.content || "";
  const tags = Array.isArray(article?.tags) && article.tags.length > 0
    ? article.tags
    : ["#AiGen", "#Prediction", "#Strategy"];

  return (
    <div className="relative">
      <div className="absolute inset-0 backdrop-blur-lg bg-white/20 rounded-lg"></div>
      <div className="relative border border-[#CCDDFF] rounded-lg p-6 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="text-[22px]"></div>
          <div className="flex-1">
            <h2 className="text-[16px] text-[#171717] flex gap-2 font-[600] mb-3">
              <span>🤙</span>
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </h2>
            <p className="text-gray-700 mb-4">
              {content}
            </p>
            <div className="flex gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="bg-blue-100 font-[400] text-[#375DFB] px-3 py-1 rounded text-[18px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
