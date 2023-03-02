import React from "react";
import MenuAppBar from "../components/navigation-bar";
import { RotatingLines } from "react-loader-spinner";

export default function MainView() {
  return (
    <React.Suspense
      fallback={
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.5"
          width="96"
          visible={true}
        />
      }
    >
      <MenuAppBar />
    </React.Suspense>
  );
}
