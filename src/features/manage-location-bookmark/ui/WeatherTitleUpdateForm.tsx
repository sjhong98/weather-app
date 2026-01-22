import SaveIcon from '@mui/icons-material/Save'
import CheckIcon from '@mui/icons-material/Check'

import { Input } from "@/shared/ui"

interface WeatherTitleUpdateFormProps {
    isBookmarked: boolean;
    handleSaveTitle: () => void;
    handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    titleInput: string;
    titleChanged: boolean;
    titleSaved: boolean;
}

export default function WeatherTitleUpdateForm({ isBookmarked, handleSaveTitle, handleChangeTitle, titleInput, titleChanged, titleSaved }: WeatherTitleUpdateFormProps) {
    return (
        <>
            <div className='flex flex-row w-full items-center gap-2 lg:px-12 px-4 relative z-[3] overflow-hidden'>
                {isBookmarked && (
                    <form onSubmit={handleSaveTitle} className='flex w-full'>
                        <Input
                            value={titleInput}
                            onChange={handleChangeTitle}
                            className='!flex lg:!w-[300px] !w-full !px-4 !py-1 lg:ml-[-12px] !text-[16px] z-[3] !bg-[#333333]'
                            placeholder='장소 별칭을 입력해 주세요.'
                        />
                    </form>
                )}
                <button
                    className='flex p-1 mt-[-4px] ml-[-50px] rounded-full cursor-pointer z-[3] duration-100 hover:bg-[#444444]'
                    style={{
                        scale: titleChanged ? 1 : 0,
                    }}
                    onClick={handleSaveTitle}>
                    <SaveIcon sx={{ color: 'white' }} />
                </button>
            </div>
            <div
                className='flex items-center gap-1 pl-12 z-[1] duration-200'
                style={{
                    opacity: titleSaved ? 1 : 0,
                    transform: titleSaved ? 'translateY(-8px)' : 'translateY(-40px)',
                }}
            >
                <CheckIcon sx={{ fontSize: 14, color: 'white' }} />
                <p
                    className='text-[14px] !text-[#6AE554]'
                >저장되었습니다.</p>
            </div>
        </>
    )
}