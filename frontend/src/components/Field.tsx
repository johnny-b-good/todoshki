// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import {
  Field as HeadlessField,
  FieldProps as HeadlessFieldProps,
} from "@headlessui/react";
import { clsx } from "clsx";

/** Field component */
export const Field: FC<HeadlessFieldProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <HeadlessField
      className={clsx("flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </HeadlessField>
  );
};
