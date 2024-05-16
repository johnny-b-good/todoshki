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
export type ButtonProps = HeadlessButtonProps;

/** Button component */
export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <HeadlessButton
      className={clsx(
        "flex items-center gap-2 rounded bg-teal-600 px-3 py-2 text-white shadow transition-colors hover:bg-teal-700",
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
};
