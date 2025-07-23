// src/components/ChartUI.tsx
import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ChartUIProps {
  data: OpenMeteoResponse;
}

export default function ChartUI({ data }: ChartUIProps) {
  // 1) Convertimos las etiquetas ISO a Date
  const dateLabels: Date[] = data.hourly.time.map((iso) => new Date(iso));
  // 2) Extraemos valores
  const tempValues = data.hourly.temperature_2m;
  // 3) Unidad
  const unit = data.hourly_units.temperature_2m;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Temperatura horaria (2m)
      </Typography>

      <LineChart
        // espacio extra para las etiquetas rotadas
        margin={{ bottom: 80 }}
        height={600}
        width={800}
        series={[
          {
            data: tempValues,
            label: `Temp (${unit})`,
          },
        ]}
        xAxis={[
          {
            scaleType: 'time',
            data: dateLabels,
            // altura del eje X para no recortar etiquetas
            height: 60,
            tickLabelStyle: {
              angle: -45,
              textAnchor: 'end',
              fontSize: 11,
            },
            // formateamos cada tick con date-fns:
            valueFormatter: (value, context) => {
              if (context.location === 'tick') {
                // value es un timestamp en ms
                return format(value as number, 'dd MMM HH:mm', { locale: es });
              }
              // para tooltips u otros contextos:
              return String(value);
            },
          },
        ]}
      />
    </>
  );
}
