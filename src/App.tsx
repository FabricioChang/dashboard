// src/App.tsx
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './App.css';

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
    <Container disableGutters maxWidth={false} sx={{ width: '100vw', p: 0, m: 0 }}>
      <Grid container spacing={4}>

        {/* 1. HEADER */}
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item>
              <HeaderUI />
            </Grid>
          </Grid>
        </Grid>

        {/* 2. ALERTA */}
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item>
              <AlertUI description="No se preveen lluvias" />
            </Grid>
          </Grid>
        </Grid>

        {/* 3. SELECTOR + TARJETAS */}
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="flex-start">
            {/* Selector */}
            <Grid item xs={12} md={3}>
              <SelectorUI onCityChange={(city: string) => setSelectedCity(city)} />
            </Grid>
            {/* Indicadores */}
            <Grid item xs={12} md={9}>
              {loading && (
                <Typography align="center">Cargando datos…</Typography>
              )}
              {error && (
                <Typography align="center" color="error">
                  Error: {error}
                </Typography>
              )}
              {data && (
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <IndicatorUI
                      title="Temperatura (2m)"
                      description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <IndicatorUI
                      title="Temperatura aparente"
                      description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <IndicatorUI
                      title="Velocidad del viento"
                      description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <IndicatorUI
                      title="Humedad relativa"
                      description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* 4. GRÁFICO + TABLA */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {data && <ChartUI data={data} />}
            </Grid>
            <Grid item xs={12} md={6}>
              {data && <TableUI data={data} />}
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Container>
  );
}
