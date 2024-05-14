// Lib
// -----------------------------------------------------------------------------
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

// App
// -----------------------------------------------------------------------------
import { paths } from "./paths";
import { App } from "src/app";

// Pages
// -----------------------------------------------------------------------------
const BoardListPage = lazy(
  () => import("src/pages/BoardListPage/BoardListPage"),
);
const BoardPage = lazy(() => import("src/pages/BoardPage/BoardPage"));

export const routes: RouteObject[] = [
  {
    element: <App />,
    path: paths.root,
    children: [
      {
        element: <BoardListPage />,
        path: paths.boardList,
      },
      {
        element: <BoardPage />,
        path: paths.board,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
