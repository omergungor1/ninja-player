import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession, signIn, signOut } from "next-auth/react"

function Form() {
    const [startDate, setStartDate] = useState(new Date());
    const [inputData, setInputData] = useState({});

    const { data: session, status } = useSession();

    useEffect(() => {
        setInputData(() => ({ userName: session?.user.name, email: session?.user.email, userImage: session?.user.image }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        setInputData((values) => ({ ...values, userName: session?.user.name, email: session?.user.email, userImage: session?.user.image, ...data }));
    }

    const handleChange = (e) => {
        // setInputData((values) => ({ ...values, [e.target.name]: e.target.value }));
        // console.log(inputData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-y-4'>
                <input onChange={handleChange} type="text" name='title' placeholder="Title" className="input input-bordered w-full max-w-xs" />
                <textarea onChange={handleChange} name='desc' className="textarea textarea-bordered max-w-xs" placeholder="Write Description here..."></textarea>
                <DatePicker
                    name='date'
                    // onChange={handleChange}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="input input-bordered w-full max-w-xs"
                />
                <input type="text" onChange={handleChange} name='location' placeholder="Location" className="input input-bordered w-full max-w-xs" />
                <input type="text" onChange={handleChange} name='zip' placeholder="Zip" className="input input-bordered w-full max-w-xs" />
                <select value={0} name='game' className="select select-bordered w-full max-w-xs">
                    <option disabled selected
                        option="true" value={0} key={0}>Select Game</option>
                    <option option="true" value={1} key={1}>Tennis</option>
                    <option option="true" value={2} key={2}>Cricket</option>
                    <option option="true" value={3} key={3}>Football</option>
                    <option option="true" value={4} key={4}>Baseball</option>
                    <option option="true" value={5} key={5}>Basketball</option>
                    <option option="true" value={6} key={6}>Badminton</option>
                    <option option="true" value={7} key={7}>Table Tennis</option>
                    <option option="true" value={8} key={8}>Swimming</option>
                    <option option="true" value={9} key={9}>Running</option>
                    <option option="true" value={10} key={10}>Boxing</option>
                    <option option="true" value={11} key={11}>Yoga</option>
                    <option option="true" value={12} key={12}>Weight Lifting</option>
                    <option option="true" value={13} key={13}>Cardio</option>
                    <option option="true" value={14} key={14}>Other</option>
                </select>
                <button className="btn btn-primary max-w-xs">Submit</button>
            </div>
        </form>
    )
}

export default Form
