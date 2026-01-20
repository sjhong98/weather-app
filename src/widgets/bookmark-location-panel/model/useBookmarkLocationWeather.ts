import { useEffect, useState } from "react"

import { useBookmarkContext, getBookmarkList } from "@/entities/location-bookmark"
import { useWeather } from "@/entities/weather"

export default function useBookmarkLocationWeather() {
    const { useWeatherQueries } = useWeather()
    const { locationBookmarkListWithWeather, setLocationBookmarkListWithWeather } = useBookmarkContext()

    const [initialLoading, setInitialLoading] = useState(true)

    const [bookmarkList] = useState(() => {
        return getBookmarkList() || []
    })

    const weatherQuries = useWeatherQueries(bookmarkList.map((locationItem: any) => locationItem.location))

    useEffect(() => {
        setInitialLoading(true)

        let _locationBookmarkList = getBookmarkList()

        if (_locationBookmarkList) {
            // 데이터 패칭 이전 LocalStorage 기반 북마크 리스트 세팅
            setLocationBookmarkListWithWeather(_locationBookmarkList.map((locationItem: any) => {
                return {
                    location: locationItem.location,
                    weather: null,
                    title: locationItem.title,
                }
            }))

            // 데이터 패칭 이후 날씨 데이터 세팅
            setLocationBookmarkListWithWeather(_locationBookmarkList.map((locationItem: any, index: number) => {
                return {
                    location: locationItem.location,
                    weather: weatherQuries[index]?.data || null,
                    title: locationItem.title,
                }
            }))
        } else {
            setLocationBookmarkListWithWeather([])
        }
    }, [...weatherQuries.map(q => q.data)])

    return {
        bookmarkList,
        initialLoading,
        locationBookmarkListWithWeather,
    }
}