import React, { useEffect, useState } from 'react'
import PostItem from './PostItem';
import PostModal from './PostModal';
import { useSearchParams } from 'next/navigation';

function Posts({ postData }) {

    const [post, setPost] = useState(null)

    return (
        <div>
            <PostModal postData={post} />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 px-4 cursor-pointer'>
                {postData && postData.map((item, index) => (
                    <div onClick={() => { document.getElementById('my_modal_1').showModal(); setPost(item); }}>
                        <PostItem post={item} key={index} modal={true} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts
