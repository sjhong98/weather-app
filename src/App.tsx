import { Routes, Route } from 'react-router-dom'
import './App.css'
import Forecast from './pages/Forecast'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forecast/:city" element={<Forecast />} />
    </Routes>
  )
}

export default App
