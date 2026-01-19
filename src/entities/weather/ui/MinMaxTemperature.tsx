import type { Weather } from "@/shared/types"

interface MinMaxTemperatureProps {
    weather: Weather;
}

export default function MinMaxTemperature({ weather }: MinMaxTemperatureProps) {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col items-end'>
                <p className='font-normal text-sm'>최고기온</p>
                <p className='font-bold text-2xl'>{weather.maxTemp.toFixed(1)}°C</p>
            </div>
            <div className='flex flex-col items-end'>
                <p className='font-normal text-sm'>최저기온</p>
                <p className='font-bold text-2xl'>{weather.minTemp.toFixed(1)}°C</p>
            </div>
        </div>
    )
}