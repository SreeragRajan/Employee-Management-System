import React, { useState, useEffect, useContext } from 'react';
import { axiosInstance } from '../../utils/axios';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = ({ data, changeUser }) => {
  const [user, setUser] = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.fullName) {
      setUsername(data.fullName);
    } else {
      setUsername('Admin');
    }
  }, [data]); 

  const logOutUser = async() => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      if(res.status === 200) {
        setUser(null);
        toast.success("Logout Successfull");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error in Logout")
      console.log("Error in logout:", error.response?.message || error.message);
    }
  
  };

  return (
    <div className="flex items-center md:items-end justify-between">
      <h1 className="text-xl md:text-2xl font-medium">
        Hello <br />
        <span className="text-2xl md:text-3xl font-semibold">
          {username ? `${username} 👋` : 'Guest 👋'}
        </span>
      </h1>
      <button
        onClick={logOutUser}
        className="bg-red-600 text-sm md:text-base font-medium text-white px-3 py-1 md:px-5 md:py-2 rounded-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
