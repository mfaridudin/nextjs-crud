"use client"
import { useState } from "react"
import ButtonViewClient from "./ButtonViewClient"

interface ModalFormProps {
    title?: string
    value: string
    submitLabel: string
    onChange: (value: string) => void
    onSubmit: (value: string) => void

}

export default function ModalFormView({
    title,
    value,
    submitLabel,
    onChange,
    onSubmit,
}: ModalFormProps) {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <ButtonViewClient type="button"
                onClick={() => setOpenModal(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Tambah Hobi
            </ButtonViewClient>

            {openModal && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

                        <form
                            onSubmit={(e) => {
                                onSubmit(value)
                                e.preventDefault()
                                setTimeout(() => setOpenModal(false), 0)
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder="Masukkan nama hobi"
                                className="w-full border rounded-lg px-4 py-3"
                                required
                            />

                            <div className="flex justify-end gap-2">
                                <ButtonViewClient
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Batal
                                </ButtonViewClient>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    {submitLabel}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
