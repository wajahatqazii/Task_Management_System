import React from "react";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppState } from "../../../context/appContext";
import { deleteTask } from "../../../context/appContext/actions";
const TableRows = ({ item }) => {
  const dispatch = useAppDispatch();
  const { statusOptions } = useAppState();
  const handleOnClick = (item) => {
    dispatch({ type: "SELECTED_TASK", task: item });
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const handlOnDelete = (id) => {
    deleteTask(id, () => {
      dispatch({ type: "UPDATE_LIST" });
    });
  };

  // SELECTED_TASK
  return (
    <>
      <tr key={item?._id}>
        <td title={item?.title}>{item?.title}</td>
        <td className="truncate" title={item?.description}>
          {item?.description}
        </td>
        <td title={item?.status}>
          {" "}
          {statusOptions?.find((ite) => ite?.value === item?.status)?.name ||
            item?.status}
        </td>
        <td>
          <div className="table-row-action">
            <Button
              variant="outline-primary"
              onClick={() => handleOnClick(item)}
            >
              Edit/View
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handlOnDelete(item?._id)}
            >
              delete
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRows;
