import React from "react";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import {BASE_URL} from "../utils/constants";
import profilePhoto from "./../assets/profilePic.png";

const UserCard = ({ feed, isProfileVeiw }) => {
  const dispatch = useDispatch();
  const handleUserRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={feed?.photoUrl || profilePhoto}
          alt="User photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{feed?.firstName}</h2>
        <p>{feed?.about}</p>
        {!isProfileVeiw && (
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => handleUserRequest('ignored', feed._id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => handleUserRequest('interested', feed._id)}>Interested</button>
          </div>
        )}
      </div>
    </div>
  )
};

export default UserCard;
