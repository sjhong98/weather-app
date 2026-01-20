import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"

import { koreaDistricts } from "@/shared/constants"

const DEBOUNCE_TIME = 200

export default function useSearchLocation() {
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width: 768px)')
    const timerRef = useRef<any>(null)
    
    const [search, setSearch] = useState('')
    const [filteredLocationList, setFilteredLocationList] = useState<string[]>([])

    const searchLocation = useCallback(() => {
        if (search.length === 0) {
            setFilteredLocationList([])
            return
        }

        let result = koreaDistricts.filter((location) => location.includes(search))
        setFilteredLocationList(result)
    }, [search])

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            searchLocation()
        }, DEBOUNCE_TIME)
    }, [search])

    const handleSelectLocation = useCallback((location: string) => {
        navigate(`/${location}`)

        if (isMobile) {
            setSearch('')
            setFilteredLocationList([])
        }
    }, [navigate])

    return {
        filteredLocationList,
        handleSelectLocation,
        search,
        setSearch
    }
}