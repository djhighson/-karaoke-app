export default function QueueItem({
  title,
  addedBy,
  onPlay
}: {
  title: string;
  addedBy: string;
  onPlay?: () => void;
}) {
  return (
    <div
      className="flex justify-between items-center p-3 rounded-xl border border-brand.subtle bg-white"
    >
      <div>
        <div className="font-medium text-brand.text">{title}</div>
        <div className="text-xs text-brand.subtle">Added by {addedBy}</div>
      </div>
      {onPlay && (
        <button
          onClick={onPlay}
          className="px-3 py-1 text-sm rounded-lg bg-brand.accent text-white"
        >
          Play
        </button>
      )}
    </div>
  );
}
