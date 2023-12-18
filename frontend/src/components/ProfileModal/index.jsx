import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppState } from "../../context/appContext";
import { getUser, updateUser } from "../../context/appContext/actions";

function ProfileModal() {
  const dispatch = useAppDispatch();
  const { profileModal, userDetail } = useAppState();
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_id: "",
  });

  useEffect(() => {
    if (userDetail) {
      getUser(userDetail?._id, (data) => {
        setState({
          first_name: data?.first_name,
          last_name: data?.last_name,
          email: data?.email,
          user_id: data?._id,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail?._id]);

  const closeModal = () => {
    dispatch({ type: "TOGGLE_PROFILE_MODAL" });
    setState({
      first_name: "",
      last_name: "",
      email: "",
      user_id: "",
    });
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const hanldeOnSubmit = (e) => {
    e.preventDefault();
    updateUser(state, (user) => {
      closeModal();
      dispatch({ type: "SET_USER_DETAIL", user });
    });
  };

  return (
    <>
      <Modal show={profileModal} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={hanldeOnSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="first_name"
                value={state.first_name}
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={state.last_name}
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={state.email}
                readOnly
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeModal()}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ProfileModal;
