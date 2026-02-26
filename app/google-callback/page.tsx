"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function GoogleCallbackPage() {
    console.log("PAGE RENDERED")
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const token = searchParams.get("token")

        if (!token) {
            router.push("/auth/login")
            return
        }

        signIn("credentials", {
            accessToken: token,
            redirect: false,
        }).then((res) => {
            if (!res?.error) {
                router.push("/")
            } else {
                router.push("/auth/login")
            }
        })
    }, [searchParams, router])

    return <p>Logging in with Google...</p>
}
