import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Protected from "./Protected";
const TaskList = React.lazy(() => import("../views/TaskList"));
const Layout = React.lazy(() => import("../layout"));
const Loader = React.lazy(() => import("../components/Loader"));
const Login = React.lazy(() => import("../views/Login"));
const SignUp = React.lazy(() => import("../views/Signup"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route name="Home" element={<Layout />}>
            <Route path="/login" name="Login" element={<Login />} />
            <Route path="/sign-up" name="Sign Up" element={<SignUp />} />
            <Route
              path="/"
              name="Movie List"
              element={
                <Protected isLoggedIn={localStorage.getItem("task-app")}>
                  <TaskList />
                </Protected>
              }
            />
            <Route path="*" element={<Navigate to="Movie List" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
