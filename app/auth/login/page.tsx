"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function page() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                toast.error("Email atau password salah!");
                return;
            }
            toast.success("Login berhasil");
            router.push("/");
        } catch (error) {
            toast.error("Server tidak terhubung!");
        } finally {
            setLoading(false);
        }
    }

    async function hadleLoginGoogle() {
        window.location.href = "http://127.0.0.1:8000/google/redirect?type=next"
    }

    return (
        <>
            <div className="bg-gray-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in an account
                            </h1>

                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                                </div>

                                <div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                    </div>
                                    <div className="pt-1.5">
                                        <Link href="/auth/forgot-password" className="font-medium text-sm text-blue-600 hover:underline">Forgot password</Link>
                                    </div>
                                </div>

                                <button disabled={loading} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {loading ? "Loading..." : "Sign in an account"}
                                </button>

                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">or</span>
                                </div>
                            </div>

                            <button onClick={hadleLoginGoogle} className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                                <img src="//www.gstatic.com/images/branding/searchlogo/ico/favicon.ico" alt="Google" className="w-5 h-5" />
                                <span className="font-medium text-gray-700">Sign in with Google</span>
                            </button>

                            <p className="text-sm font-light text-gray-500">
                                Don't have an account yet? <Link href="/auth/register" className="font-medium text-blue-600 hover:underline">Register here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
