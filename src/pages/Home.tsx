import SearchPanel from "../widgets/search-panel/ui";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-20 min-w-screen p-5">
        <div className="flex flex-col text-4xl font-bold leading-[30px] w-full items-center">
            <p>Korean</p>
            <p>Weather</p>
            <p>Forecast</p>
        </div>
        <SearchPanel />
    </div>
  )
}