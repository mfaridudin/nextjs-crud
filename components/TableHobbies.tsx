import { useState } from "react"
import ModalEditClient from "./ModalEditClient"
import ButtonViewClient from "./ButtonViewClient"
import { useRouter } from "next/navigation"
import ModalClient from "./ModalClient"

export default function TableHobbies({ hobbies }: any) {
    const [editId, setEditId] = useState("")
    const [editHobby, setEditHobby] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [openModalDelete, setModalDelete] = useState(false)
    const router = useRouter()
    const [deleteId, setDeleteId] = useState("")


    async function handleUpdate(hobby: string) {
        await fetch(`http://127.0.0.1:8000/api/hobby/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hobby: hobby,
            }),
        })

        setEditId("")
        setEditHobby("")
        router.refresh()
    }

    async function handleDelete() {
        await fetch(`http://127.0.0.1:8000/api/hobby/${deleteId}`, {
            method: "DELETE"
        })

        setDeleteId("")
        router.refresh()
    }
    return (
        <>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">No</th>
                        <th className="py-2 px-4 border-b">Hobi</th>
                        <th className="py-2 px-4 border-b">Tanggal buat</th>
                        <th className="py-2 px-4 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody>

                    {hobbies.map((hobby: any, index: number) => (
                        <tr key={hobby.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                            <td className="py-2 px-4 border-b text-center">{hobby.hobby}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {new Date(hobby.created_at).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <ButtonViewClient type="button"
                                    onClick={() => {
                                        setOpenModal(true)
                                        setEditHobby(hobby.hobby)
                                        setEditId(hobby.id)
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Edit
                                </ButtonViewClient>

                                <ButtonViewClient
                                    onClick={() => {
                                        setModalDelete(true)
                                        setDeleteId(hobby.id)
                                    }}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    Hapus
                                </ButtonViewClient>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* modal edit */}
            <ModalEditClient
                title="Edit Hobi"
                value={editHobby}
                submitLabel="Update"
                onChange={setEditHobby}
                onSubmit={(value) => {
                    handleUpdate(value)
                    setOpenModal(false)
                }}
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            {/* modal hapus */}
            <ModalClient open={openModalDelete} title="Hapus Data"  >
                <p className="mb-6">Yakin ingin menghapus data ini?</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setModalDelete(false)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Batal
                    </button>
                    <button
                        onClick={async () => {
                            await handleDelete()
                            setModalDelete(false)
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </ModalClient>
        </>
    )
}

