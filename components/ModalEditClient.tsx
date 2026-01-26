"use client"
import { useState } from "react"
import ButtonViewClient from "./ButtonViewClient"

interface ModalEditProps {
    title?: string
    value: string
    submitLabel: string
    onChange: (value: string) => void
    onSubmit: (value: string) => void
    open: boolean
    onClose: () => void
}

export default function ModalEditClient({
    title,
    value,
    submitLabel,
    onChange,
    onSubmit,
    open,
    onClose,
}: ModalEditProps) {

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

                        <form
                            onSubmit={(e) => {
                                onSubmit(value)
                                e.preventDefault()
                                setTimeout(() => onClose)
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
                                    onClick={onClose}
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
