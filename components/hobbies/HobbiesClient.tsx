"use client"

import TableHobbies from "@/components/TableHobbies"
import ModalFormView from "@/components/ModalFormView"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react";
import ModalClient from "@/components/ModalClient"
import toast from "react-hot-toast"

export default function HobbiesClient({ hobbies }: any) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter()
    const [newHobby, setNewHobby] = useState("")
    const [openModalDelete, setModalDelete] = useState(false)


    async function handleCreate(hobby: string) {
        try {
            await fetch(`${apiUrl}/hobby`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hobby: hobby,
                }),
            })

            toast.success("Hobi berhasil ditambahkan")
            setNewHobby("")
            router.refresh()
        } catch (error) {
            toast.error("Gagal menambahkan hobi")
        }
    }


    async function handleLogout() {
        try {
            await signOut({
                callbackUrl: "/auth/login",
            });
            toast.success("Logout Berhasil")
        } catch (error) {
            toast.error("Logout Gagal")
        }
    }

    return (
        <>
            <div className="mx-auto box-border max-w-4xl p-4">
                <div className="flex items-center justify-between pt-24">
                    <h1 className="text-2xl font-bold mb-4">Tabel Hobi</h1>

                    <div className="mb-4">
                        <ModalFormView title="Tambah Hobi" value={newHobby} submitLabel="Simpan" onChange={setNewHobby} onSubmit={handleCreate} />
                    </div>
                </div>

                <TableHobbies hobbies={hobbies} />

                <button onClick={() => setModalDelete(true)} className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div >

            <ModalClient open={openModalDelete} title="Logout Akun"  >
                <p className="mb-6">Yakin ingin logout dari akun ini?</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setModalDelete(false)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Batal
                    </button>
                    <button
                        onClick={async () => {
                            await handleLogout()
                            setModalDelete(false)
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Ya, Logout
                    </button>
                </div>
            </ModalClient>
        </>
    )
}
