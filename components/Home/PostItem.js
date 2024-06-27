import React from 'react'
import { HiOutlineCalendar, HiMiniMapPin } from 'react-icons/hi2'

function PostItem({ post, modal }) {
    return (
        <div className=''>
            {post && (
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="rounded-t-lg h-[180px] w-full" src={post.image} alt="" />
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title.substring(0, 10)}{post.title.length > 10 && '...'}</h5>
                        <div className='flex items-center text-orange-500 gap-2 mb-2'>
                            <HiOutlineCalendar className="inline-block w-5 h-5 text-[20px]" />
                            <span className="ml-2 text-sm font-medium ">{post.date}</span>
                        </div>
                        <div className='flex items-center text-orange-500 gap-2 mb-2'>
                            <HiMiniMapPin className="inline-block w-5 h-5 text-[20px]" />
                            <span className="ml-2 text-sm font-medium ">{post.location}</span>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.desc.substring(0, 30)}{post.desc.length > 30 && '...'}</p>
                        {modal ? (
                            <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </div>
                        ) : (
                            <div className="font-bold">
                                Posted By :
                                <div className=' flex justify-start space-x-2 items-center mt-1'>
                                    <img src={post.userImage} alt="" className='w-8 h-8 rounded-full' />
                                    <div className='flex flex-col'>
                                        <p className='font-semibold'>{post.userName}</p>
                                        <span className='text-sm font-light'>{post.email}</span>
                                    </div>
                                </div>
                            </div>

                        )}

                    </div>
                </div>
            )}
        </div>
    )
}

export default PostItem
