import { cn } from "@/lib/utils";

export function Input({
  value,
  onChange,
  placeholder,
  className
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "w-full px-4 py-2 rounded-lg border border-brand.subtle bg-white text-brand.text focus:outline-none focus:ring-2 focus:ring-brand.accent transition",
        className
      )}
    />
  );
}
