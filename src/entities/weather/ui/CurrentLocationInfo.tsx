import MyLocationIcon from '@mui/icons-material/MyLocation'

interface CurrentLocationInfoProps {
    isMyLocation: boolean;
    location: string;
}


export default function CurrentLocationInfo({ isMyLocation, location }: CurrentLocationInfoProps) {
    return (
        <div className='flex flex-row items-center gap-2 px-5 lg:px-12'>
            {isMyLocation && (
                <MyLocationIcon sx={{ fontSize: 20, color: 'white' }} />
            )}
            <p className='font-normal text-lg'>{location.replaceAll('-', ' ')}</p>
        </div>
    )
}