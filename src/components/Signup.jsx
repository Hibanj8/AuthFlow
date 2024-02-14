import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        gender: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(values);
            const response = await axios.post("http://localhost:8000/user/register", values);

            console.log(response.data);
            navigate('/log_in');
          
        } catch (error) {
          }if (error.response.status === 409) {
            setError("User already exists");
          }else {
            setError("An error occurred during login");
          }
        }
    

    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex items-center justify-center">
                <img src="src/images/img1.jpg" alt="img" className="w-full h-full object-cover" />
            </div>

            <div className="card px-8 py-6 bg-gray-800 w-1/2 flex items-center justify-center">
                <div className="w-3/4">
                    <h1 className="text-center mb-10 font-bold text-3xl text-blue-500 uppercase">Hello, Welcome !</h1>
                    <h1 className="text-center font-bold text-3xl text-white">Sign up</h1>
                    <form className="my-6">
                        <input className="p-2 my-2 rounded w-full focus:outline-blue-600" placeholder="Name" type="text"
                            value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })} />
                        <input className="p-2 my-2 rounded w-full focus:outline-blue-600" placeholder="Email" type="email"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })} />
                        <input className="p-2 my-2 rounded w-full focus:outline-blue-600" placeholder="Password" type="password"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })} />
                        <select className="p-2 my-2 rounded w-full focus:outline-blue-600"
                            value={values.gender}
                            onChange={(e) => setValues({ ...values, gender: e.target.value })}>
                            <option value="" disabled selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        {/* Utilisation de Link pour la navigation */}
                        
                            <button onClick={()=> handleSubmit()} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 mt-3 rounded w-full">
                                Sign up
                            </button>
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
