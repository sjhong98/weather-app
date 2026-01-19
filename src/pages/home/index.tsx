import { SearchLocation } from "@/features/search-location";
import { Logo } from "@/shared/ui";
import { WeatherDisplayPanel } from "@/widgets/weather-display-panel";
import { BookmarkLocationPanel } from "@/widgets/bookmark-location-panel";

export default function Home() {

    return (
        <div className="flex flex-col min-h-screen gap-20 w-screen p-5">
            <div className="flex flex-col w-full items-center">
                <Logo />
            </div>
            <div className='flex flex-col w-full items-center'>
                <div className="flex md:flex-row flex-col w-full gap-10 justify-center">
                    <div
                        className='flex flex-col items-center md:w-[500px] w-full gap-5'
                    >
                        <BookmarkLocationPanel />
                        <SearchLocation />
                    </div>
                    <WeatherDisplayPanel />
                </div>
            </div>
        </div>
    )
}