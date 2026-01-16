import { useParams } from 'react-router-dom'
import useWeather from '../../hooks/useWeather'
import { useEffect } from 'react'

function Forecast() {
  const { city } = useParams<{ city: string }>()
  const { getCoordinates, weather } = useWeather()

  useEffect(() => {
    if (city) {
      getCoordinates(city)
    }
  }, [city])

  return (
    <div className='flex flex-col gap-5 p-5'>
      <h1 className='text-2xl font-bold'>{city} 날씨 예보</h1>
      <div>
        <p>{weather || '날씨 정보를 불러오는 중...'}</p>
      </div>
    </div>
  )
}

export default Forecast

