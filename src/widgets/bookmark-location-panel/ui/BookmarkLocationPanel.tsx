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
                <LocationBookmarkCard key={index} location={location} initialLoading={initialLoading} className='justify-between px-3 py-2 duration-100 md:w-full w-[150px] h-[150px]' onClick={() => {
                    navigate(`/${location.district.replaceAll(' ', '-')}`)
                }} />
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