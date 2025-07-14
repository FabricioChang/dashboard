import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

interface DataFetcherProps {
  city: string;
}

const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  guayaquil: { lat: -2.1962, lon: -79.8862 },
  quito: { lat: -0.2299, lon: -78.5249 },
  manta: { lat: -0.9677, lon: -80.7128 },
  cuenca: { lat: -2.9006, lon: -79.0045 },
};

export default function DataFetcher({ city }: DataFetcherProps): DataFetcherOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const coords = cityCoordinates[city];

    if (!coords) return;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=America%2FChicago`;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.statusText}`);

        const result: OpenMeteoResponse = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Error desconocido al obtener los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return { data, loading, error };
}