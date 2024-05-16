// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { Link } from "react-router-dom";

// App
// -----------------------------------------------------------------------------
import { makeUrl } from "src/router";

/** Application header */
export const AppHeader: FC = () => {
  return (
    <div className="sticky top-0 flex items-center gap-8 border-t-4 border-t-red-600 bg-white px-5 py-3 shadow">
      <Link to={makeUrl("root")} className="text-2xl">
        TODOSHKI
      </Link>

      <Link to={makeUrl("boardList")} className="text-blue-500 underline">
        BOARDS
      </Link>
    </div>
  );
};
