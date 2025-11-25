export default function PlayerControls({
  onPlay,
  onPause,
  onSkip
}: {
  onPlay?: () => void;
  onPause?: () => void;
  onSkip?: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={onPlay}
        className="px-4 py-2 bg-brand.accent text-white rounded-lg"
      >
        Play
      </button>

      <button
        onClick={onPause}
        className="px-4 py-2 bg-brand.subtle text-brand.text rounded-lg"
      >
        Pause
      </button>

      <button
        onClick={onSkip}
        className="px-4 py-2 bg-brand.text text-white rounded-lg"
      >
        Skip
      </button>
    </div>
  );
}
