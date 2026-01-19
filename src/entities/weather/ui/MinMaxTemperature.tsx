import type { Weather } from "@/shared/types";

interface MinMaxTemperatureProps {
    weather: Weather;
}

export default function MinMaxTemperature({ weather }: MinMaxTemperatureProps) {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col items-end'>
                <p className='text-sm font-normal'>최고기온</p>
                <p className='text-2xl font-bold'>{weather.maxTemp.toFixed(1)}°C</p>
            </div>
            <div className='flex flex-col items-end'>
                <p className='text-sm font-normal'>최저기온</p>
                <p className='text-2xl font-bold'>{weather.minTemp.toFixed(1)}°C</p>
            </div>
        </div>
    )
}