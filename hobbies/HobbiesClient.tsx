"use client"

import TableHobbies from "@/components/TableHobbies"
import ModalFormView from "@/components/ModalFormView"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HobbiesClient({ hobbies }: any) {
    const router = useRouter()
    const [newHobby, setNewHobby] = useState("")


    async function handleCreate(hobby: string) {
        await fetch("http://127.0.0.1:8000/api/hobby", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hobby: hobby,
            }),
        })

        setNewHobby("")
        router.refresh()
    }

    // async function handleUpdate(hobby: string) {
    //     await fetch(`http://127.0.0.1:8000/api/hobby/${editId}`)
    // }

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

                <button className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div >
        </>
    )
}
