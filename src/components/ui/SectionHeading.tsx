import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-widest text-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-muted">{description}</p>
      )}
    </div>
  );
}
