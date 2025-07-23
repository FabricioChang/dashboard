// src/App.tsx
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import ChartUI from './components/ChartUI';
import TableUI from './components/TableUI';
import DataFetcher from './functions/DataFetcher';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<string>('guayaquil');
  const { data, loading, error } = DataFetcher({ city: selectedCity });

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>

        {/* — Fila 1: HEADER — */}
        <Grid item xs={12}>
          <HeaderUI />
        </Grid>

        {/* — Fila 2: ALERTA + SELECTOR — */}
        <Grid item xs={12} md={6}>
          <AlertUI description="No se prevén lluvias" />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectorUI
            initialCity={selectedCity}
            onCityChange={(city) => setSelectedCity(city)}
          />
        </Grid>

        {/* — Fila 3: INDICADORES — */}
        <Grid item xs={12}>
          {loading || error ? (
            <Box textAlign="center" color={error ? 'error.main' : 'text.secondary'}>
              {loading ? 'Cargando datos…' : `Error: ${error}`}
            </Box>
          ) : (
            <Grid container spacing={2}>
              {data && [
                {
                  title: 'Temperatura (2m)',
                  value: data.current.temperature_2m,
                  unit: data.current_units.temperature_2m,
                },
                {
                  title: 'Temperatura aparente',
                  value: data.current.apparent_temperature,
                  unit: data.current_units.apparent_temperature,
                },
                {
                  title: 'Velocidad del viento',
                  value: data.current.wind_speed_10m,
                  unit: data.current_units.wind_speed_10m,
                },
                {
                  title: 'Humedad relativa',
                  value: data.current.relative_humidity_2m,
                  unit: data.current_units.relative_humidity_2m,
                },
              ].map((ind, i) => (
                <Grid key={i} item xs={6} sm={3}>
                  <IndicatorUI
                    title={ind.title}
                    description={`${ind.value} ${ind.unit}`}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* — Fila 4: GRÁFICO + TABLA — */}
        {data && (
          <>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  height: '100%',
                }}
              >
                <ChartUI data={data} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  height: '100%',
                }}
              >
                <TableUI data={data} />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
