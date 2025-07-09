import React from 'react';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import IndicatorUI from './components/IndicatorUI';
import SelectorUI from './components/SelectorUI';
import DataFetcher from './functions/DataFetcher';
import { Grid, Paper } from '@mui/material';


function App() {
  const dataFetcherOutput = DataFetcher();
  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      {/* Encabezado */}
      <Grid item xs={12} md={12}>
        <Paper style={{ padding: 16, textAlign: 'center' }}>Encabezado</Paper>
        <HeaderUI/>
      </Grid>

      {/* Alertas */}
      <Grid item xs={12} md={12} container justifyContent="right" alignItems="center">
        <Paper style={{ padding: 16, textAlign: 'center' }}>Alertas</Paper>
        <AlertUI description="No se preveen lluvias"/>
      </Grid>

      {/* Selector y Indicadores */}
        {/* Renderizado condicional de los datos obtenidos */}
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
        <>

            {/* Indicadores con datos obtenidos */}

            <Grid size={{ xs: 12, md: 3 }} >
                <IndicatorUI
                    title='Temperatura (2m)'
                    description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                    title='Temperatura aparente'
                    description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                    title='Velocidad del viento'
                    description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                    title='Humedad relativa'
                    description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
            </Grid>

        </>
        )}

      {/* Gráfico */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Paper style={{ padding: 16, textAlign: 'center' }}>Gráfico</Paper>
      </Grid>

      {/* Tabla */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Paper style={{ padding: 16, textAlign: 'center' }}>Tabla</Paper>
      </Grid>

      {/* Información adicional */}
      <Grid item xs={12} md={12}>
        <Paper style={{ padding: 16, textAlign: 'center' }}>Información adicional</Paper>
      </Grid>
    </Grid>
  );
}

export default App;
