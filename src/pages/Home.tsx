import Logo from "../shared/Logo";
import HomeDefaultPanel from "../widgets/home-default-panel/ui";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen gap-20 w-screen p-5">
            <div className="flex flex-col w-full items-center">
                <Logo />
            </div>
            <div className='flex flex-col w-full items-center'>
                <HomeDefaultPanel />
            </div>
        </div>
    )
}