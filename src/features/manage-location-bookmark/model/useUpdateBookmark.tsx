import { useCallback } from "react"

import { useBookmark, useBookmarkContext, getBookmarkList, setBookmarkList } from "@/entities/location-bookmark"
import type { Weather } from "@/shared/types"


export default function useUpdateBookmark(location: string | null) {
    const { checkIsBookmarked, titleInput, setTitleInput, setTitleOrigin, setTitleChanged, setTitleSaved } = useBookmark(location)
    const { locationBookmarkListWithWeather, setLocationBookmarkListWithWeather } = useBookmarkContext()

    const addBookmark = useCallback((location: string, weather: Weather) => {
        const bookmarkList = getBookmarkList()

        if(bookmarkList.length >= 6) {
            window.alert('즐겨찾기는 최대 6개까지 등록할 수 있습니다.')
            return false
        }

        // Update LocalStorage
        bookmarkList.push({
            location,
            title: ''
        })

        setBookmarkList(bookmarkList)

        // Update Context
        setLocationBookmarkListWithWeather([...locationBookmarkListWithWeather, { location, weather }])
        return true
    }, [getBookmarkList, locationBookmarkListWithWeather])

    const removeBookmark = useCallback((location: string) => {
        let bookmarkList = getBookmarkList()

        // Update LocalStorage
        bookmarkList.splice(bookmarkList.findIndex((item: any) => item.location === location), 1)
        setBookmarkList(bookmarkList)

        // Update Context
        setLocationBookmarkListWithWeather(locationBookmarkListWithWeather.filter((item) => item.location !== location))

        return true
    }, [getBookmarkList, locationBookmarkListWithWeather])

    const toggleBookmark = useCallback((location: string, weather: Weather) => {
        let result = false

        if (checkIsBookmarked(location)) {
            result = removeBookmark(location)
        } else {
            if(!weather) return
            result = addBookmark(location, weather)
        }
        return result
    }, [checkIsBookmarked, addBookmark, removeBookmark])

    const updateBookmarkTitle = useCallback((location: string, title: string) => {
        let bookmarkList = getBookmarkList()

        // Update LocalStorage
        bookmarkList = bookmarkList.map((item: any) => {
            if(item.location === location) {
                return { ...item, title }
            }
            return item
        })
        setBookmarkList(bookmarkList)

        // Update Context
        setLocationBookmarkListWithWeather(locationBookmarkListWithWeather.map((item) => {
            if(item.location === location) {
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
        if(!location) {
            return
        }
        
        e?.preventDefault()
        setTitleChanged(false)

        updateBookmarkTitle(location, titleInput)
        setTitleOrigin(titleInput)

        setTitleSaved(true)
        setTimeout(() => {
            setTitleSaved(false)
        }, 2000)
    }, [titleInput, updateBookmarkTitle, location])


    return {
        addBookmark,
        removeBookmark,
        toggleBookmark,
        updateBookmarkTitle,
        handleChangeTitle,
        handleSaveTitle,
    }
}