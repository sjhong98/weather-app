import WbSunnyIcon from '@mui/icons-material/WbSunny'
import CloudIcon from '@mui/icons-material/Cloud'
import AcUnitIcon from '@mui/icons-material/AcUnit'

export default function Logo() {
    return (
        <div className="flex flex-row h-[30px] md:h-[60px] gap-2 scale-[0.5] md:scale-[1]">
            <WbSunnyIcon sx={{ fontSize: 60 }} />
            <CloudIcon sx={{ fontSize: 60 }} />
            <AcUnitIcon sx={{ fontSize: 60 }} />
        </div>
    )
}