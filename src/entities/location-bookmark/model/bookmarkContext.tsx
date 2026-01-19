import { createContext, useContext, useState, type ReactNode } from 'react'

import type { Weather } from '@/shared/types'

interface LocationBookmark {
  district: string
  weather: Weather | null
  title?: string
}

interface BookmarkContextType {
  locationBookmarkList: LocationBookmark[]
  setLocationBookmarkList: (list: LocationBookmark[]) => void
  locationBookmarkListWithWeather: LocationBookmark[]
  setLocationBookmarkListWithWeather: (list: LocationBookmark[]) => void
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [locationBookmarkList, setLocationBookmarkList] = useState<LocationBookmark[]>([])
  const [locationBookmarkListWithWeather, setLocationBookmarkListWithWeather] = useState<LocationBookmark[]>([])

  return (
    <BookmarkContext.Provider value={{ locationBookmarkList, setLocationBookmarkList, locationBookmarkListWithWeather, setLocationBookmarkListWithWeather }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarkContext() {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error('useBookmarkContext must be used within a BookmarkProvider')
  }
  return context
}

