import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';

const CandidateTable = ({ data, columns }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPageIndex,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          tableLayout: 'fixed',
        }}
      >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    cursor: 'pointer',
                    width: header.column.columnDef.meta?.width || 'auto',
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.columnDef.meta?.width || 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() =>
            setPageIndex(prev => Math.min(prev + 1, table.getPageCount() - 1))
          }
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>

        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          style={{ marginLeft: '10px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default CandidateTable;
