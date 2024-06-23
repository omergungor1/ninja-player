"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


function Profile() {
    const { data: session, status } = useSession();
    const userName = session?.user.name;

    useEffect(() => {
        if (!session) {
            toast.error('Please login to continue')
            router.push('/', { scroll: false })
        }
    }, [session]);

    return (
        <div className="py-12  flex flex-col gap-y-4">

            <h2 className='text-[30px] font-extrabold text-blue-500'>Profile</h2>
            <h3>Welcome back, {userName}</h3>
            <p className=''>Manage Your Post</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 px-4 cursor-pointer'>
                <div>
                    <div className='bg-blue-500 p-4 rounded-lg'>
                        <h2 className='text-white text-[20px] font-bold'>Post 1</h2>
                        <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptate.</p>
                    </div>
                </div>
                <div>
                    <div className='bg-blue-500 p-4 rounded-lg'>
                        <h2 className='text-white text-[20px] font-bold'>Post 2</h2>
                        <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptate.</p>
                    </div>
                </div>
                <div>
                    <div className='bg-blue-500 p-4 rounded-lg'>
                        <h2 className='text-white text-[20px] font-bold'>Post 3</h2>
                        <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptate.</p>
                    </div>
                </div>
                <div>
                    <div className='bg-blue-500 p-4 rounded-lg'>
                        <h2 className='text-white text-[20px] font-bold'>Post 4</h2>
                        <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptate.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Profile;
