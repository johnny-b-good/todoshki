// Lib
// -----------------------------------------------------------------------------
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

// App
// -----------------------------------------------------------------------------
import { paths } from "./paths";
import { App } from "src/app";
import { BoardListPage } from "src/pages";

export const routes: RouteObject[] = [
  {
    element: <App />,
    path: paths.root,
    children: [
      {
        element: <BoardListPage />,
        path: paths.boardList,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
