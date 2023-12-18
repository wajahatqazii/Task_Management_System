import React from "react";
import { Table } from "react-bootstrap";
const Loader = React.lazy(() => import("../Loader"));
const TableHeads = React.lazy(() => import("./TableHead"));
const TableRows = React.lazy(() => import("./TableRows"));
function DataTable({ data, isLoading }) {
  return (
    <Table striped bordered hover>
      <TableHeads />
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              <Loader />
            </td>
          </tr>
        ) : data?.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No Data Found
            </td>
          </tr>
        ) : (
          data?.map((item) => <TableRows item={item} key={item?._id} />)
        )}
      </tbody>
    </Table>
  );
}

export default DataTable;
