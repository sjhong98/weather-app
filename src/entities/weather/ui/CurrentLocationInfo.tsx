import MyLocationIcon from '@mui/icons-material/MyLocation'

interface CurrentLocationInfoProps {
    isMyLocation: boolean;
    district: string;
}


export default function CurrentLocationInfo({ isMyLocation, district }: CurrentLocationInfoProps) {
    return (
        <div className='flex flex-row gap-2 md:px-12 px-5 items-center'>
            {isMyLocation && (
                <MyLocationIcon sx={{ fontSize: 20 }} />
            )}
            <p className='text-lg font-normal'>{district.replaceAll('-', ' ')}</p>
        </div>
    )
}