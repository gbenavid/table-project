import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchCollection } from 'hooks/useFetchCollection';
import Table from 'components/tables/Table';
import Cell from 'components/tables/Cell';
import Pagination from 'components/tables/Pagination';
import functions from '../data/functions.json';
import segments from '../data/segments.json';
import FilterBox from 'components/tables/FilterBox';

const Main = styled.div``;
const Content = styled.div`
  padding: 40px;
  display: flex;
  gap: 20px;
  max-height: 1291px;
  justify-content: center;
`;
const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template: auto / 300px;
  justify-content: space-between;
  align-content: space-between;
`;

const columns = [
  {
    name: 'ID',
    selector: 'id',
    minWidth: '80px',
    cell: (row) => <Cell name="ID">{row.id}</Cell>,
  },
  {
    name: 'Title',
    selector: 'title',
    minWidth: '150px',
    cell: (row) => <Cell name="Title">{row.title}</Cell>,
  },
  {
    name: 'Functions',
    selector: 'row.functions',
    minWidth: '135px',
    cell: (row) => (
      <Cell name="Job Functions" value={row.functions?.join(', ')} />
    ),
  },
  {
    name: 'Segments',
    selector: 'row.segments',
    minWidth: '135px',
    cell: (row) => (
      <Cell name="Job Segments" value={row.segments?.join(', ')} />
    ),
  },
];

const Home = ({ tableId }) => {
  const {
    data,
    params,
    page,
    limit,
    setQueryParam,
    isLoading,
    error,
  } = useFetchCollection(tableId);

  const [selectedFunctions, setSelectedFunctions] = useState(
    params.get(`${tableId}_functions`)
      ? params.get(`${tableId}_functions`).split(',')
      : []
  );
  const [selectedSegments, setSelectedSegments] = useState(
    params.get(`${tableId}_segments`)
      ? params.get(`${tableId}_segments`).split(',')
      : []
  );

  const updateSearchParams = ({ value, isSelected, filterType }, options) => {
    if (isSelected) {
      options = options.filter((option) => option !== value);
    } else {
      options.push(value);
    }
    params.set(`${tableId}_${filterType}`, options);
    params.set(`${tableId}_page`, 1);
    setQueryParam(params);
    return options;
  };

  if (error) return <>Error</>;
  return (
    <Main>
      <Content>
        <FilterContainer>
          <FilterBox
            label="Select a Function"
            id={`${tableId}_functions`}
            selectedOptions={selectedFunctions}
            options={functions}
            handleFilter={(option) => {
              const updatedOptions = updateSearchParams(
                { filterType: 'functions', ...option },
                [...selectedFunctions]
              );
              setSelectedFunctions(updatedOptions);
            }}
          />
          <FilterBox
            label="Select a Segment"
            id={`${tableId}_segments`}
            selectedOptions={selectedSegments}
            options={segments}
            handleFilter={(option) => {
              const updatedOptions = updateSearchParams(
                { filterType: 'segments', ...option },
                [...selectedSegments]
              );
              setSelectedSegments(updatedOptions);
            }}
          />
        </FilterContainer>

        <StyledTableContainer>
          <Table
            columns={columns}
            data={data?.items}
            total={data?.total}
            progressPending={isLoading}
          />
          <Pagination
            currentPage={page}
            limit={limit}
            total={data?.total}
            tableId={tableId}
            onChangePage={(currentPage) => {
              params.set(`${tableId}_page`, currentPage);
              setQueryParam(params);
            }}
          />
        </StyledTableContainer>
      </Content>
    </Main>
  );
};

export default Home;
