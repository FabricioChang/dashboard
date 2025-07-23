import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
  data: OpenMeteoResponse;
}

export default function TableUI({ data }: TableUIProps) {
  const { time: arrLabels, temperature_2m: arrValues } = data.hourly;

  const rows = arrLabels.map((hora, idx) => ({
    id: idx,
    hora,
    temperatura: arrValues[idx],
  }));

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'hora', headerName: data.hourly_units.time, width: 180 },
    { field: 'temperatura', headerName: `Temp (${data.hourly_units.temperature_2m})`, width: 130 },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
