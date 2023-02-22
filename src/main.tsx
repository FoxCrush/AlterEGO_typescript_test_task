import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/main-view";
import ErrorPage from "./components/utility/error-page.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "news",
        element: <div>News page</div>,
        // loader: teamLoader,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
