"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';
import { app } from '../../shared/FirebaseConfig';
import Posts from '../../components/Home/Posts';


function Profile() {
    const { data: session, status } = useSession();
    const userName = session?.user.name;

    const db = getFirestore(app);

    const router = useRouter();

    const [postData, setPostData] = useState([]);

    const getUserPosts = async () => {
        const q = query(collection(db, 'posts'), where('email', '==', session.user.email));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            setPostData([...postData, doc.data()]);
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
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 cursor-pointer'>
                {postData && postData.map((item, index) => (
                    // postData ? <Posts postData={item} key={index} /> : null
                    // console.log(item.desc, index)
                    // <Posts postData={item} key={index} />

                ))
                }
            </div>
        </div>
    )
}


export default Profile;
