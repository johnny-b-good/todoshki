// Lib
// -----------------------------------------------------------------------------
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

// App
// -----------------------------------------------------------------------------
import { makeUrl } from "src/router";

export const App: FC = () => {
  return (
    <div>
      <div>APP</div>
      <div>
        NAV{" "}
        <Link to={makeUrl("boardList")} className="text-blue-500 underline">
          BOARDS
        </Link>
      </div>

      <Suspense fallback={<div className="text-red-500">PAGE LOADING</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
