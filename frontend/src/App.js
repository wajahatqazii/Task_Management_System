import React, { useEffect } from "react";
import AppRoutes from "./route";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "./context/appContext";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("task-app")) {
      const { user } = jwtDecode(localStorage.getItem("task-app"));
      dispatch({ type: "SET_USER_DETAIL", user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
