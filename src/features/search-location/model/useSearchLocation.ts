import useMediaQuery from "@mui/material/useMediaQuery"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useRef } from "react"
import { useState } from "react"
import { koreaDistricts } from "@/shared/constants"

export default function useSearchLocation() {
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width: 768px)')
    const timerRef = useRef<any>(null)
    
    const [search, setSearch] = useState('')
    const [filteredDistrictList, setFilteredDistrictList] = useState<string[]>([])

    const searchLocation = useCallback(() => {
        if (search.length === 0) {
            setFilteredDistrictList([])
            return
        }

        let result = koreaDistricts.filter((district) => district.includes(search))
        setFilteredDistrictList(result)
    }, [search])

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            searchLocation()
        }, 200)
    }, [search])

    const handleSelectLocation = useCallback((district: string) => {
        navigate(`/${district}`)

        if (isMobile) {
            setSearch('')
            setFilteredDistrictList([])
        }
    }, [navigate])

    return {
        filteredDistrictList,
        handleSelectLocation,
        search,
        setSearch
    }
}