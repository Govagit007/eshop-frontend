import React from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({ isAthenticated }) => {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <>
      {" "}
      {isAthenticated ? (
        <Link to="/profile">
          <Avatar alt="Travis Howard" src={user.user?.avatar.url} />
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
