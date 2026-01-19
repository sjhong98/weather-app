import { useCallback } from "react"

import { useBookmark, useBookmarkContext, getBookmarkList, setBookmarkList } from "@/entities/location-bookmark"
import type { Weather } from "@/shared/types"


export default function useUpdateBookmark(district: string | null) {
    const { checkIsBookmarked, titleInput, setTitleInput, setTitleOrigin, setTitleChanged, setTitleSaved } = useBookmark(district)
    const { locationBookmarkListWithWeather, setLocationBookmarkListWithWeather } = useBookmarkContext()

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

        setBookmarkList(bookmarkList)

        // Update Context
        setLocationBookmarkListWithWeather([...locationBookmarkListWithWeather, { district, weather }])
        return true
    }, [getBookmarkList, locationBookmarkListWithWeather])

    const removeBookmark = useCallback((district: string) => {
        let bookmarkList = getBookmarkList()

        // Update LocalStorage
        bookmarkList.splice(bookmarkList.findIndex((item: any) => item.district === district), 1)
        setBookmarkList(bookmarkList)

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
        setBookmarkList(bookmarkList)

        // Update Context
        setLocationBookmarkListWithWeather(locationBookmarkListWithWeather.map((item) => {
            if(item.district === district) {
                return { ...item, title }
            }
            return item
        }))
    }, [getBookmarkList, locationBookmarkListWithWeather])

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value)
        setTitleChanged(true)
    }, [])

    const handleSaveTitle = useCallback((e?: any) => {
        if(!district) {
            return
        }
        
        e?.preventDefault()
        setTitleChanged(false)

        updateBookmarkTitle(district, titleInput)
        setTitleOrigin(titleInput)

        setTitleSaved(true)
        setTimeout(() => {
            setTitleSaved(false)
        }, 2000)
    }, [titleInput, updateBookmarkTitle, district])


    return {
        addBookmark,
        removeBookmark,
        toggleBookmark,
        updateBookmarkTitle,
        handleChangeTitle,
        handleSaveTitle,
    }
}