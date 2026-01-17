import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationBookmark from "../../features/location-bookmark/ui";
import SearchLocationHome from "../../features/search-location/ui";
import ViewWeather from "../../features/view-weather/ui";
import useWeather from "../../../hooks/useWeather";
import koreaDistricts from "../../../constants/korea_districts";

export default function HomeDefaultPanel() {
    const { city } = useParams<{ city?: string }>()
    const { getAddress } = useWeather()

    const [currentLocation, setCurrentLocation] = useState<string | null>(null)
    const [isMyLocation, setIsMyLocation] = useState(false)

    useEffect(() => {
        if (city) {
            setCurrentLocation(city)
            setIsMyLocation(false)
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const address = await getAddress(position.coords.latitude, position.coords.longitude)

                // 지역 리스트에서 현재 주소가 포함된 지역 찾기
                const filteredDistricts = koreaDistricts.filter((district) => address.split(' ').join('-').includes(district))
                const district = filteredDistricts[filteredDistricts.length - 1]

                if (!district) setCurrentLocation(address)
                else setCurrentLocation(district)

                setIsMyLocation(true)
            });
            setCurrentLocation(null)
        }
    }, [city])

    return (
        <div className="flex md:flex-row flex-col w-full gap-10 justify-center">
            <div
                className='flex flex-col items-center md:w-[500px] w-full gap-5'
            >
                <LocationBookmark />
                <SearchLocationHome />
            </div>
            {(currentLocation) && <ViewWeather district={currentLocation} isMyLocation={isMyLocation} />}
        </div>
    )
}