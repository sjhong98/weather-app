import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useWeather } from "@/entities/weather"
import { koreaDistricts } from "@/shared/constants"

export default function useCurrentDistrict() {
    const { location } = useParams<{ location?: string }>()
    const { getAddress } = useWeather()

    const [currentDistrict, setCurrentDistrict] = useState<string | null>(null)
    const [isMyDistrict, setIsMyDistrict] = useState(false)

    useEffect(() => {
        if (location) {
            setCurrentDistrict(location)
            setIsMyDistrict(false)
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const address = await getAddress(position.coords.latitude, position.coords.longitude)

                // 지역 리스트에서 현재 주소가 포함된 지역 찾기
                const filteredDistricts = koreaDistricts.filter((district) => address.split(' ').join('-').includes(district))
                const district = filteredDistricts[filteredDistricts.length - 1]

                if (!district) setCurrentDistrict(address)
                else setCurrentDistrict(district)

                setIsMyDistrict(true)
            });
            setCurrentDistrict(null)
        }
    }, [location])

    return {
        currentDistrict,
        isMyDistrict,
    }
}