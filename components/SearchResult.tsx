"use client";

export default function SearchResult({
  video,
  onAdd,
}: {
  video: any;
  onAdd: () => void;
}) {
  return (
    <div className="border p-3 rounded flex gap-3 items-center">
      <img src={video.thumbnail[0].url} width={120} className="rounded" />
      <div className="flex-1">
        <p className="font-semibold">{video.title}</p>
        <button onClick={onAdd} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
          Add to Queue
        </button>
      </div>
    </div>
  );
}
