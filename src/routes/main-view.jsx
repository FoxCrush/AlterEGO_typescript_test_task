import React from "react";
import MenuAppBar from "../components/navigation-bar";

export default function MainView() {
  return (
    <React.Suspense fallback="loading">
      <MenuAppBar />
    </React.Suspense>
  );
}
