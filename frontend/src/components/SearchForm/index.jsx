import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useAppState } from "../../context/appContext";

const SearchForm = ({ setSearch, search, filters, setFilters }) => {
  const { statusOptions } = useAppState();
  return (
    <Form className="mb-4 mt-3">
      <Row className="align-items-center">
        {/* Search Input */}
        <Col sm={4}>
          <Form.Group controlId="searchInput">
            <Form.Control
              type="text"
              placeholder="Search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Select Dropdown */}
        <Col sm={4}>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Control
              as="select"
              custom="true"
              name="status"
              value={filters?.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              {[{ name: "ALL", value: "" }, ...statusOptions]?.map((item) => (
                <option value={item.value} key={item.name}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};
export default SearchForm;
