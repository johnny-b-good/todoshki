// Lib
// -----------------------------------------------------------------------------
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";

// App
// -----------------------------------------------------------------------------
import "./styles/main.css";
import { queryClient } from "src/api";
import { router } from "src/router";

dayjs.extend(dayjsRelativeTime);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
