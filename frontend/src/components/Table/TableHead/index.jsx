import React from "react";

const TableHeads = () => {
  const heads = ["Title", "Description", "Status", "Action"];
  return (
    <thead>
      <tr>
        {heads?.map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeads;
