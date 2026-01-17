import { useEffect, useMemo, useState } from "react"
import { useBookmarkContext } from "../../../contexts/bookmarkContext"
import useBookmark from "../../../hooks/useBookmark"
import useWeather from "../../../hooks/useWeather"
import { useNavigate } from "react-router-dom"
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function LocationBookmark() {
    const navigate = useNavigate()
    const { getWeather } = useWeather()
    const { getBookmarkList } = useBookmark()
    const { locationBookmarkListWithWeather, setLocationBookmarkListWithWeather } = useBookmarkContext()

    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        // 초기 진입 시 저장된 LocalStorage 기반 날씨 데이터 패치
        (async () => {
            try {
                setInitialLoading(true)

                let _locationBookmarkList = getBookmarkList()

                if (_locationBookmarkList) {
                    setLocationBookmarkListWithWeather(_locationBookmarkList.map((districtItem: any) => {
                        return {
                            district: districtItem.district,
                            weather: null,
                            title: districtItem.title,
                        }
                    }))
                    _locationBookmarkList = await Promise.all(_locationBookmarkList.map(async (districtItem: any) => {
                        const weather = await getWeather(districtItem.district)
                        return {
                            district: districtItem.district,
                            weather: weather,
                            title: districtItem.title,
                        }
                    }))

                    setLocationBookmarkListWithWeather(_locationBookmarkList)
                } else {
                    setLocationBookmarkListWithWeather([])
                }
            } catch (error) {
                console.error(error)
            } finally {
                setInitialLoading(false)
            }
        })()
    }, [])

    const bookmarkCardList = useMemo(() => {
        return (
            locationBookmarkListWithWeather.map((location, index) => (
                <LocationBookmarkCard key={index} className='justify-between px-3 py-2 duration-100 max-w-[150px] max-h-[150px]' onClick={() => {
                    navigate(`/${location.district.replaceAll(' ', '-')}`)
                }}>

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
                </LocationBookmarkCard>
            ))
        )
    }, [locationBookmarkListWithWeather])


    return (
        <div className="flex flex-col gap-2 w-full mt-[-25px]">
            <p className='text-md font-light mb-[-5px]'>즐겨찾기</p>

            {/* Desktop -> Grid */}
            <div className='w-full md:grid hidden grid-cols-3 gap-4'>
                {bookmarkCardList}
            </div>

            {/* Mobile -> Scroll */}
            <div className='w-screen md:hidden overflow-x-scroll overflow-y-hidden ml-[-20px] pb-4 pl-5'>
                <div className='flex flex-row gap-4 h-[150px]'>
                    {bookmarkCardList}
                    <div className='w-2 flex-shrink-0' />
                </div>
            </div>
        </div >
    )
}

interface LocationBookmarkCardProps extends React.HTMLAttributes<HTMLDivElement> { }

function LocationBookmarkCard(props: LocationBookmarkCardProps) {
    const { children, className, ...rest } = props
    return (
        <div
            className={`flex flex-col rounded-lg bg-[#222222] p-2 aspect-square w-full hover:scale-[0.98] duration-150 cursor-pointer ${className}`}
            {...rest}
        >
            {children}
        </div>
    )
}