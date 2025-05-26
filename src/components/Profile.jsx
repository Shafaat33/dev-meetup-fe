import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";


const Profile = () => {
  
  const user = useSelector((store) => store.user.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  
  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/profile/update/`,{
        firstName,
        lastName,
        gender,
        age,
        about,
        photoUrl,
      }, { withCredentials: true });
      setShowInfo(true);
      setTimeout(() => {
        setShowInfo(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };
  
  return (
    <>
      <div className='flex justify-center my-5'>
        <div className="card bg-base-300 w-120 mx-5">
          <div className="card-body items-center text-center">
            <h1 className='text-xl my-5'>Update Profile</h1>
            <label className="input mx-10">
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                type="text"
                required
                placeholder="Enter First Name"
              />
            </label>
        
            <label className="input mx-10">
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                type="text"
                required
                placeholder="Enter Last Name"
              />
            </label>
        
            <label className="input mx-10">
              <input
                value={photoUrl}
                onChange={(event) => setPhotoUrl(event.target.value)}
                type="text"
                required
                placeholder="Enter photo url"
              />
            </label>
        
            <label className="input mx-10">
              <select onChange={(event) => setGender(event.target.value)} defaultValue={gender} className="colorselect-secondary">
                <option>male</option>
                <option>female</option>
                <option>others</option>
              </select>
            </label>
        
            <label className="input mx-10">
              <input
                value={age}
                onChange={(event) => setAge(event.target.value)}
                type="number"
                required
                placeholder="Enter Age"
              />
            </label>
        
            <label className="input mx-10">
              <input
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                type="text"
                required
                placeholder="Enter About"
              />
            </label>
        
            {error && <div className="text-red-500">{error}</div>}
            <div className="card-actions justify-end">
              <button
                className="btn btn-wide btn-primary"
                onClick={handleSaveProfile}
              >
                Save profile
              </button>
            </div>
          </div>
        </div>
        <UserCard
          feed={{ firstName, lastName, photoUrl, about, gender, age }}
        />
      </div>
      {showInfo && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile;
