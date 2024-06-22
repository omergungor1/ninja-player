import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from "next-auth/react"
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { app } from '../../shared/FirebaseConfig';
import { toast } from 'react-toastify';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

function Form() {

    const { data: session, status } = useSession();
    const db = getFirestore(app);

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

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arası olduğu için 1 eklenir
    const day = String(now.getDate()).padStart(2, '0');

    const { handleSubmit, handleChange, values, errors } = useFormik({
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
            // console.log(values);
            await setDoc(doc(db, 'posts', Date.now().toString()), values);
            // db.collection('posts').add(values)
            // .then(() => {
            //     console.log('success')
            //     toast.success('Post created successfully')
            // })
            // .catch((error) => {
            //     console.log('error')
            //     toast.error(error.message)
            // })
        },
        validationSchema: validationSchema,
    });

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-y-4'>
                <input onChange={handleChange} values={values.title} type="text" name='title' placeholder="Title" className="input input-bordered w-full max-w-xs" />
                <span className='text-sm font-bold text-red-700'>{errors.title && errors.title}</span>
                <textarea onChange={handleChange} values={values.desc} name='desc' className="textarea textarea-bordered max-w-xs" placeholder="Write Description here..."></textarea>
                <span className='text-sm font-bold text-red-700'>{errors.desc && errors.desc}</span>
                <DatePicker
                    name='date'
                    selected={values.date}
                    onChange={date => values.date = `${String(date.getMonth() + 1).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')},${date.getFullYear()}`}
                    className="input input-bordered w-full max-w-xs"
                />
                <span className='text-sm font-bold text-red-700'>{errors.date && errors.date}</span>
                <input type="text" onChange={handleChange} values={values.location} name='location' placeholder="Location" className="input input-bordered w-full max-w-xs" />
                <span className='text-sm font-bold text-red-700'>{errors.location && errors.location}</span>
                <input type="text" onChange={handleChange} values={values.zip} name='zip' placeholder="Zip" className="input input-bordered w-full max-w-xs" />
                <span className='text-sm font-bold text-red-700'>{errors.zip && errors.zip}</span>
                <select name='game' onChange={handleChange} values={values.game} className="select select-bordered w-full max-w-xs">
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

                <button type='submit' className="btn btn-primary max-w-xs">Submit</button>
            </div>
        </form>
    )
}

export default Form
