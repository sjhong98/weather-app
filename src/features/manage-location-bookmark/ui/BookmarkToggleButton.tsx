import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import type { Weather } from '@/shared/types'

interface BookmarkButtonProps {
    isBookmarked: boolean;
    toggleBookmark: (location: string, weather: Weather) => boolean | undefined;
    setIsBookmarked: (bookmarked: boolean) => void;
    location: string;
    weather: Weather;
}

export default function BookmarkToggleButton({ isBookmarked, toggleBookmark, setIsBookmarked, location, weather }: BookmarkButtonProps) {
    return (
        <div className='absolute top-5 right-5 lg:right-11 cursor-pointer' onClick={() => {
            const result = toggleBookmark(location, weather)
            if (!result) return

            setIsBookmarked(!isBookmarked)
        }}>
            { isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
        </div>
    )
}