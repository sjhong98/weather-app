import { BookmarkProvider } from '@/entities/location-bookmark'
import './App.css'
import QueryProvider from '@/app/providers/QueryProvider'
import Router from '@/app/router'

function App() {    
  return (
    <QueryProvider>
      <BookmarkProvider>
        <Router />
      </BookmarkProvider>
    </QueryProvider>
  )
}

export default App
