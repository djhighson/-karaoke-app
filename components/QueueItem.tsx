"use client";

export default function QueueItem({
  title,
  addedBy,
}: {
  title: string;
  addedBy: string;
}) {
  return (
    <div className="border p-3 rounded flex justify-between">
      <span>{title}</span>
      <span className="text-sm opacity-70">+ {addedBy}</span>
    </div>
  );
}
