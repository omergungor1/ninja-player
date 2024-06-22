import React from 'react'
import PostItem from './PostItem';
import { HiOutlineXCircle } from 'react-icons/hi2'

function PostModal({ postData }) {
    return (
        <div>
            <dialog id="my_modal_1" className="modal rounded-lg">
                <div className="modal-box w-72 max-h-screen md:w-96">
                    <div className="absolute top-8 right-8 bg-gray-800 rounded-full">
                        <HiOutlineXCircle className="w-6 h-6 cursor-pointer" onClick={() => { document.getElementById('my_modal_1').close() }} />
                    </div>
                    <PostItem post={postData} />
                </div>
            </dialog>
        </div>
    )
}

export default PostModal
