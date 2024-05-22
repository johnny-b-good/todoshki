// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import {
  Textarea as HeadlessTextarea,
  TextareaProps as HeadlessTextareaProps,
} from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export type TextareaProps = HeadlessTextareaProps;

/** Textarea component */
export const Textarea: FC<TextareaProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <HeadlessTextarea
      className={clsx(
        "block w-full rounded border-slate-300 px-2 py-1 text-sm shadow-sm placeholder:text-slate-300",
        "focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessTextarea>
  );
};
