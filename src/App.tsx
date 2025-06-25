import React from 'react';
import { Grid, Paper } from '@mui/material';

function App() {
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
      </Grid>

      {/* Alertas */}
      <Grid item xs={12} md={12}>
        <Paper style={{ padding: 16, textAlign: 'center' }}>Alertas</Paper>
      </Grid>

      {/* Selector y Indicadores */}
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: 16, textAlign: 'center' }}>Selector</Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper style={{ padding: 16, textAlign: 'center' }}>Indicadores</Paper>
      </Grid>

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
