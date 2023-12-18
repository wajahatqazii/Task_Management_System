import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ProfileModal from "../components/ProfileModal";
import { useAppState } from "../context/appContext";
const NavBar = React.lazy(() => import("../components/Navbar"));
const TaskModal = React.lazy(() => import("../components/TaskModal"));
function Layout() {
  const { profileModal, openModal } = useAppState();
  return (
    <>
      <NavBar />
      <Container className="app-wrapper">
        <Outlet />
      </Container>
      {openModal && <TaskModal />}
      {profileModal && <ProfileModal />}
      <ToastContainer autoClose={8000} />
    </>
  );
}

export default Layout;
