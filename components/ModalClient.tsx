"use client"

interface ModalClient {
    title: string
    children: React.ReactNode
    open: boolean
}
export default function ModalClient({
    title, children, open
}: ModalClient) {
    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
                        <div>{children}</div>
                    </div>
                </div>
            )}
        </>
    )
}
