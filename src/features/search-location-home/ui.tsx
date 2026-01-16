import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Input from "../../shared/Input";
import koreaDistricts from "../../../constants/korea_districts";

export default function SearchLocationHome() {
    const timerRef = useRef<any>(null)
    const [search, setSearch] = useState('')
    const [filteredDistrictList, setFilteredDistrictList] = useState<string[]>([])

    const searchLocation = useCallback(() => {
        const result = koreaDistricts.filter((district) => district.includes(search))
        setFilteredDistrictList(result)
    }, [search])

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            searchLocation()
        }, 500)
    }, [search])

    return (
        <div className="flex flex-col gap-2 w-full items-center">
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='md:w-[500px] w-full'
                placeholder='지역을 검색하세요'
            />
            {filteredDistrictList.length > 0 && (
                <div className="flex flex-col gap-2 w-full items-center">
                    {filteredDistrictList.map((district) => (
                        <div key={district}>{district}</div>
                    ))}
                </div>
            )}
        </div>
    )
}