"use client"

import { useSession, signIn, signOut } from "next-auth/react"

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import Form from "./Form";

function CreatePost() {
    const { data: session, status } = useSession();
    const router = useRouter()

    useEffect(() => {
        // if (!session) {
        if (!session) {
            toast.error('Please login to continue')
            router.push('/', { scroll: false })
        }
    }, []);



    return (
        <div className="p-10 flex flex-col gap-y-4">
            <h1 className=" uppercase">Create Post</h1>
            <p>Create post and Discover/Invite new Friends and Player</p>
            <Form />
        </div>
    )
}

export default CreatePost