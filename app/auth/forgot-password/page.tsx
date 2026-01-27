"use client"

import Link from "next/link"
import { useState } from "react"

export default function Page() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [validation, setValidation] = useState<any>({})

    const forgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        setValidation({})

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/forgot-password?app=next`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            )

            const data = await res.json()

            if (!res.ok) {
                if (data.errors) {
                    setValidation(data.errors)
                }
                return
            }

            setMessage(data.message)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="bg-gray-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Forgot Password
                            </h1>

                            <div className="flex justify-center items-center pb-3">
                                {
                                    message && (
                                        <span className="text-green-500 text-sm justify-center text-center items-center">
                                            {message}
                                        </span>
                                    )
                                }
                            </div>

                            <form className="space-y-4 md:space-y-6" onSubmit={forgotPassword}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="email@company.com" required />
                                    {validation.email && (
                                        <span className="text-red-500 text-sm text-center items-center">
                                            {validation.email}
                                        </span>
                                    )}
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{"Forgot Password"}</button>

                            </form>

                            <p className="text-sm text-gray-500 mt-4 text-center">
                                Remember your password?{" "}
                                <Link href="/auth/login" className="text-blue-600 font-medium">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
