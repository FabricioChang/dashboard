// src/components/SelectorUI.tsx
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorUIProps {
  /** Ciudad inicial opcional, para que el selector no “salte” de ancho */
  initialCity?: string;
  onCityChange: (city: string) => void;
}

export default function SelectorUI({
  initialCity = '',
  onCityChange,
}: SelectorUIProps) {
  const [cityInput, setCityInput] = useState<string>(initialCity);

  // Sincroniza si cambia la ciudad inicial desde el padre
  useEffect(() => {
    setCityInput(initialCity);
  }, [initialCity]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCity = event.target.value;
    setCityInput(selectedCity);
    onCityChange(selectedCity);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        onChange={handleChange}
        value={cityInput}
      >
        <MenuItem disabled value="">
          <em>Seleccione una ciudad</em>
        </MenuItem>
        <MenuItem value="guayaquil">Guayaquil</MenuItem>
        <MenuItem value="quito">Quito</MenuItem>
        <MenuItem value="manta">Manta</MenuItem>
        <MenuItem value="cuenca">Cuenca</MenuItem>
      </Select>

      {cityInput && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Información del clima en{' '}
          <strong style={{ textTransform: 'capitalize' }}>{cityInput}</strong>
        </Typography>
      )}
    </FormControl>
  );
}
