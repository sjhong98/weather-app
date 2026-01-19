import type { Weather } from "@/shared/types"

interface CurrentWeatherInfoProps {
    weather: Weather;
}

export default function CurrentWetherInfo({ weather }: CurrentWeatherInfoProps) {
    return (
        <div className='flex flex-col md:flex-row items-center mt-[-30px] md:mt-0'>
            <img
                src={`/weatherIcon/${weather.current.weather[0].icon.slice(0, 2)}.png`}
                alt={weather.current.weather[0].description}
                className='w-32 h-32'
            />
            <div className='mt-[-20px] mr-[-30px] md:mt-0 md:mr-0'>
                <p className='text-xl'>{weather.current.weather[0].description}</p>
                <p className='font-bold text-5xl'>{weather.current.temp.toFixed(1)}°C</p>
            </div>
        </div>
    )
}