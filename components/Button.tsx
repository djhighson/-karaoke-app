import { cn } from "@/lib/utils";

export function Button({
  children,
  onClick,
  className
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg bg-brand.accent text-white hover:opacity-90 transition",
        className
      )}
    >
      {children}
    </button>
  );
}
