import type { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
    className?: string;
}

export default function Input(props: InputProps) {
    const { className, ...rest } = props;

    return (
        <input
            className={`px-8 py-2 text-lg rounded-full outline-none bg-[#222222] text-[#EEEEEE] ${className}`}
            type="text"
            {...rest}
        />
    )
}