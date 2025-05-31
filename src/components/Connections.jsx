import React, {useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {addConnections} from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection.connections);
  
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnections(res.data.connections));
    }
    catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchConnection();
  }, []);
  
  if (!connections.length) return <p>No connection found</p>
  
  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-2xl'>Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } = connection;
        return (
          <div key={_id} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
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
          </div>
        )
      })}
    </div>
  )
};

export default Connections;
