// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { Link } from "react-router-dom";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import { makeUrl } from "src/router";

/** Application header */
export const AppHeader: FC = () => {
  return (
    <div className="flex items-center gap-8 border-t-4 border-t-teal-500 bg-white px-4 py-3 shadow">
      <Link
        to={makeUrl("root")}
        className="flex items-center gap-2 text-2xl uppercase"
      >
        <ClipboardDocumentListIcon className="size-8" />
        Todoshki
      </Link>

      <Link to={makeUrl("boardList")} className="text-blue-500 underline">
        BOARDS
      </Link>
    </div>
  );
};
