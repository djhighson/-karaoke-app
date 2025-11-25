"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";

export default function RemotePage() {
  const { id } = useParams();
  const roomId = Array.isArray(id) ? id[0] : id;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [queue, setQueue] = useState([]);

  async function searchYouTube() {
    if (!query.trim()) return;

    const res = await fetch(
      `https://yt-api.p.rapidapi.com/search?query=${encodeURIComponent(query)}&type=video`,
      {
        headers: {
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
        },
      }
    );

    const data = await res.json();
    setResults(
      data.data.map((v) => ({
        id: v.videoId,
        title: v.title,
        author: v.channelTitle,
      }))
    );
  }

  async function addToQueue(video) {
    const { data } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    const updatedQueue = [...(data.queue || []), video];

    await supabase
      .from("rooms")
      .update({ queue: updatedQueue })
      .eq("id", roomId);

    setQueue(updatedQueue);
  }

  async function playVideo(videoId) {
    await supabase
      .from("rooms")
      .update({ current_video: videoId })
      .eq("id", roomId);
  }

  async function skipSong() {
    const { data } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    const q = data.queue || [];
    q.shift();

    await supabase
      .from("rooms")
      .update({
        queue: q,
        current_video: q.length > 0 ? q[0].id : "",
      })
      .eq("id", roomId);

    setQueue(q);
  }

  useEffect(() => {
    async function loadRoom() {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();

      if (data) {
        setQueue(data.queue || []);
      }
    }

    loadRoom();

    const channel = supabase
      .channel(`remote:${roomId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `id=eq.${roomId}` },
        (payload) => {
          setQueue(payload.new.queue || []);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [roomId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4 font-bold">Remote — Screen {roomId}</h1>

      <input
        className="border p-3 w-full rounded text-black mb-3"
        placeholder="Search YouTube karaoke..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button onClick={searchYouTube}>Search</Button>

      <div className="mt-6">
        {results.map((v) => (
          <div
            key={v.id}
            className="p-3 border rounded mb-3 flex flex-col gap-2 bg-gray-900"
          >
            <div className="font-bold">{v.title}</div>
            <div className="text-sm text-gray-400">{v.author}</div>

            <Button onClick={() => playVideo(v.id)}>Play now</Button>
            <Button onClick={() => addToQueue(v)}>Add to queue</Button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-10 mb-3">Current Queue</h2>

      {queue.map((item, i) => (
        <div key={i} className="p-3 bg-gray-800 rounded mb-2">
          {item.title}
        </div>
      ))}

      <Button onClick={skipSong} className="mt-6">
        Skip Song
      </Button>
    </div>
  );
}
