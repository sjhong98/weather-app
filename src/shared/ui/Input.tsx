import type { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
    className?: string;
}

export default function Input(props: InputProps) {
    const { className, ...rest } = props;

    return (
        <input
            className={`bg-[#222222] text-lg px-8 py-2 rounded-full outline-none text-[#EEEEEE] ${className}`}
            type="text"
            {...rest}
        />
    )
}