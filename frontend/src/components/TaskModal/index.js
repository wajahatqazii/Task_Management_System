import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useAppDispatch, useAppState } from "../../context/appContext";
import { saveTask, updateTask } from "../../context/appContext/actions";
function TaskModal() {
  const dispatch = useAppDispatch();
  const { openModal, selectedTask, statusOptions } = useAppState();
  const [state, setState] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  useEffect(() => {
    if (selectedTask) {
      setState({
        title: selectedTask?.title || "",
        description: selectedTask?.description || "",
        status: selectedTask?.status || "",
      });
    }
  }, [selectedTask]);

  const closeModal = () => {
    dispatch({ type: "TOGGLE_MODAL" });
    setState({
      title: "",
      description: "",
      status: "todo",
    });
    dispatch({ type: "SELECTED_TASK", task: null });
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const hanldeOnSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      updateTask({ ...state, task_id: selectedTask?._id }, () => {
        closeModal();
        dispatch({ type: "UPDATE_LIST" });
      });
    } else {
      saveTask(state, () => {
        closeModal();
        dispatch({ type: "UPDATE_LIST" });
      });
    }
  };

  return (
    <>
      <Modal show={openModal} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTask ? "Edit" : "Create"} Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={hanldeOnSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task title"
                name="title"
                value={state.title}
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <FloatingLabel
                controlId="floatingSelect"
                label="Select task status"
                name="status"
                value={state.status}
                onChange={(e) => setState({ ...state, status: e.target.value })}
              >
                <Form.Select aria-label="Floating label select example">
                  {statusOptions?.map((item) => (
                    <option value={item.value} key={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Task description"
                name="description"
                value={state.description}
                onChange={handleOnChange}
                required
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

export default TaskModal;
