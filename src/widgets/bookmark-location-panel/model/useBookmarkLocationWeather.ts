import { useEffect, useState } from "react"

import { useBookmarkContext, getBookmarkList } from "@/entities/location-bookmark"
import { useWeather } from "@/entities/weather"

export default function useBookmarkLocationWeather() {
    const { useWeatherQuries } = useWeather()
    const { locationBookmarkListWithWeather, setLocationBookmarkListWithWeather } = useBookmarkContext()

    const [initialLoading, setInitialLoading] = useState(true)

    const [bookmarkList] = useState(() => {
        return getBookmarkList() || []
    })

    const weatherQuries = useWeatherQuries(bookmarkList.map((districtItem: any) => districtItem.district))

    useEffect(() => {
        setInitialLoading(true)

        let _locationBookmarkList = getBookmarkList()

        if (_locationBookmarkList) {
            // 데이터 패칭 이전 LocalStorage 기반 북마크 리스트 세팅
            setLocationBookmarkListWithWeather(_locationBookmarkList.map((districtItem: any) => {
                return {
                    district: districtItem.district,
                    weather: null,
                    title: districtItem.title,
                }
            }))

            // 데이터 패칭 이후 날씨 데이터 세팅
            setLocationBookmarkListWithWeather(_locationBookmarkList.map((districtItem: any, index: number) => {
                return {
                    district: districtItem.district,
                    weather: weatherQuries[index]?.data || null,
                    title: districtItem.title,
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