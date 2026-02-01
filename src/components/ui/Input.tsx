import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "rounded-full border border-black/10 bg-white px-5 py-3 text-sm text-fg placeholder:text-muted",
        "focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
        "transition-all",
        className
      )}
      {...props}
    />
  );
}
