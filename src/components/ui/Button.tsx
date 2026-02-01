import { cn } from "@/lib/utils";
import { cloneElement, isValidElement, type ReactElement } from "react";

type ButtonVariant = "primary" | "ghost" | "outline";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: false;
}

interface ButtonAsChildProps extends ButtonBaseProps {
  asChild: true;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsChildProps;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#1C1F26] text-white hover:opacity-90",
  ghost: "bg-transparent text-[#1C1F26] hover:bg-black/5",
  outline: "border border-black/10 text-[#1C1F26] hover:bg-black/5",
};

export function Button({
  variant = "primary",
  className,
  children,
  asChild,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all",
    variants[variant],
    className
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ className?: string }>, {
      className: cn(classes, (children as ReactElement<{ className?: string }>).props.className),
    });
  }

  return (
    <button className={classes} {...(props as ButtonAsButtonProps)}>
      {children}
    </button>
  );
}
