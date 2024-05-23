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
    <div className="grid h-screen grid-rows-[60px_1fr] bg-slate-50 text-slate-700">
      <AppHeader />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
