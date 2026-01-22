import WbSunnyIcon from '@mui/icons-material/WbSunny'

export default function EmptyWeather() { 
    return (
        <div className='flex flex-col h-full gap-2 p-12 items-center justify-center'>
        <WbSunnyIcon sx={{ fontSize: 60, color: 'white' }} />
        <p>날씨 정보를 찾을 수 없습니다.</p>
    </div>
    )
}