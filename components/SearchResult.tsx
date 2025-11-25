export default function SearchResult({
  title,
  thumbnail,
  onSelect
}: {
  title: string;
  thumbnail: string;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-3 p-3 rounded-xl border border-brand.subtle bg-white cursor-pointer hover:bg-brand.subtle transition"
    >
      <img src={thumbnail} alt="thumb" className="w-20 h-12 rounded-lg object-cover" />
      <div className="text-brand.text text-sm">{title}</div>
    </div>
  );
}
