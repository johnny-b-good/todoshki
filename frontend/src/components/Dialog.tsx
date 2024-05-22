// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import CSS from "csstype";

// App
// -----------------------------------------------------------------------------
import { Button } from "./Button";

// Props
// -----------------------------------------------------------------------------
export interface DialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  title?: string;
  description?: ReactNode;
  children?: ReactNode;
  width?: CSS.Properties["width"];
}

/** Dialog component */
export const Dialog: FC<DialogProps> = ({
  open,
  onOk,
  onCancel,
  title,
  description,
  children,
  width,
}) => {
  return (
    <HeadlessDialog open={open} onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-10 p-4 ">
        <DialogPanel
          className="max-w-xl space-y-4 rounded border bg-white px-8 py-6 text-sm shadow-xl"
          style={{ width }}
        >
          {title && (
            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          )}

          {description && <Description>{description}</Description>}

          {children}

          <div className="flex justify-end gap-4">
            <Button
              variant="default"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onOk();
              }}
            >
              OK
            </Button>
          </div>
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
};
