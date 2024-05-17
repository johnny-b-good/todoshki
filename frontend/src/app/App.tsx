// Lib
// -----------------------------------------------------------------------------
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

// App
// -----------------------------------------------------------------------------
import { AppHeader } from "./components";
import { Loader } from "src/components";

/** Root component of the application */
export const App: FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-700">
      <AppHeader />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
