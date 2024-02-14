import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

import man from "../images/man_user.png"
import woman from "../images/women_user.png"
import img from "../images/userPage.jpg"


function UserPage() {
    // const username = useSelector((state) => state.user.username);
    // const userId =useSelector((state) => state.user.id);
    const username = localStorage.getItem('UserName') ; 
    const role = localStorage.getItem('role') ; 
    const email = localStorage.getItem('Email') ; 
    const userId = localStorage.getItem('UserID') ; 
    console.log(useSelector((state) => state.user.username));
    const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const token = cookies['access_token'];

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        roles: {} // Initialisez la propriété 'roles' avec un objet vide par défaut
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user/",{
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            });
            setValues(response.data);
            // console.log(values);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    console.log(values.gender);
    useEffect(() => {
        fetchData();
    }, []);



    const handleDelete = async (userId) => {
        try {
          await axios.delete(`http://localhost:8000/user/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
          });
          handleLogout(); 
          fetchData();
          console.log(userId);
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleLogout = () => {
        removeCookie("access_token");
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserID");
        localStorage.removeItem("role");
        localStorage.removeItem("Email");
        navigate('/log_in');
      };

    return (
        <div className="flex justify-center items-center h-screen">
            {/* Demi-page gauche */}
            <div className="w-1/3 p-8 flex justify-center items-center">
                <div className="w-60 h-85 bg-gray-800 rounded-3xl text-neutral-300 p-4 flex flex-col justify-center gap-3 shadow-2xl shadow-sky-400 transition-shadow">
                    {/* <div className="w-52 h-40 bg-sky-300 rounded-2xl"></div> */}
                    <img
                        src={values.gender == 'male' ? man : woman}
                        alt={values.gender == 'male' ? 'male_user' : 'female_user'}
                        className="w-28 h-28 rounded-2xl bg-blue-300 mb-2 object-cover"
                    />
                    <div>
                        <p className="font-extrabold">{username}</p>
                        <p>Email : {email} </p>
                        {/* Vérifiez si la propriété 'roles' est définie avant d'essayer d'accéder à 'roles.name' */}
                        {values.roles && <p>Role : {role}</p>}
                    </div>
                    {/* Delete button */}
                    <button onClick={() => handleDelete(userId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 m-1">
                            <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {/* Bouton de déconnexion */}
                    <button className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors mb-4" onClick={()=> handleLogout() }>
                        Log out
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Demi-page droite */}
            <div className="w-2/3 flex flex-col items-center justify-center">
                {/* Image */}
                <img src={img} alt="image" />
            </div>
        </div>
    );
}

export default UserPage;
