import React, { useEffect, useState } from "react";
import { addConnections } from "../utils/connectionSlice";
import { Search, MessageCircle, Phone, Video } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import NoMatchesFound from "../utils/NoMatchFound";
import profilePhoto from "./../assets/profilePic.png";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection.connections);
  const [filteredConnections, setFilteredConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFetchingConnections, setIsFetchingConnections] = useState(false);
  const Navigate = useNavigate();

  const fetchConnection = async () => {
    try {
      setIsFetchingConnections(true);
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnections(res.data.connections));
      setIsFetchingConnections(false);
      setFilteredConnections(res.data.connections);
    }
    catch (error) {
      console.log(error);
      setIsFetchingConnections(false);
    }
  }

  useEffect(() => {
    fetchConnection();
  }, []);

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredConnections(connections);
  }

  const handleFilteredConnections = (connection) => {
    const filterConnections = connections?.filter((conn) => conn.firstName.toLowerCase().includes(connection.toLowerCase()));
    setFilteredConnections(filterConnections);
    setSearchTerm(connection);
  }
  
  return (
    <div className={isFetchingConnections ? "p-6 loading-bars" : "p-6"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-blue-600">
            <MessageCircle />
          </span>
          My Connections
        </h1>
        <span className="badge badge-neutral text-sm px-4 py-2">
          {filteredConnections.length} connections
        </span>
      </div>
      
      <div className="mb-6">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
          <Search className="text-gray-400 w-4 h-4" />
          <input
            value={searchTerm}
            type="text"
            className="grow"
            placeholder="Search connections..."
            onChange={(e) => handleFilteredConnections(e.target.value)}
          />
        </label>
      </div>
      {filteredConnections.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {filteredConnections.map((person, idx) => {
            const { _id, firstName, photoUrl, about } = person;
            return (
              <div key={idx} className="card bg-base-100 border shadow-sm">
                <div className="card-body p-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img src={photoUrl || profilePhoto} alt='profile photo' className="w-12 h-12 bg-gray-200 rounded-full" />
                      <div>
                        <h2 className="font-semibold text-md">{firstName}</h2>
                        <p className="text-sm text-gray-500">{about}</p>
                      </div>
                    </div>
                    <div className="text-xl cursor-pointer">⋯</div>
                  </div>
            
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Status:</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`w-2 h-2 rounded-full bg-green-500`}/>
                      <span className='float-right'>Active</span>
                    </div>
                  </div>
            
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => Navigate('/chat/' + _id)} className="btn btn-primary btn-sm flex-1">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </button>
                    <button disabled className="btn btn-outline btn-sm">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button disabled className="btn btn-outline btn-sm">
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <NoMatchesFound searchTerm={searchTerm} onClearSearch={clearSearch}/>
      )}
    </div>
  );
}

export default Connections;
