import React, { useEffect, useState } from "react";
import { getTasks } from "../../context/appContext/actions";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppState } from "../../context/appContext";
import { Container, Row } from "react-bootstrap";
import { useDebounce } from "../../utils/useDebounce";
const SearchForm = React.lazy(() => import("../../components/SearchForm"));
const DataTable = React.lazy(() => import("../../components/Table"));
const PaginationComponent = React.lazy(() =>
  import("../../components/Pagination")
);

function MovieList() {
  const { isListUpdate, userDetail } = useAppState();
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sort: "",
    page: 1,
  });

  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search);

  useEffect(() => {
    setFilters({ ...filters, search: searchDebounce });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce]);

  const { data, isLoading } = useQuery(
    [`TASK_LIST-${userDetail?._id}`, { ...filters, isListUpdate }],
    () => getTasks(filters),
    {
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || error?.message || "Record Not Found"
        );
      },
      keepPreviousData: false,
      staleTime: 5000,
      retryOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  return (
    <>
      <Container>
        <SearchForm
          setSearch={setSearch}
          search={search}
          filters={filters}
          setFilters={setFilters}
        />
        <Row>
          <DataTable
            data={data?.data?.data?.data || []}
            isLoading={isLoading}
          />
          {data?.data?.data?.meta?.itemCount > 5 && (
            <PaginationComponent
              meta={data?.data?.data?.meta}
              setFilters={setFilters}
              filters={filters}
            />
          )}
        </Row>
      </Container>
    </>
  );
}

export default MovieList;
