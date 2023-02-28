import React from "react";
import "./i18n.js";
import "./index.css";
import ReactDOM from "react-dom/client";
import MainViewContents from "./components/main-view-container";
import NewsComponent from "./components/news";
import MainView from "./routes/main-view.jsx";
import ProfileView from "./routes/profile-view.jsx";
import ErrorPage from "./components/utility/error-page.jsx";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
const router = createHashRouter([
  {
    path: "/",
    element: <MainView />,
    errorElement: <ErrorPage />,
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
          {
            path: "profile",
            element: <ProfileView />,
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
