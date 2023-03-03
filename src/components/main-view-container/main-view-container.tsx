import { style } from "@mui/system";
import React from "react";
import styles from "./main-view.module.css";

export default function MainViewContainer() {
  const [transform, setTransform] = React.useState("");
  const windowWidth = window.innerWidth / 5;
  const windowHeight = window.innerHeight / 5;

  const mouseMoveHandler = (e) => {
    const mouseX = e.clientX / windowWidth;
    const mouseY = e.clientY / windowHeight;
    setTransform(`translate3d(-${mouseX}%, -${mouseY}%, 0)`);
  };

  return (
    <div onMouseMove={mouseMoveHandler} className={styles.container}>
      <h2 className={styles.title}>Home page</h2>
      {/* <div className={styles.moonImage}></div> */}
      <div className={styles.earthImage} style={{ transform: transform }}></div>
    </div>
  );
}
