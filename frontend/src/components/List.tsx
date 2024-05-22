// Lib
// -----------------------------------------------------------------------------
import { ReactNode } from "react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export interface ListProps<T extends { id: number }> {
  items: T[];
  onClick: (item: T) => void;
  renderItem: (item: T) => ReactNode;
  listClassName?: string;
  itemClassName?: string;
}

/** List component */
export const List = <T extends { id: number }>({
  items,
  onClick,
  renderItem,
  listClassName,
  itemClassName,
}: ListProps<T>) => {
  return (
    <div className={clsx("rounded bg-white text-sm shadow", listClassName)}>
      {items.map((item, index) => (
        <div
          className={clsx(
            "flex cursor-pointer text-sm transition-colors hover:bg-slate-50",
            index !== items.length - 1 &&
              "border-b border-solid border-b-slate-300",
            index === 0 && "rounded-t",
            index === items.length - 1 && "rounded-b",
            itemClassName,
          )}
          key={item.id}
          onClick={() => {
            onClick(item);
          }}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};
