import React from "react";
import "./i18n.js";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import MainViewContents from "./components/main-view-container";
import NewsComponent from "./components/news";
import MainView from "./routes/main-view.jsx";
import ProfileView from "./routes/profile-view.jsx";
import ErrorPage from "./components/utility/error-page.jsx";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { fetchInitialPosts } from "./services/jsonplaceholder-api";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

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
            loader: async () => {
              return fetchInitialPosts();
            },
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
