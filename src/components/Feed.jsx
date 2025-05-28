import React, {useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed.feed);

  const getFeed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(response?.data));
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    !feed?.length && getFeed();
  }, []);
  
  if (feed?.length <= 0) {
    return <h1>No new user found</h1>;
  }
  
  return (
    <div className='flex justify-center my-5'>
      {feed?.length > 0 && <UserCard feed={feed[0]}/>}
    </div>
  )
};

export default Feed;
