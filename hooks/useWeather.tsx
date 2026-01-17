import axios from "axios";
import { useCallback, useState } from "react";

export default function useWeather() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const getWeatherByCoordinates = useCallback(async (coordinates: any) => {
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        lang: 'kr',
        units: 'metric'
      }
    });
    return response.data;
  }, [])

  const getCoordinates = useCallback(async (city: string) => {
    const response = await axios.post(
      `https://hydhqrohhpgwybhlhwun.supabase.co/functions/v1/geocoding`,
      { city: city.replaceAll('-', ' ') },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    return {
      lat: response?.data?.response?.result?.point?.y,
      lon: response?.data?.response?.result?.point?.x,
    }
  }, [getWeatherByCoordinates])

  const getAddress = useCallback(async (lat: number, lon: number) => {
    const response = await axios.post(
      `https://hydhqrohhpgwybhlhwun.supabase.co/functions/v1/geocoding`,
      { type: 'address', x: lon.toString(), y: lat.toString() },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response?.data?.response?.result?.[0]?.text
  }, [])

  const getWeather = useCallback(async (arg: string | { lat: number, lon: number }) => {
    try {
      setLoading(true);
      const coordinates = typeof arg === 'string' ? await getCoordinates(arg) : arg
      console.log('arg', arg, typeof arg, coordinates)

      if (!coordinates?.lat || !coordinates?.lon) throw new Error('No coordinates found');

      const weatherResponse = await getWeatherByCoordinates({ lat: coordinates.lat, lon: coordinates.lon });
      const { current, hourly, daily } = weatherResponse;
      return { 
        current,
        hourly, 
        maxTemp: daily?.[0]?.temp?.max,
        minTemp: daily?.[0]?.temp?.min,
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [getCoordinates, getWeatherByCoordinates])

  return {
    loading,
    error,
    getCoordinates,
    getWeatherByCoordinates,
    getWeather,
    getAddress
  }
}