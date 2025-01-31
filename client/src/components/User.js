import React from "react";

const User = ({ userName }) => {
  return (
    <div className="user-info">
      <section>{userName[0].toUpperCase()}</section>
      <h4>{userName}:</h4>
    </div>
  );
};

export default User;
