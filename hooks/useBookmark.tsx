import { useCallback } from "react"
import { useBookmarkContext } from "../contexts/bookmarkContext"
import type Weather from "../src/shared/types/weather"

export default function useBookmark() {
    const { setLocationBookmarkList, setLocationBookmarkListWithWeather, locationBookmarkListWithWeather } = useBookmarkContext()

    const getBookmarkList = useCallback(() => {
        const bookmarkList = localStorage.getItem('locationBookmarkList')
        const parsedBookmarkList = bookmarkList ? JSON.parse(bookmarkList) : []
        return parsedBookmarkList
    }, [])

    const checkIsBookmarked = useCallback((district: string) => {
        const bookmarkList = getBookmarkList()
        return Boolean(bookmarkList.find((item: any) => item.district === district))
    }, [getBookmarkList])

    const addBookmark = useCallback((district: string, weather: Weather) => {
        const bookmarkList = getBookmarkList()

        if(bookmarkList.length >= 6) {
            window.alert('즐겨찾기는 최대 6개까지 등록할 수 있습니다.')
            return false
        }

        // Update LocalStorage
        bookmarkList.push({
            district,
            title: ''
        })
        setLocationBookmarkList(bookmarkList)
        localStorage.setItem('locationBookmarkList', JSON.stringify(bookmarkList))

        // Update Context
        setLocationBookmarkListWithWeather([...locationBookmarkListWithWeather, { district, weather }])
        return true
    }, [getBookmarkList, locationBookmarkListWithWeather])

    const removeBookmark = useCallback((district: string) => {
        let bookmarkList = getBookmarkList()

        // Update LocalStorage
        bookmarkList.splice(bookmarkList.findIndex((item: any) => item.district === district), 1)
        localStorage.setItem('locationBookmarkList', JSON.stringify(bookmarkList))

        // Update Context
        setLocationBookmarkListWithWeather(locationBookmarkListWithWeather.filter((item) => item.district !== district))

        return true
    }, [getBookmarkList, locationBookmarkListWithWeather])

    const toggleBookmark = useCallback((district: string, weather: Weather) => {
        let result = false

        if (checkIsBookmarked(district)) {
            result = removeBookmark(district)
        } else {
            if(!weather) return
            result = addBookmark(district, weather)
        }
        return result
    }, [checkIsBookmarked, addBookmark, removeBookmark])

    const updateBookmarkTitle = useCallback((district: string, title: string) => {
        let bookmarkList = getBookmarkList()

        // Update LocalStorage
        bookmarkList = bookmarkList.map((item: any) => {
            if(item.district === district) {
                return { ...item, title }
            }
            return item
        })
        localStorage.setItem('locationBookmarkList', JSON.stringify(bookmarkList))

        // Update Context
        setLocationBookmarkListWithWeather(locationBookmarkListWithWeather.map((item) => {
            if(item.district === district) {
                return { ...item, title }
            }
            return item
        }))
    }, [getBookmarkList, locationBookmarkListWithWeather])

    return {
        getBookmarkList,
        checkIsBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        updateBookmarkTitle,
    }
}