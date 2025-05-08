// src/components/CandidatePage.js
import React from 'react';
import CandidateTable from './CandidateTable';
import candidateRaw from '../Data/CandidateRecord.json';
import { mapRawCandidate } from '../utils/mapRawcandidate';

import { StatusColumn, AvailabilityColumn } from '../tableConfig/tableColumns';

const columns = [
  {
    header: '#',
    accessorKey: 'id',
  },
  {
    header: 'Verified',
    accessorKey: 'verified',
    cell: StatusColumn,
  },
  {
    header: 'Rank',
    accessorKey: 'rank',
  },
  {
    header: 'Nationality',
    accessorKey: 'nationality',
  },
  {
    header: 'Salary',
    accessorFn: row =>
      `${row.salary_expectation || '-'} ${row.currency || ''}`,
  },
  {
    header: 'Availability',
    accessorKey: 'availability',
    cell: AvailabilityColumn,
  },
];

const mappedData = candidateRaw.Candidates.map(mapRawCandidate);

const CandidatePage = () => {
  return (
    <div>
      <h2>Candidate Listing</h2>
      <CandidateTable data={mappedData} columns={columns} />
    </div>
  );
};

export default CandidatePage;
