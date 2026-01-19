import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { LocationBookmarkCard } from "@/entities/location-bookmark"
import { useBookmarkLocationWeather } from "@/widgets/bookmark-location-panel"

export default function BookmarkLocationPanel() {
    const navigate = useNavigate()

    const { locationBookmarkListWithWeather, initialLoading } = useBookmarkLocationWeather()
    
    const bookmarkCardList = useMemo(() => {
        return (
            locationBookmarkListWithWeather.map((location, index) => (
                <LocationBookmarkCard key={index} location={location} initialLoading={initialLoading} className='flex w-[150px] md:w-full h-[150px] px-3 py-2 justify-between duration-100' onClick={() => {
                    navigate(`/${location.district.replaceAll(' ', '-')}`)
                }} />
            ))
        )
    }, [locationBookmarkListWithWeather])

    return (
        <div className="flex flex-col w-full gap-2 mt-[-25px]">
            <p className='font-light text-md mb-[-5px]'>즐겨찾기</p>

            {/* Desktop -> Grid */}
            <div className='hidden w-full md:grid grid-cols-3 gap-4'>
                {bookmarkCardList}
            </div>

            {/* Mobile -> Scroll */}
            <div className='flex w-screen ml-[-20px] pl-5 pb-4 md:hidden overflow-x-scroll overflow-y-hidden'>
                <div className='flex flex-row h-[150px] gap-4'>
                    {bookmarkCardList}
                    <div className='w-2 flex-shrink-0' />
                </div>
            </div>
        </div >
    )
}