import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-xs uppercase tracking-widest",
            dark ? "text-white/60" : "text-muted"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight md:text-5xl",
          dark ? "text-white" : "text-fg"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-xl", dark ? "text-white/60" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
