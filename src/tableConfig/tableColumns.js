// src/tableConfig/tableColumns.js
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { blue, grey } from '@mui/material/colors';

// ✅ Status Column
export const StatusColumn = ({ getValue }) => {
  const value = getValue(); // 'true' or 'false'
  return value === 'true' ? (
    <CheckCircleIcon style={{ color: blue[500] }} />
  ) : (
    <CancelIcon style={{ color: grey[400] }} />
  );
};

// 🔹 Availability Column
export const AvailabilityColumn = ({ getValue }) => {
  const timestamp = getValue(); // e.g. 1741772197
  if (!timestamp) return '-';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
};
