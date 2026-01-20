import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { koreaDistricts } from "@/shared/constants"
import { getAddressByCoordinates } from "@/entities/location"

export default function useCurrentLocation() {
    const { location } = useParams<{ location?: string }>()

    const [currentLocation, setCurrentLocation] = useState<string | null>(null)
    const [isMyLocation, setIsMyLocation] = useState(false)

    useEffect(() => {
        if (location) {
            setCurrentLocation(location)
            setIsMyLocation(false)
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const address = await getAddressByCoordinates(position.coords.latitude, position.coords.longitude)

                // 지역 리스트에서 현재 주소가 포함된 지역 찾기
                const filteredLocations = koreaDistricts.filter((location) => address.split(' ').join('-').includes(location))
                const location = filteredLocations[filteredLocations.length - 1]

                if (!location) setCurrentLocation(address)
                else setCurrentLocation(location)

                setIsMyLocation(true)
            });
            setCurrentLocation(null)
        }
    }, [location])

    return {
        currentLocation,
        isMyLocation,
    }
}