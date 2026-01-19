import dayjs from "dayjs";
import type { Weather } from "@/shared/types";

interface HourlyWeatherListProps {
    weather: Weather;
}

export default function HourlyWeatherList({ weather }: HourlyWeatherListProps) {
    return (
        <div className='flex flex-row md:gap-12 gap-6 overflow-x-scroll md:pb-10 pb-5 md:px-12 px-5'>
            {
                weather.hourly.slice(0, 24).map((hour: any) => (
                    <div key={hour.dt} className='flex flex-row flex-shrink-0'>
                        {dayjs.unix(hour.dt).format('HH:mm') === '00:00' && (
                            <div className='h-full flex flex-col items-center mr-8'>
                                <div className='w-[2px] h-full bg-[#BBB]' />
                                <p className='text-md font-normal'>내일</p>
                                <div className='w-[2px] h-full bg-[#BBB]' />
                            </div>
                        )}
                        <div className='flex flex-col items-center justify-center gap-1'>
                            <p className='text-md font-normal'>{dayjs.unix(hour.dt).format('A h:mm')}</p>
                            <img
                                src={`/weatherIcon/${hour.weather[0].icon.slice(0, 2)}.png`}
                                alt={hour.weather[0].description}
                                className='w-12 h-12'
                            />
                            <p className='text-lg font-bold'>{hour.temp.toFixed(1)}°C</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}