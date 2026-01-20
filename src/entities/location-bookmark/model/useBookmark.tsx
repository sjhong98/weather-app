import { useCallback, useEffect } from "react"

import { getBookmarkList, useBookmarkContext } from "@/entities/location-bookmark"

export default function useBookmark(location?: string | null) {
    const { titleInput, setTitleInput, titleOrigin, setTitleOrigin, titleChanged, setTitleChanged, titleSaved, setTitleSaved, isBookmarked, setIsBookmarked } = useBookmarkContext()

    const checkIsBookmarked = useCallback((location?: string) => {
        if (!location) {
            return false
        }

        const bookmarkList = getBookmarkList()
        return Boolean(bookmarkList.find((item: any) => item.location === location))
    }, [getBookmarkList])

    useEffect(() => {
        if (!location) {
            return
        }

        const bookmarkList = getBookmarkList()
        const bookmark = bookmarkList.find((item: any) => item.location === location)
        if (bookmark) {
            setTitleInput(bookmark.title)
            setTitleOrigin(bookmark.title)
        } else {
            setTitleInput('')
            setTitleOrigin('')
        }
        setIsBookmarked(checkIsBookmarked(location))
    }, [location])

    useEffect(() => {
        if (titleInput === titleOrigin) setTitleChanged(false)
        if (titleOrigin === '' && titleInput === '') setTitleChanged(false)
    }, [titleInput, titleOrigin])

    return {
        checkIsBookmarked,
        titleInput,
        setTitleInput,
        titleOrigin,
        setTitleOrigin,
        titleChanged,
        setTitleChanged,
        titleSaved,
        setTitleSaved,
        isBookmarked,
        setIsBookmarked,
    }
}