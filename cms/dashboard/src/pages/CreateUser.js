import React, { useState } from 'react'
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function CreateUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://127.0.0.1:5000/customeradd', inputs).then(function (response) {
            // console.log(response.data);
            // setInputs(Response.data);
            navigate('/')
        })

    }



    return (
        <div className="bg-blue-50 w-fi p-5 container mx-auto mt-2 Poppinsbold rounded-md">
            <div className='flex'>
                <p className='hover:bg-white duration-500 rounded-full w-fit p-2 '><Link to={'/'}><ArrowBackRoundedIcon /></Link></p>
                <h1 className='pt-1 ml-2 my-auto w-full'>Create New User</h1>
            </div>
            <form onSubmit={handleSubmit} className='mt-5 ml-2 w-96 space-y-5 '>
                <div className='flex flex-col justify-between'>
                    <label className='w-full my-auto'>Name</label>
                    <input type='text' name='name' onChange={handleChange} className='py-2 px-2 rounded-lg mt-2 border-2 Poppins text-sm' />
                </div>
                <div className='flex flex-col justify-between'>
                    <label className='w-full my-auto'>Address</label>
                    <input type='text' name='address' onChange={handleChange} className='py-2 px-2 rounded-lg mt-2 border-2 Poppins text-sm' />
                </div>
                <div className='flex flex-col justify-between'>
                    <label className='w-full my-auto'>Mobile Numer</label>
                    <input type='number' name='monumber' onChange={handleChange} className='py-2 px-2 rounded-lg mt-2 border-2 Poppins text-sm' />
                </div>
                <div className='flex flex-col justify-between'>
                    <label className='w-full my-auto'>Meter Serial No</label>
                    <input type='number' name='metersrnumber' onChange={handleChange} className='py-2 px-2 rounded-lg mt-2 border-2 Poppins text-sm' />
                </div>
                <div className='flex justify-end'>
                    <button type='submit' className='bg-green-500 px-5 py-2 rounded-md text-white'>Save</button>
                </div>
            </form>
        </div>
    )
}
