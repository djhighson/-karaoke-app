"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Remote() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [roomId, setRoomId] = useState("");

  async function searchYouTube() {
    if (!query) return;

    const res = await fetch(
      `https://yt-api.p.rapidapi.com/search?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
        },
      }
    );

    const data = await res.json();
    setResults(data.data || []);
  }

  async function addToQueue(video) {
    if (!roomId) return alert("Enter a room code first!");

    const { data: room } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    const newQueue = [...(room?.queue || []), {
      id: video.videoId,
      title: video.title,
      addedBy: "Guest"
    }];

    await supabase
      .from("rooms")
      .update({ queue: newQueue })
      .eq("id", roomId);

    alert("Added to queue!");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Remote Control</h1>

      <input
        placeholder="Enter room code"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search YouTube…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={searchYouTube}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {results.map((video) => (
          <div
            key={video.videoId}
            className="border rounded p-3 flex gap-3 items-center"
          >
            <img
              src={video.thumbnail[0].url}
              width={120}
              className="rounded"
              alt="thumbnail"
            />
            <div className="flex-1">
              <p className="font-semibold">{video.title}</p>
              <button
                onClick={() => addToQueue(video)}
                className="bg-green-600 text-white px-3 py-1 rounded mt-2"
              >
                Add to Queue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
