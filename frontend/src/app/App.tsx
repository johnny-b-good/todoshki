// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { Outlet } from "react-router-dom";

// App
// -----------------------------------------------------------------------------

export const App: FC = () => {
  return (
    <div>
      <div>APP</div>
      <Outlet />
    </div>
  );
};
