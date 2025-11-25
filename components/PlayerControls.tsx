"use client";

export default function PlayerControls({
  onPlay,
  onPause,
  onSkip,
}: {
  onPlay: () => void;
  onPause: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex gap-3">
      <button onClick={onPlay} className="bg-green-600 text-white px-3 py-2 rounded">
        Play
      </button>
      <button onClick={onPause} className="bg-yellow-500 text-white px-3 py-2 rounded">
        Pause
      </button>
      <button onClick={onSkip} className="bg-red-600 text-white px-3 py-2 rounded">
        Skip
      </button>
    </div>
  );
}
