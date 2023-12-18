import React from "react";
import { AppProvider } from "./appContext";
import App from "../App";

function MainContext() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
export default MainContext;
