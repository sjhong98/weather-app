import { useQueries } from '@tanstack/react-query'
import { useEffect, useRef } from "react"

import { getCoordinatesByCity } from '@/entities/location'
import { getWeatherByCoordinates } from '@/entities/weather'

export default function useWeather(currentLocation?: string | null) {
  
  const useWeatherQueries = (args: string[] | { lat: number, lon: number }[]) => {
    return useQueries({
      queries: args.map((arg) => {
        return {
          queryKey: ['weather', typeof arg === 'string' ? arg : `${arg.lat},${arg.lon}`],
          queryFn: async () => {
            const coordinates = typeof arg === 'string' ? await getCoordinatesByCity(arg) : arg

            if (!coordinates?.lat || !coordinates?.lon) throw new Error('No coordinates found');
            return await getWeatherByCoordinates({ lat: coordinates.lat, lon: coordinates.lon });
          },
          enabled: Boolean(currentLocation) || Boolean(args.length > 0),
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

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError
  } = useWeatherQueries([currentLocation || ''])[0]

  // 이전 날씨 데이터 저장 -> placeholder 처리
  const lastWeatherRef = useRef<any>(null)
  useEffect(() => {
    if (weatherData) lastWeatherRef.current = weatherData 
  }, [weatherData]) 
  const weather = weatherData ?? lastWeatherRef.current

  // 날씨 데이터 에러 처리
  useEffect(() => {
    if (weatherError) {
      console.error('weather query error: ', weatherError)
    }
  }, [weatherError])

  return {
    useWeatherQueries,
    weather,
    weatherLoading,
  }
}