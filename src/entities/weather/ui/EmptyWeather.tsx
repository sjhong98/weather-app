import WbSunnyIcon from '@mui/icons-material/WbSunny'

export default function EmptyWeather() { 
    return (
        <div className='flex flex-col gap-2 p-12 justify-center items-center h-full'>
        <WbSunnyIcon sx={{ fontSize: 60 }} />
        <p>날씨 정보를 찾을 수 없습니다.</p>
    </div>
    )
}