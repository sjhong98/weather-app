import axios from "axios";
import { useEffect, useState } from "react";

export default function useWeather() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getWeather = async (coordinates: any) => {
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
    console.log(response.data);
    setWeather(response.data);
    return response.data;
  };

  const getCoordinates = async (city: string) => {
    console.log('import.meta.env.VITE_OPENWEATHER_API_KEY', import.meta.env.VITE_OPENWEATHER_API_KEY)
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=서울&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
    console.log(response.data);
    setWeather(response.data);

    if (response.data[0].lat && response.data[0].lon) {
      getWeather({ lat: response.data[0].lat, lon: response.data[0].lon });

      return response.data;
    }
  };

  return {
    weather,
    loading,
    error,
    getCoordinates,
    getWeather
  }
}