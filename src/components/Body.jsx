import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  }
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body;
