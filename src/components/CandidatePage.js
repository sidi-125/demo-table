// src/components/CandidatePage.js
import React from 'react';
import CandidateTable from './CandidateTable';
import candidateRaw from '../Data/CandidateRecord.json';
import { mapRawCandidate } from '../utils/mapRawcandidate';

import { StatusColumn, AvailabilityColumn } from '../tableConfig/tableColumns';
import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';

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
  {
    header: 'Vessel Experience',
    accessorKey: 'vesselExperience',
    cell: ({ row }) => {
      const vesselExperience = row.original.experience?.vesselExperience;
      if (!vesselExperience || vesselExperience.length === 0) {
        return '-';
      }
      return vesselExperience.map((exp, index) => (
        <div key={index}>{exp.vesselType}: {exp.exp} years</div>
      ));
    },
    size: 150,  // Adjusting the width of this column
  },
  {
    header: 'Seagoing Experience',
    accessorKey: 'seagoingExperience',
    cell: ({ row }) => {
      const seagoingExperience = row.original.experience?.seagoingExperience;
      if (!seagoingExperience || seagoingExperience.length === 0) {
        return '-';
      }
      return seagoingExperience.map((exp, index) => (
        <div key={index}>{exp.vesselName} ({exp.vesselType}) - {exp.netSeagoingDays} days</div>
      ));
    },
    size: 70,  // Adjusting the width of this column
  },
  {
    header: 'Action',
    id: 'action',
    cell: ({ row }) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={() => handleEdit(row.original)} size="small">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.original)} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => handleView(row.original)} size="small">
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => handleShare(row.original)} size="small">
          <ShareIcon fontSize="small" />
        </IconButton>
      </div>
    ),
    size: 50,
  },
];

const handleEdit = (data) => {
  console.log('Edit clicked:', data);
};

const handleDelete = (data) => {
  console.log('Delete clicked:', data);
};

const handleView = (data) => {
  console.log('View clicked:', data);
};

const handleShare = (data) => {
  console.log('Share clicked:', data);
};

const mappedData = candidateRaw.Candidates.map(mapRawCandidate);

const CandidatePage = () => {
  return (
    <div>
      <h2>Candidate Listing</h2>
      <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <CandidateTable data={mappedData} columns={columns} />
      </Box>
    </div>
  );
};

export default CandidatePage;
