// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import {
  Label as HeadlessLabel,
  LabelProps as HeadlessLabelProps,
} from "@headlessui/react";
import { clsx } from "clsx";

/** Label component */
export const Label: FC<HeadlessLabelProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <HeadlessLabel
      className={clsx("text-sm font-semibold", className)}
      {...props}
    >
      {children}
    </HeadlessLabel>
  );
};
