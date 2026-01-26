"use client"

interface ButtonProps {
    onClick: () => void
    className?: string
    type?: "button" | "submit" | "reset"
    children: React.ReactNode
}

export default function ButtonViewClient({ onClick, children, className, type }: ButtonProps) {
    return (
        <>
            <button type={type} onClick={onClick} className={className}>
                {children}
            </button>
        </>
    )
}
