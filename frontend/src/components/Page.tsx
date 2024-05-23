// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";

export interface PageProps {
  title: string;
  titleExtra?: ReactNode;
  children: ReactNode;
}

/** Page component */
export const Page: FC<PageProps> = ({ title, titleExtra, children }) => {
  return (
    <div className="grid min-h-0 grid-rows-[32px_1fr] gap-4 p-4">
      <div className="flex items-center">
        <div className="flex-grow text-2xl font-semibold">{title}</div>
        {titleExtra}
      </div>

      {children}
    </div>
  );
};
