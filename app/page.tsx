"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/Button";

export default function HomePage() {
  const router = useRouter();
  const [screenCode, setScreenCode] = useState("");

  const createRoom = () => {
    const code = Math.random().toString().slice(2, 8);
    router.push(`/screen/${code}`);
  };

  const joinRoom = () => {
    if (screenCode.trim().length === 0) return;
    router.push(`/screen/${screenCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Karaoke App</h1>

      <input
        className="border p-3 rounded mb-4 w-64 text-black"
        placeholder="Enter screen code"
        value={screenCode}
        onChange={(e) => setScreenCode(e.target.value)}
      />

      <Button onClick={joinRoom}>Join Screen</Button>

      <div className="my-4">or</div>

      <Button onClick={createRoom}>Create New Screen</Button>
    </div>
  );
}


