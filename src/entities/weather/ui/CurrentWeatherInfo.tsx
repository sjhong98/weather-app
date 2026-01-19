import type { Weather } from "@/shared/types";

interface CurrentWeatherInfoProps {
    weather: Weather;
}

export default function CurrentWetherInfo({ weather }: CurrentWeatherInfoProps) {
    return (
        <div className='flex md:flex-row flex-col items-center md:mt-0 mt-[-30px]'>
            <img
                src={`/weatherIcon/${weather.current.weather[0].icon.slice(0, 2)}.png`}
                alt={weather.current.weather[0].description}
                className='w-32 h-32'
            />
            <div className='md:mt-0 mt-[-20px] md:mr-0 mr-[-30px]'>
                <p className='text-xl'>{weather.current.weather[0].description}</p>
                <p className='text-5xl font-bold'>{weather.current.temp.toFixed(1)}°C</p>
            </div>
        </div>
    )
}