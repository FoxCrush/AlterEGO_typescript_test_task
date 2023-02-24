import React from "react";
import ReactDOM from "react-dom/client";
import MainViewContents from "./components/main-view-container";
import NewsComponent from "./components/news";
import App from "./components/main-view";
import ErrorPage from "./components/utility/error-page.jsx";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <MainViewContents />,
            errorElement: <ErrorPage />,
          },
          {
            path: "news",
            element: <NewsComponent />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
