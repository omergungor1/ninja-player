"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { HiOutlinePencilSquare, HiArrowLeftOnRectangle } from "react-icons/hi2";

// cloudinary user image
const USER_IMAGE = "https://res.cloudinary.com/dc2p9cya1/image/upload/v1696364238/samples/people/boy-snow-hoodie.jpg";

function Header() {

    const { data: session, status } = useSession()

    return (
        <div className="flex justify-between p-3 items-center border-b-[2px] border-[#FF3366]">
            <Link href="/"><img src="/Images/logo.avif" width={150} className="h-20 w-20 rounded-full" alt="Logo" /></Link>
            <div className="flex gap-4">
                <Link href="/create-post" className="uppercase bg-black text-white p-2 px-3 h-12 rounded-full flex items-center"><span className="hidden sm:block">Create Post</span> <HiOutlinePencilSquare className="sm:hidden text-[20px]" /></Link>
                {
                    session ?
                        <button className="uppercase bg-white text-gray-500 p-2 px-3 h-12 border-[1px] rounded-full" onClick={() => {
                            signOut()
                        }}>Signout</button>
                        : <button onClick={() => { signIn("google") }} className="uppercase bg-white text-gray-500 p-2 px-3 h-12 border-[1px] rounded-full"><span className="hidden sm:block">Sing In</span> <HiArrowLeftOnRectangle className="sm:hidden text-[20px] text-black" /></button>
                }
                {
                    session ? (
                        <Link href="/profile"><Image src={session?.user.image} alt="user image" width={40} height={40} className="h-12 w-12 rounded-full" /> </Link>
                    ) : 'null'
                }
            </div>
        </div>
    )
}

export default Header
