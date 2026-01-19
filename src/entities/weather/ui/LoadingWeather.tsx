import WbSunnyIcon from '@mui/icons-material/WbSunny'

export default function LoadingWeather() {
    return (
        <div className='flex flex-col gap-2 p-12 justify-center items-center absolute top-0 left-0 w-full h-[408px]'>
            <WbSunnyIcon sx={{ fontSize: 60 }} className='animate-pulse' />
        </div>
    )
}