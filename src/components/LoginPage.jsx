import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/UserSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(values);
            const response = await axios.post("http://localhost:8000/user/login", values);

            console.log(response.data);
            setCookies("access_token", response.data.token);
          
           
            const getTokenPayload = (token) => {
              if (!token) {
                return null;
              }
            
            const tokenParts = token.split('.');
              if (tokenParts.length !== 3) {
                // Invalid token format
                return null;
              }
            
            const payloadBase64 = tokenParts[1];
            const decodedPayload = atob(payloadBase64); // Decode base64
            
          try {
              const parsedPayload = JSON.parse(decodedPayload);
              return parsedPayload;
          }catch (error) {
              console.error('Error parsing JWT payload:', error);
              return null;
          }
          };
            
            // Example usage
           const jwtToken = response.data.token;
           const payload = getTokenPayload(jwtToken);
            
            if (payload) {
              console.log('JWT Payload:', payload);
              // Access payload properties, e.g., payload.userId, payload.username, etc.
            } else {
              console.log('Invalid JWT token or unable to extract payload.');
            }
               const { id, username, email} = payload;
               const role=response.data.role;
               dispatch(setUser({ id, username,email,role }));
               console.log(username);
             
              localStorage.setItem('UserID', response.data.id);
              localStorage.setItem('UserName', payload.username);
              localStorage.setItem('Email', payload.email);
              localStorage.setItem('role', response.data.role);
              
            // Vérifier le rôle avant de rediriger
            if (response.data.role === 'user') {
                navigate("/user_page/");
            } else {
                // Redirection vers une autre page si le rôle n'est pas "user"
                navigate('/Table_user');
            }

        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 400) {
                    setError("All fields are required");
                } else if (error.response.status === 401) {
                    setError("Username or password is incorrect");
                } else {
                    setError("An error occurred during login");
                }
            } else {
                setError("An error occurred during login");
            }
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex items-center justify-center">
                <img src="src/images/img2.jpg" alt="img" className="w-full h-full object-cover" />
            </div>

            <div className="card px-8 py-6 bg-gray-800 w-1/2 flex items-center justify-center">
                <div className="w-3/4">
                    <h1 className="text-center mb-10 font-bold text-3xl text-blue-500 uppercase">Welcome Back!</h1>
                    <h1 className="text-center font-bold text-3xl text-white">Login</h1>
                    <form className="my-6">
                        <input className="p-2 my-2 rounded w-full focus:outline-blue-600" placeholder="Email" type="email"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })} />
                        <input className="p-2 my-2 rounded w-full focus:outline-blue-600" placeholder="Password" type="password"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })} />
                        <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 mt-3 rounded w-full" onClick={handleSubmit}>
                            Login
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-white">Not registered? <Link to="/Sign_up" className="text-blue-500">Sign up</Link></p>
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
