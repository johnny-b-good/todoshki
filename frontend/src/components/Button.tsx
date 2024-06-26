// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export interface ButtonProps extends HeadlessButtonProps {
  variant?: "primary" | "default" | "text";
}

/** Button component */
export const Button: FC<ButtonProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  return (
    <HeadlessButton
      className={clsx(
        "flex items-center gap-2 whitespace-nowrap rounded border px-2 py-1 text-sm outline-none transition-colors",
        "focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50",
        variant === "primary" &&
          "border-teal-600 bg-teal-500 text-white shadow-sm hover:border-teal-500 hover:bg-teal-400",
        variant === "default" &&
          "border-slate-300 bg-white text-slate-700 shadow-sm hover:border-teal-500 hover:text-teal-500",
        variant === "text" &&
          "border-transparent bg-transparent text-slate-700 hover:bg-white hover:bg-opacity-50 hover:text-teal-500",
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
};
