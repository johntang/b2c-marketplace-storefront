import { cn } from "@/lib/utils";

interface ChipProps {
  value?: React.ReactNode | string;
  selected?: boolean;
  disabled?: boolean;
  color?: boolean;
  onSelect?: () => void;
  className?: string;
  metadata?: {
    [key: string]: {
      color?: string;
    };
  };
}

export function Chip({
  value,
  selected,
  disabled,
  color,
  onSelect,
  className,
  metadata,
}: ChipProps) {
  const baseClasses = "chip-wrapper";
  const selectedClasses = selected ? "border-primary" : "";
  const hoverClasses = !disabled && !selected ? "hover:bg-gray-200" : "";
  const disabledClasses = disabled
    ? "bg-component border-disabled/50 hover:bg-component cursor-not-allowed text-disabled"
    : "cursor-pointer";
  const colorClasses = color ? "w-[40px] h-[40px] border" : "";
  const colorCode = color && metadata?.[value as string].color;

  return (
    <div
      data-disabled={disabled}
      className={cn(
        baseClasses,
        colorClasses,
        selectedClasses,
        hoverClasses,
        disabledClasses,
        className
      )}
      onClick={!disabled ? onSelect : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {/* <span>{value}</span> */}
      {color && typeof colorCode === "string" ? (
        <span
          style={{
            backgroundColor: colorCode,
          }}
          className={cn(
            "w-[32px] h-[32px] bg-action absolute top-[3px] left-[3px] rounded-xs",
            disabled && "bg-disabled"
          )}
        />
      ) : (
        value
      )}
    </div>
  );
}
