import { Input } from "@/shared/ui";
import SaveIcon from '@mui/icons-material/Save'
import CheckIcon from '@mui/icons-material/Check'

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
            <div className='flex flex-row items-center gap-2 px-12 overflow-hidden relative z-[3]'>
                {isBookmarked && (
                    <form onSubmit={handleSaveTitle}>
                        <Input
                            value={titleInput}
                            onChange={handleChangeTitle}
                            className='!py-1 !px-4 !text-[16px] !bg-[#333333] !w-[300px] ml-[-12px] z-[3]'
                            placeholder='장소 별칭을 입력해 주세요.'
                        />
                    </form>
                )}
                <button
                    className='cursor-pointer ml-[-50px] p-1 mt-[-4px] rounded-full hover:bg-[#444444] duration-100 z-[3]'
                    style={{
                        scale: titleChanged ? 1 : 0,
                    }}
                    onClick={handleSaveTitle}>
                    <SaveIcon />
                </button>
            </div>
            <div
                className='flex gap-1 items-center duration-200 pl-12 z-[1]'
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