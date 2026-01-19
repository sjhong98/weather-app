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
            <div className='flex flex-row items-center gap-2 px-12 relative z-[3] overflow-hidden'>
                {isBookmarked && (
                    <form onSubmit={handleSaveTitle}>
                        <Input
                            value={titleInput}
                            onChange={handleChangeTitle}
                            className='!flex !w-[300px] !px-4 !py-1 ml-[-12px] !text-[16px] z-[3] !bg-[#333333]'
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
                    <SaveIcon />
                </button>
            </div>
            <div
                className='flex items-center gap-1 pl-12 z-[1] duration-200'
                style={{
                    opacity: titleSaved ? 1 : 0,
                    transform: titleSaved ? 'translateY(-8px)' : 'translateY(-40px)',
                }}
            >
                <CheckIcon sx={{ fontSize: 14 }} className='!text-[#6AE554]' />
                <p
                    className='text-[14px] !text-[#6AE554]'
                >저장되었습니다.</p>
            </div>
        </>
    )
}