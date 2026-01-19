import MyLocationIcon from '@mui/icons-material/MyLocation'

interface CurrentLocationInfoProps {
    isMyLocation: boolean;
    district: string;
}


export default function CurrentLocationInfo({ isMyLocation, district }: CurrentLocationInfoProps) {
    return (
        <div className='flex flex-row items-center gap-2 px-5 md:px-12'>
            {isMyLocation && (
                <MyLocationIcon sx={{ fontSize: 20 }} />
            )}
            <p className='font-normal text-lg'>{district.replaceAll('-', ' ')}</p>
        </div>
    )
}