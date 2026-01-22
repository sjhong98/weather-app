import WbSunnyIcon from '@mui/icons-material/WbSunny'

export default function LoadingWeather() {
    return (
        <div className='flex flex-col w-full h-[408px] gap-2 p-12 absolute top-0 left-0 items-center justify-center'>
            <WbSunnyIcon sx={{ fontSize: 60, color: 'white' }} className='animate-pulse' />
        </div>
    )
}