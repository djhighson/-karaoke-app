"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlayerControls from "@/components/PlayerControls";
import QueueItem from "@/components/QueueItem";

export default function ScreenPage() {
  const { id } = useParams();
  const roomId = Array.isArray(id) ? id[0] : id;

  const [queue, setQueue] = useState([]);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    async function loadRoom() {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();

      if (data) {
        setQueue(data.queue || []);
        setCurrentVideo(data.current_video || "");
      }
    }

    loadRoom();

    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `id=eq.${roomId}` },
        (payload) => {
          const newData = payload.new;
          setQueue(newData.queue || []);
          setCurrentVideo(newData.current_video || "");
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [roomId]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Screen Code: {roomId}</h1>

      {currentVideo ? (
        <iframe
          width="960"
          height="540"
          src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
          className="rounded-xl mb-6"
        />
      ) : (
        <div className="text-xl text-gray-400 mb-6">
          Waiting for a song...
        </div>
      )}

      <h2 className="text-2xl mb-4">Queue</h2>

      <div className="flex flex-col gap-4 w-full max-w-xl">
        {queue.map((item) => (
          <QueueItem key={item.id} title={item.title} addedBy={item.addedBy} />
        ))}
      </div>

      <PlayerControls />
    </div>
  );
}
