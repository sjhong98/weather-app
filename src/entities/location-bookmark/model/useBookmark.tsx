import { useCallback, useEffect, useState } from "react"

import { getBookmarkList } from "@/entities/location-bookmark"

export default function useBookmark(district?: string | null) {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [titleOrigin, setTitleOrigin] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [titleChanged, setTitleChanged] = useState(false)
    const [titleSaved, setTitleSaved] = useState(false)

    const checkIsBookmarked = useCallback((district: string) => {
        if (!district) {
            return false
        }

        const bookmarkList = getBookmarkList()
        return Boolean(bookmarkList.find((item: any) => item.district === district))
    }, [getBookmarkList])

    useEffect(() => {
        if (!district) {
            return
        }

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
    }, [district])

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