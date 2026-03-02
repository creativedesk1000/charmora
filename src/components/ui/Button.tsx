import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "charmora-gradient text-white hover:opacity-90 shadow-md",
            secondary: "bg-white text-charmora-purple hover:bg-charmora-beige border border-charmora-purple/10",
            outline: "border border-charmora-pink-dark text-charmora-pink-dark hover:bg-charmora-pink-dark hover:text-white",
            ghost: "text-charmora-purple hover:bg-charmora-pink-dark/5",
            dark: "bg-[#1a1a1a] text-white hover:bg-black",
        };

        const sizes = {
            sm: "px-5 py-2 text-[10px]",
            md: "px-10 py-3.5 text-xs",
            lg: "px-12 py-4.5 text-sm",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-[2px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };

