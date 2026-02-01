import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
