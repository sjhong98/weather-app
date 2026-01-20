import dayjs from "dayjs"

import type { Weather } from "@/shared/types"

interface HourlyWeatherListProps {
    weather: Weather;
}

export default function HourlyWeatherList({ weather }: HourlyWeatherListProps) {
    return (
        <div className='flex flex-row gap-6 lg:gap-12 px-5 pb-5 lg:px-12 lg:pb-10 overflow-x-scroll'>
            {
                weather.hourly.slice(0, 24).map((hour: any) => (
                    <div key={hour.dt} className='flex flex-row flex-shrink-0'>
                        {dayjs.unix(hour.dt).format('HH:mm') === '00:00' && (
                            <div className='flex flex-col h-full items-center mr-8'>
                                <div className='w-[2px] h-full bg-[#BBB]' />
                                <p className='font-normal text-md'>내일</p>
                                <div className='w-[2px] h-full bg-[#BBB]' />
                            </div>
                        )}
                        <div className='flex flex-col items-center justify-center gap-1'>
                            <p className='font-normal text-md'>{dayjs.unix(hour.dt).format('A h:mm')}</p>
                            <img
                                src={`/weatherIcon/${hour.weather[0].icon.slice(0, 2)}.png`}
                                alt={hour.weather[0].description}
                                className='w-12 h-12'
                            />
                            <p className='font-bold text-lg'>{hour.temp.toFixed(1)}°C</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}