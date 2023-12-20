import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function ListCustomePage() {

    const [cust, setCusts] = useState([]);
    useEffect(() => {
        getCusts();
    }, []);

    function getCusts() {
        axios.get('http://127.0.0.1:5000/listcusts').then(function (response) {
            // console.log(response.data);
            setCusts(response.data)
        });
    }

    const deleteCust = (id) =>{
        axios.delete(`http://127.0.0.1:5000/custdelete/${id}`).then(function (response) {
            // console.log(response.data);
            getCusts()
        });
        alert("Customer's Record Deleted")
    }


    return (
        <div className='container bg-green-300 mx-auto Poppinsbold rounded-md my-2'>
            <div>
                <div className="bg-blue-50 p-5 rounded-md">
                    <div className="flex w-full justify-between items-center">
                        <h1>Customers List</h1>

                        <p className="bg-green-500 text-white py-2 px-4 rounded-md hover:scale-[1.02] duration-300"><Link to="/addnewuser">Add New User</Link></p>
                    </div>

                    <table className="mt-5 table table-auto bg-white rounded-md w-full">
                        <thead className="">
                            <tr className="">
                                <th className="border-b-4 rounded-md py-2">User Id</th>
                                <th className="border-b-4 rounded-md py-2">Name</th>
                                <th className="border-b-4 rounded-md py-2">Address</th>
                                <th className="border-b-4 rounded-md py-2">Mobile Number</th>
                                <th className="border-b-4 rounded-md py-2">Meter Serial No.</th>
                                <th className="border-b-4 rounded-md py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="Montserratbold text-[14px] ">
                            {cust.map((cust, key) =>
                                <tr key={key} className="">
                                    <td className=" text-center py-1">{cust.id}</td>
                                    <td className=" text-center py-1">{cust.name}</td>
                                    <td className=" text-center py-1">{cust.address}</td>
                                    <td className=" text-center py-1">{cust.monumber}</td>
                                    <td className=" text-center py-1">{cust.metersrnumber}</td>
                                    <td className=" text-center py-1">
                                        <Link to={`cust/${cust.id}/edit`} className="hover:bg-gray-200 duration-500 rounded-full p-2"><ModeEditRoundedIcon className="text-green-500" /></Link>
                                        <button 
                                        onClick={()=> deleteCust(cust.id)}
                                        className="hover:bg-gray-200 duration-500 rounded-full p-2"><DeleteRoundedIcon className="text-red-500" /></button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}