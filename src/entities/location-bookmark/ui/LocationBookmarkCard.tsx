import WbSunnyIcon from '@mui/icons-material/WbSunny'

interface LocationBookmarkCardProps extends React.HTMLAttributes<HTMLDivElement> { 
    location: any
    initialLoading: boolean
}

export default function LocationBookmarkCard(props: LocationBookmarkCardProps) {
    const { children, className, location, initialLoading, ...rest } = props
    return (
        <div
            className={`flex flex-col rounded-lg bg-[#222222] p-2 aspect-square w-full hover:scale-[0.98] duration-150 cursor-pointer ${className}`}
            {...rest}
        >
            <div className="flex flex-col gap-1">
                <p className='text-[14px] font-semibold break-keep leading-[15px]'>{location?.district?.replaceAll('-', ' ')}</p>
                <p className='text-[12px] font-semibold opacity-50 h-[16px] mb-[-4px] line-clamp-1 ellipsis'>{location?.title}</p>
            </div>
            {Boolean(location.weather?.current.temp) ? (
                <>
                    <div className='flex flex-row items-center justify-between'>
                        <img
                            src={`/weatherIcon/${location.weather?.current.weather[0].icon.slice(0, 2)}.png`}
                            alt={location.weather?.current.weather[0].description}
                            className='w-16 h-16 mt-[-4px] mb-[-4px]'
                        />
                        <p className="text-2xl font-bold">{location.weather?.current.temp.toFixed(1)}°C</p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-col">
                            <p className="text-[11px] font-semibold opacity-50">Max</p>
                            <p className="text-sm font-semibold mt-[-4px]">{location.weather?.maxTemp.toFixed(1)}°C</p>

                        </div>
                        <div className="flex flex-col">
                            <p className="text-[11px] font-semibold opacity-50">Min</p>
                            <p className="text-sm font-semibold mt-[-4px]">{location.weather?.minTemp.toFixed(1)}°C</p>
                        </div>
                    </div>
                </>
            ) : initialLoading ? (
                <div className='w-full flex flex-col items-center justify-center text-[12px] break-keep leading-[15px] text-center opacity-50'>
                    <WbSunnyIcon sx={{ fontSize: 60 }} className='animate-pulse mt-[-80px]' />
                </div>
            ) : (
                <div className='w-full flex flex-col items-center justify-center text-[12px] break-keep leading-[15px] text-center opacity-50'>
                    <p>날씨 정보를 찾을 수 없습니다.</p>
                </div>
            )
            }
        </div>
    )
}