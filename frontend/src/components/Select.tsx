// Lib
// -----------------------------------------------------------------------------
import { ReactNode } from "react";
import {
  Select as HeadlessSelect,
  SelectProps as HeadlessSelectProps,
} from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export interface SelectProps<T extends number | string>
  extends HeadlessSelectProps {
  options: { value: T; label: ReactNode }[];
}

/** Select component */
export const Select = <T extends number | string>({
  className,
  options,
  ...props
}: SelectProps<T>) => {
  return (
    <HeadlessSelect
      className={clsx(
        "block w-full cursor-pointer appearance-none rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 shadow-sm outline-none transition-colors",
        "focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50",
        className,
      )}
      {...props}
    >
      {options.map(({ value, label }) => {
        return <option value={value}>{label}</option>;
      })}
    </HeadlessSelect>
  );
};
