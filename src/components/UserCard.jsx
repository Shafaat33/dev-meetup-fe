import React from "react";

const UserCard = ({ feed }) => {
  
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={feed?.photoUrl}
          alt="User photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{feed?.firstName}</h2>
        <p>General description of user</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  )
};

export default UserCard;
