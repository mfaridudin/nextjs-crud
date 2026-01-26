"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function page() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")

    const [validation, setValidation] = useState<any>({});

    const router = useRouter()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation,
            }),
        })

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors);
            return;
        }
        router.push("/auth/login");
    }

    return (
        <>
            <div className="bg-gray-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="your name" required></input>
                                    {
                                        validation.name && (
                                            <span className="text-red-500 text-sm">{validation.name[0]}</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                                    {
                                        validation.name && (
                                            <span className="text-red-500 text-sm">{validation.email[0]}</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2" required />
                                    {
                                        validation.password && (
                                            <span className="text-red-500 text-sm">{validation.password[0]}</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                    <input type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    {
                                        validation.password_confirmation && (
                                            <span className="text-red-500 text-sm">{validation.password_confirmation[0]}</span>
                                        )
                                    }
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{"Create an account"}</button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account? <Link href="/auth/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
