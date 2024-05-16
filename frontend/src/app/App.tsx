// Lib
// -----------------------------------------------------------------------------
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

// App
// -----------------------------------------------------------------------------

import { AppHeader } from "./components";

/** Root component of the application */
export const App: FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-600">
      <AppHeader />

      <Suspense fallback={<div className="text-red-500">PAGE LOADING</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
