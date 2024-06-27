import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from "next-auth/react"
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { app } from '../../shared/FirebaseConfig';
import { toast } from 'react-toastify';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Form() {

    const { data: session, status } = useSession();
    const [imageName, setImageName] = useState('');
    const db = getFirestore(app);
    const storage = getStorage();
    const metadata = {
        contentType: 'image/jpeg'
    };

    const validationSchema = Yup.object({
        userName: Yup.string().required("Required"),
        email: Yup.string().email('Please enter a valid email').required('Required'),
        title: Yup.string().required('Required'),
        desc: Yup.string().required('Required'),
        date: Yup.date().required('Required'),
        location: Yup.string().required('Required'),
        zip: Yup.string().required('Required'),
        game: Yup.string().required('Required')
    });

    const uploadImage = async (file) => {

        // document.getElementById('upload-btn').disabled = true;

        const uploadBtn = document.getElementById('upload-btn');

        uploadBtn.disabled = true;
        uploadBtn.innerHTML = 'Uploading...';


        // console.log(`images/${imageName.name}`)
        const storageRef = ref(storage, `images/${imageName.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageName, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log('User does not have permission to access the object')
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        console.log('User canceled the upload')
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        console.log('Unknown error occurred, inspect error.serverResponse')
                        break;
                }
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    values.image = downloadURL;
                    console.log(values);
                });
            }
        );
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = 'Upload';
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arası olduğu için 1 eklenir
    const day = String(now.getDate()).padStart(2, '0');

    const resetForm = () => {
        values.title = '';
        values.desc = '';
        values.date = `${month} ${day},${year}`;
        values.location = '';
        values.zip = '';
        values.game = '';
    }

    const { handleSubmit, handleChange, values, errors, handleBlur } = useFormik({
        initialValues: {
            userName: session?.user.name,
            email: session?.user.email,
            userImage: session?.user.image,
            title: '',
            desc: '',
            date: `${month} ${day},${year}`,
            location: '',
            zip: '',
            game: '',
        },
        onSubmit: async (values) => {
            await setDoc(doc(db, 'posts', Date.now().toString()), values);
            toast.success('Post created successfully')
            //clear form
            resetForm();

        },
        validationSchema: validationSchema,
    });

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-y-4'>
                <input onChange={handleChange} onBlur={handleBlur} values={values.title} type="text" name='title' placeholder="Title" className="input input-bordered w-full max-w-xs" />
                <span className='text-sm font-bold text-red-700'>{errors.title && errors.title}</span>
                <textarea onChange={handleChange} onBlur={handleBlur} values={values.desc} name='desc' className="textarea textarea-bordered max-w-xs" placeholder="Write Description here..."></textarea>
                <span className='text-sm font-bold text-red-700'>{errors.desc && errors.desc}</span>
                <DatePicker
                    name='date'
                    selected={values.date}
                    onBlur={handleBlur}
                    onChange={date => values.date = `${String(date.getMonth() + 1).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')},${date.getFullYear()}`}
                    className="input input-bordered w-full max-w-xs"
                />
                <span className='text-sm font-bold text-red-700'>{errors.date && errors.date}</span>
                <input type="text" onChange={handleChange} onBlur={handleBlur} values={values.location} name='location' placeholder="Location" className="input input-bordered w-full max-w-xs" />
                <span className='text-sm font-bold text-red-700'>{errors.location && errors.location}</span>
                <input type="text" onChange={handleChange} onBlur={handleBlur} values={values.zip} name='zip' placeholder="Zip" className="input input-bordered w-full max-w-xs" />
                <span className='text-sm font-bold text-red-700'>{errors.zip && errors.zip}</span>
                <select name='game' onChange={handleChange} onBlur={handleBlur} values={values.game} className="select select-bordered w-full max-w-xs">
                    <option disabled selected
                        key={0}>Select Game</option>
                    <option key={1}>Tennis</option>
                    <option key={2}>Cricket</option>
                    <option key={3}>Football</option>
                    <option key={4}>Basketball</option>
                    <option key={5}>Badminton</option>
                    <option key={6}>Table Tennis</option>
                    <option key={7}>Swimming</option>
                    <option key={8}>Volleyball</option>
                    <option key={9}>Golf</option>
                    <option key={10}>Soccer</option>
                    <option key={11}>Other</option>
                </select>
                <span className='text-sm font-bold text-red-700'>{errors.game && errors.game}</span>
                <div className='flex flex-row items-center gap-x-2'>
                    <input
                        className='input input-bordered w-full max-w-xs bg-white p-2 rounded-md'
                        type="file"
                        name="image"
                        onBlur={handleBlur}
                        onChange={(e) => {
                            if (e.target.files[0].size > 1000000) {
                                toast.error('Image size should be less than 1MB')
                            } else {
                                setImageName(e.target.files[0]);
                            }
                        }
                        }
                        accept="image/gif, image/jpeg, image/png"
                    />
                    <div className='btn btn-primary' id='upload-btn' onClick={uploadImage}>Upload</div>
                </div>
                <span className='text-sm font-bold text-red-700'>{errors.image && errors.image}</span>

                <button type='submit' className="btn btn-primary max-w-xs">Submit</button>
            </div>
        </form>
    )
}

export default Form
