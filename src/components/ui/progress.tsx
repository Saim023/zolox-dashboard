import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorColor?: string;
  secondaryIndicatorColor?: string;
  secondaryValue?: number;
  value?: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      indicatorColor = "bg-primary",
      secondaryValue = 0,
      secondaryIndicatorColor,
      ...props
    },
    ref
  ) => {
    const totalValue = Math.min(100, value + secondaryValue);
    const safeValue = Math.max(0, Math.min(100, value || 0));
    const safeSecondaryValue = Math.max(0, Math.min(100, secondaryValue || 0));

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        {...props}
      >
        {/* Secondary indicator (booked) */}
        {safeSecondaryValue > 0 && (
          <ProgressPrimitive.Indicator
            className={cn(
              "absolute h-full w-full flex-1 transition-all",
              secondaryIndicatorColor || indicatorColor
            )}
            style={{ width: `${totalValue}%` }}
          />
        )}
        {/* Primary indicator (available) */}
        <ProgressPrimitive.Indicator
          className={cn(
            "absolute h-full w-full flex-1 transition-all",
            indicatorColor
          )}
          style={{ width: `${safeValue}%` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
