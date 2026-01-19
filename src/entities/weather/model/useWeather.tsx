import { useCallback } from "react"
import { useQueries } from '@tanstack/react-query'

import { getAddressByCoordinates, getCoordinatesByCity, getWeatherByCoordinates } from '@/entities/weather'

export default function useWeather() {
  const useWeatherQuries = (args: string[] | { lat: number, lon: number }[]) => {
    return useQueries({
      queries: args.map((arg) => {
        return {
          queryKey: ['weather', typeof arg === 'string' ? arg : `${arg.lat},${arg.lon}`],
          queryFn: async () => {
            const coordinates = typeof arg === 'string' ? await getCoordinates(arg) : arg

            if (!coordinates?.lat || !coordinates?.lon) throw new Error('No coordinates found');
            return await getWeatherByCoordinates({ lat: coordinates.lat, lon: coordinates.lon });
          },
          select: (data: any) => {
            const { current, hourly, daily } = data;
            return {
              current,
              hourly,
              maxTemp: daily?.[0]?.temp?.max,
              minTemp: daily?.[0]?.temp?.min,
            }
          }
        }
      })
    })
  }

  const getAddress = useCallback(async (lat: number, lon: number) => {
    return await getAddressByCoordinates(lat, lon);
  }, []);

  const getWeather = useCallback(async (coordinates: { lat: number; lon: number }) => {
    return await getWeatherByCoordinates(coordinates);
  }, []);

  const getCoordinates = useCallback(async (city: string) => {
    return await getCoordinatesByCity(city);
  }, [getWeather]);

  return {
    getCoordinates,
    getAddress,
    getWeather,
    useWeatherQuries,
  }
}