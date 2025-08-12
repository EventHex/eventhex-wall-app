"use client";

import React, { useState, useEffect, useRef } from "react";
import { getEventDetails } from "@/lib/data";
import { fetchSessionDetail } from "@/utils/data";
import ReactMarkdown from "react-markdown";

const SocialWallPost = ({ id, author, content, imageUrl, likes, comments, type }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4 flex-shrink-0 w-full">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full mr-3 bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          {id}
        </div>
        <p className="font-semibold text-gray-900 dark:text-white">{author}</p>
      </div>
      {type === 'linkedin' ? (
        <div className="text-gray-800 dark:text-gray-200 mb-3">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-gray-800 dark:text-gray-200 mb-3">{content}</p>
      )}
      {imageUrl && (
        <div className="mb-3">
          <img
            src={imageUrl}
            alt="Post media"
            className="w-full h-auto rounded-lg max-h-40 object-cover"
          />
        </div>
      )}
      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
        <div className="flex space-x-4">
          <span>{likes} Likes</span>
          <span>{comments} Comments</span>
        </div>
        <div className="flex space-x-4">
          <button className="hover:text-blue-500">Like</button>
          <button className="hover:text-blue-500">Comment</button>
          <button className="hover:text-blue-500">Share</button>
        </div>
      </div>
    </div>
  );
};

export default function SocialWallPage() {
  const [eventId, setEventId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const containerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const base = process.env.NEXT_PUBLIC_INSTARECAP_API ||
    "https://instarecap-app.ambitiousforest-1ab41110.centralindia.azurecontainerapps.io/api";
    // "http://localhost:3005/api";

  useEffect(() => {
    const init = async () => {
      const eventData = await getEventDetails();
      const id = eventData.domainData.event._id;
      setEventId(id);

      const sessionDetail = await fetchSessionDetail(id);
      const list = Array.isArray(sessionDetail?.sessions) ? sessionDetail.sessions : [];
      setSessions(list);
      if (list.length > 0) setSelectedSession(list[0]);
    };
    init();
  }, []);

  const fetchSocial = async (sessionId) => {
    try {
      const resp = await fetch(`${base}/live/event/${eventId}/session/${sessionId}/social`);
      const data = await resp.json();
      const linkedin = data?.data?.linkedinPosts || [];
      const twitter = data?.data?.twitterPosts || [];
      // Normalize into unified post format for display
      let counter = 0;
      const normalized = [
        ...linkedin.map((p) => ({
          id: ++counter,
          type: 'linkedin',
          author: "InstaRecap",
          content: p.content,
          imageUrl: "",
          likes: Math.floor(Math.random() * 500) + 50,
          comments: Math.floor(Math.random() * 50) + 5,
        })),
        ...twitter.map((p) => ({
          id: ++counter,
          type: 'twitter',
          author: "InstaRecap",
          content: p.content,
          imageUrl: "",
          likes: Math.floor(Math.random() * 500) + 50,
          comments: Math.floor(Math.random() * 50) + 5,
        })),
      ];
      setPosts(normalized);
    } catch (e) {
      console.error("fetchSocial failed", e);
      setPosts([]);
    }
  };

  useEffect(() => {
    if (!eventId || !selectedSession?._id) return;
    fetchSocial(selectedSession._id);
    const interval = setInterval(() => fetchSocial(selectedSession._id), 300000);
    return () => clearInterval(interval);
  }, [eventId, selectedSession]);

  const startScrolling = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop += 1;
      }
    }, 50);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
  };

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Auto-Scrolling Social Wall
        </h1>
        <div className="flex items-center gap-2 justify-center">
          <label className="text-sm text-gray-700 dark:text-gray-300">Session:</label>
          <select
            className="px-2 py-1 rounded border bg-white dark:bg-gray-800"
            value={selectedSession?._id || ""}
            onChange={(e) => {
              const s = sessions.find((x) => x._id === e.target.value);
              setSelectedSession(s || null);
            }}
          >
            {sessions.map((s) => (
              <option key={s._id} value={s._id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div
        ref={containerRef}
        className="w-full max-w-2xl h-[600px] overflow-y-scroll border border-gray-300 dark:border-gray-700 rounded-lg p-2 custom-scrollbar"
        onMouseEnter={stopScrolling}
        onMouseLeave={startScrolling}
        style={{ scrollBehavior: 'smooth' }}
      >
        {posts.map((post) => (
          <SocialWallPost key={post.id} {...post} />
        ))}
        <div className="h-[200px] flex-shrink-0"></div>
      </div>
    </div>
  );
}


