import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import dayjs from "dayjs"
import 'dayjs/locale/ko'
import { useCallback, useEffect, useState } from "react"
import useBookmark from "../../../hooks/useBookmark"
import useWeather from "../../../hooks/useWeather"
import type Weather from "../../shared/types/weather"
import Input from '../../shared/Input'
import SaveIcon from '@mui/icons-material/Save';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CheckIcon from '@mui/icons-material/Check';

dayjs.locale('ko')

export default function ViewWeather({ district, isMyLocation }: { district: string, isMyLocation: boolean }) {
    const { getWeather, loading } = useWeather()
    const { toggleBookmark, checkIsBookmarked, getBookmarkList, updateBookmarkTitle } = useBookmark()

    const [weather, setWeather] = useState<Weather | null>(null)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [titleOrigin, setTitleOrigin] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [titleChanged, setTitleChanged] = useState(false)
    const [titleSaved, setTitleSaved] = useState(false)

    useEffect(() => {
        if (district) {
            const bookmarkList = getBookmarkList()
            const bookmark = bookmarkList.find((item: any) => item.district === district)
            if (bookmark) {
                setTitleInput(bookmark.title)
                setTitleOrigin(bookmark.title)
            } else {
                setTitleInput('')
                setTitleOrigin('')
            }
            setIsBookmarked(checkIsBookmarked(district))

            getWeather(district).then((weather) => {
                if (weather) {
                    setWeather(weather)
                }
            })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [district])

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value)
        setTitleChanged(true)
    }, [])

    const handleSaveTitle = useCallback((e?: any) => {
        e?.preventDefault()
        setTitleChanged(false)

        updateBookmarkTitle(district, titleInput)
        setTitleOrigin(titleInput)

        setTitleSaved(true)
        setTimeout(() => {
            setTitleSaved(false)
        }, 2000)
    }, [titleInput, updateBookmarkTitle, district])

    useEffect(() => {
        if (titleInput === titleOrigin) setTitleChanged(false)
        if (titleOrigin === '' && titleInput === '') setTitleChanged(false)
    }, [titleInput, titleOrigin])

    return (
        <div className='flex flex-col gap-2 rounded-lg pt-5 bg-[#222222] md:w-[50vw] w-full h-[408px] relative overflow-hidden relative'>
            {/* 지역 정보 */}
            <div className={`flex flex-col gap-2`}>
                <div className='flex flex-row gap-2 md:px-12 px-5 items-center'>
                    {isMyLocation && (
                        <MyLocationIcon sx={{ fontSize: 20 }} />
                    )}
                    <p className='text-lg font-normal'>{district.replaceAll('-', ' ')}</p>
                </div>

                {/* 별칭 */}
                <div className='flex flex-row items-center gap-2 px-12 overflow-hidden relative z-[3]'>
                    {isBookmarked && (
                        <form onSubmit={handleSaveTitle}>
                            <Input
                                value={titleInput}
                                onChange={handleChangeTitle}
                                className='!py-1 !px-4 !text-[16px] !bg-[#333333] !w-[300px] ml-[-12px] z-[3]'
                                placeholder='장소 별칭을 입력해 주세요.'
                            />
                        </form>
                    )}
                    <button
                        className='cursor-pointer ml-[-50px] p-1 mt-[-4px] rounded-full hover:bg-[#444444] duration-100 z-[3]'
                        style={{
                            scale: titleChanged ? 1 : 0,
                        }}
                        onClick={handleSaveTitle}>
                        <SaveIcon />
                    </button>
                </div>
                <div
                    className='flex gap-1 items-center duration-200 pl-12 z-[1]'
                    style={{
                        opacity: titleSaved ? 1 : 0,
                        transform: titleSaved ? 'translateY(-8px)' : 'translateY(-40px)',
                    }}
                >
                    <CheckIcon sx={{ fontSize: 14 }} className='!text-[#6AE554]' />
                    <p
                        className='text-[14px] !text-[#6AE554]'
                    >저장되었습니다.</p>
                </div>
            </div>

            {weather ? (
                <div className={`flex flex-col gap-10 md:mt-[-40px] mt-[-20px] ${loading ? 'opacity-20' : 'opacity-100'} duration-200 relative`}>
                    <div className='flex flex-row justify-between md:pl-6 md:pr-12 pl-5 pr-5'>

                        {/* 오늘 날씨 정보 */}
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

                        {/* 오늘 최고/최저 온도 정보 */}
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
                    </div>

                    {/* 오늘 시간대별 온도 정보 */}
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
                </div>
            ) : !loading && (
                <div className='flex flex-col gap-2 p-12 justify-center items-center h-full'>
                    <WbSunnyIcon sx={{ fontSize: 60 }} />
                    <p>날씨 정보를 찾을 수 없습니다.</p>
                </div>
            )}

            {loading && (
                <div className='flex flex-col gap-2 p-12 justify-center items-center absolute top-0 left-0 w-full h-[408px]'>
                    <WbSunnyIcon sx={{ fontSize: 60 }} className='animate-pulse' />
                </div>
            )}


            {/* 북마크 */}
            {weather && (
                <div className='absolute top-5 md:right-11 right-5 cursor-pointer' onClick={() => {
                    const result = toggleBookmark(district, weather)
                    if (!result) return

                    setIsBookmarked(prev => !prev)
                }}>
                    {isBookmarked ? (
                        <BookmarkIcon />
                    ) : (
                        <BookmarkBorderIcon />
                    )
                    }
                </div>
            )}
        </div>
    )
}