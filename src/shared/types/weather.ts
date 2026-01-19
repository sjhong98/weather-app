export interface WeatherCurrent {
    temp: number
    weather: Array<{
      icon: string
      description: string
    }>
  }
  
  export interface WeatherHourly {
    dt: number
    temp: number
    weather: Array<{
      icon: string
      description: string
    }>
  }
  
  export interface Weather {
    current: WeatherCurrent
    hourly: WeatherHourly[]
    maxTemp: number
    minTemp: number
  }