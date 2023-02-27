import React from "react";
import "./i18n.js";
import "./index.css";
import ReactDOM from "react-dom/client";
import MainViewContents from "./components/main-view-container";
import NewsComponent from "./components/news";
import NavBar from "./components/navigation-bar";
import MainView from "./routes/main-view.jsx";
import ErrorPage from "./components/utility/error-page.jsx";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
const router = createHashRouter([
  {
    path: "/",
    element: <MainView />,
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
