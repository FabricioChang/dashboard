import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
  data: OpenMeteoResponse;
}

export default function ChartUI({ data }: ChartUIProps) {
  // extraemos las horas y la temperatura horaria
  const arrLabels = data.hourly.time;
  const arrValues = data.hourly.temperature_2m;

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Temperatura horaria (2m)
      </Typography>
      <LineChart
        height={300}
        series={[{ data: arrValues, label: 'Temp 2m' }]}
        xAxis={[{ scaleType: 'point', data: arrLabels }]}
      />
    </>
  );
}
