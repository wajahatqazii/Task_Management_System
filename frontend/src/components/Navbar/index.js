import React from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { useAppDispatch, useAppState } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userDetail } = useAppState();
  const handleOnCLick = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const onLogout = () => {
    localStorage.clear();
    dispatch({ type: "SET_USER_DETAIL", user: null });
    navigate("/login", { replace: true });
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Task Management Application</Navbar.Brand>
        {localStorage.getItem("task-app") && (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <Nav.Link eventkey={1} onClick={() => handleOnCLick()}>
                  Create Task
                </Nav.Link>
                <Nav.Link eventkey={2} onClick={() => onLogout()}>
                  Logout
                </Nav.Link>
                <Nav.Item
                  eventkey={3}
                  className="d-flex align-items-center"
                  onClick={() => {
                    dispatch({ type: "TOGGLE_PROFILE_MODAL" });
                  }}
                >
                  <span>
                    {(userDetail?.first_name || "") +
                      " " +
                      (userDetail?.last_name || "")}
                  </span>
                  <Image
                    src={userDetail?.profile}
                    roundedCircle
                    width="30"
                    height="30"
                    className="ml-2"
                  />
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
