// src/App.tsx
import { useState } from 'react';
import { Grid } from '@mui/material';
import './App.css';

import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import ChartUI from './components/ChartUI';
import TableUI from './components/TableUI';
import DataFetcher from './functions/DataFetcher';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('guayaquil');
  const { data, loading, error } = DataFetcher({ city: selectedCity });

  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      {/* Encabezado */}
      <Grid item xs={12}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <AlertUI description="No se preveen lluvias" />
        </Grid>
      </Grid>

      {/* Selector de ciudad */}
      <Grid item xs={12} md={3}>
        <SelectorUI onCityChange={setSelectedCity} />
      </Grid>

      {/* Indicadores */}
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          {loading && <p>Cargando datos...</p>}
          {error && <p>Error: {error}</p>}
          {data && (
            <>
              <Grid item xs={12} md={3}>
                <IndicatorUI
                  title="Temperatura (2m)"
                  description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <IndicatorUI
                  title="Temperatura aparente"
                  description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <IndicatorUI
                  title="Velocidad del viento"
                  description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <IndicatorUI
                  title="Humedad relativa"
                  description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      {/* Gráfico */}
      {data && (
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <ChartUI data={data} />
        </Grid>
      )}

      {/* Tabla */}
      {data && (
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <TableUI data={data} />
        </Grid>
      )}
    </Grid>
  );
}