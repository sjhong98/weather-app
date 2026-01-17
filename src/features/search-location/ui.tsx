import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import koreaDistricts from "../../../constants/korea_districts";
import Input from "../../shared/Input";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SearchLocationHome() {
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

        if(isMobile) {
            setSearch('')
            setFilteredDistrictList([])
        }
    }, [navigate])

    return (
        <div className="flex flex-col gap-2 w-full items-center relative">
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full z-[4]'
                placeholder='지역을 검색하세요'
            />
            <div className='w-full rounded-lg overflow-hidden md:relative absolute top-12 left-0 md:z-[1] z-[5] md:bg-transparent bg-[#333333]'>
                {filteredDistrictList.length > 0 ? (
                    <div className="flex flex-col gap-2 mt-[-10px] w-full items-center md:max-h-[calc(100vh-220px)] max-h-[calc(100vh-400px)] pt-10 md:pb-[300px] pb-[100px] overflow-y-scroll">
                        {filteredDistrictList.map((district) => (
                            <div
                                key={district}
                                onClick={() => handleSelectLocation(district)}
                                className="flex flex-col w-full px-10 rounded-full hover:bg-[#222222] duration-75 cursor-pointer py-1 mb-[-8px]"
                            >
                                <p className="text-md">{district.replaceAll('-', ' ')}</p>
                            </div>
                        ))}
                    </div>
                ) : filteredDistrictList.length === 0 && search.length > 0 && (
                    <div className='w-full h-[200px] flex items-center justify-center'>
                        <p className='text-md'>검색 결과가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    )
}