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
        "flex items-center gap-2 rounded border px-4 py-1 shadow-sm outline-none transition-colors focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50",
        variant === "primary" &&
          "border-teal-600 bg-teal-500 text-white hover:border-teal-500 hover:bg-teal-400",
        variant === "default" &&
          "border-slate-300 bg-white  text-slate-700 hover:border-teal-500 hover:text-teal-500",
        variant === "text" &&
          "border-transparent bg-white text-slate-700 hover:bg-slate-100",
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
};
