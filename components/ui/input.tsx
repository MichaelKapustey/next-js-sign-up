import * as React from "react";
import { cn } from "@/lib/utils";

export type ValidationState = 'initial' | 'valid' | 'error';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { validationState?: ValidationState }>(
    ({ className, type, validationState, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full bg-white border-white border rounded border-input px-5 py-1 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    { 'border-error focus:ring-error bg-errorLight': validationState === 'error' },
                    { 'border-success focus:ring-success bg-white': validationState === 'valid' },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input";

export { Input }
