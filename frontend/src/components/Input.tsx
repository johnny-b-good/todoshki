// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import {
  Input as HeadlessInput,
  InputProps as HeadlessInputProps,
} from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export type InputProps = HeadlessInputProps;

/** Input component */
export const Input: FC<InputProps> = ({ className, children, ...props }) => {
  return (
    <HeadlessInput
      className={clsx(
        "block w-full rounded border-slate-300 px-3 py-2 shadow-sm  placeholder:text-slate-300 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 ",
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessInput>
  );
};
