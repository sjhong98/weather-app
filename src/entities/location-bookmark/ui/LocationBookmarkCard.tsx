import WbSunnyIcon from '@mui/icons-material/WbSunny'

interface LocationBookmarkCardProps extends React.HTMLAttributes<HTMLDivElement> { 
    location: any
    initialLoading: boolean
}

export default function LocationBookmarkCard(props: LocationBookmarkCardProps) {
    const { children, className, location, initialLoading, ...rest } = props
    return (
        <div
            className={`flex flex-col w-full min-w-[150px] aspect-square p-2 rounded-lg cursor-pointer duration-150 hover:scale-[0.98] bg-[#222222] overflow-hidden ${className}`}
            {...rest}
        >
            <div className="flex flex-col gap-1">
                <p className='font-semibold text-[14px] leading-[15px] break-keep line-clamp-2 ellipsis'>{location?.location?.replaceAll('-', ' ')}</p>
                <p className='font-semibold text-[12px] h-[16px] mb-[-4px] opacity-50 line-clamp-1 ellipsis'>{location?.title}</p>
            </div>
            {Boolean(location.weather?.current.temp) ? (
                <>
                    <div className='flex flex-row items-center justify-end'>
                        <img
                            src={`/weatherIcon/${location.weather?.current.weather[0].icon.slice(0, 2)}.png`}
                            alt={location.weather?.current.weather[0].description}
                            className='w-16 h-16 mt-[-4px] mb-[-4px]'
                        />
                        <p className="font-bold text-2xl">{location.weather?.current.temp.toFixed(1)}°C</p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-col">
                            <p className="font-semibold text-[11px] opacity-50">Max</p>
                            <p className="font-semibold text-sm mt-[-4px]">{location.weather?.maxTemp.toFixed(1)}°C</p>

                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-[11px] opacity-50">Min</p>
                            <p className="font-semibold text-sm mt-[-4px]">{location.weather?.minTemp.toFixed(1)}°C</p>
                        </div>
                    </div>
                </>
            ) : initialLoading ? (
                <div className='flex flex-col w-full items-center justify-center text-center text-[12px] leading-[15px] break-keep opacity-50'>
                    <WbSunnyIcon sx={{ fontSize: 60 }} className='mt-[-80px] animate-pulse' />
                </div>
            ) : (
                <div className='flex flex-col w-full items-center justify-center text-center text-[12px] leading-[15px] break-keep opacity-50'>
                    <p>날씨 정보를 찾을 수 없습니다.</p>
                </div>
            )
            }
        </div>
    )
}