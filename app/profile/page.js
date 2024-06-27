"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getFirestore, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../../shared/FirebaseConfig';
import PostItem from "../../components/Home/PostItem";

function Profile() {
    const { data: session, status } = useSession();
    const userName = session?.user.name;

    const db = getFirestore(app);

    const router = useRouter();

    const [userPosts, setUserPosts] = useState([]);

    const handleDelete = (id) => async () => {
        await deleteDoc(doc(db, 'posts', id));
        setUserPosts(userPosts.filter((item) => item.id !== id));
        toast.success('Post Deleted Successfully');
    }

    const getUserPosts = async () => {
        if (!session.user.email) return;

        const q = query(collection(db, 'posts'), where('email', '==', session.user.email));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            console.log(doc.image)
            setUserPosts([...userPosts, data]);
        }
        );
    };

    useEffect(() => {
        if (!session) {
            toast.error('Please login to continue')
            router.push('/', { scroll: false })
        }
        getUserPosts();
    }, [session]);

    return (
        <div className="px-4  flex flex-col gap-y-4">

            <h2 className='text-[30px] font-extrabold text-blue-500'>Profile</h2>
            <h3>Welcome back, {userName}</h3>
            <p className=''>Manage Your Post</p>
            {userPosts.length === 0 && <h1 className="text text-red-700">*No Post Found</h1>}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5 px-10 cursor-pointer'>

                {userPosts && userPosts.map((item, index) => (
                    <div>
                        <PostItem post={item} key={index} modal={false} />
                        <button onClick={handleDelete(item.id)} className="max-w-sm  mt-2 h-8 bg-red-400 w-full rounded-md text-white">Delete</button>
                    </div>
                ))
                }
            </div>
        </div>
    )
}


export default Profile;
