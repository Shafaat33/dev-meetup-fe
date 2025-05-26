import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request.requests);
  
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', { withCredentials: true });
      dispatch(addRequests(res.data.requests));
    }
    catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchConnection();
  }, []);
  
  if (!requests.length) return <p>No request found</p>
  
  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-2xl'>Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } = request.fromUserId;
        return (
          <div key={_id} className='flex justify-between item-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto'>
            <div>
              <img
                alt='photo'
                src={photoUrl}
                className='w-20 h-20 rounded-full'
              />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender }</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="mx-5 btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default Requests;
