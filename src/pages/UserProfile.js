import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../actions/userActions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isAthenticated } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAthenticated) {
      navigate("/");
    }
  });

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  useEffect(() => {
    if (!isAthenticated) {
      navigate("/");
    }
  });
  return (
    <>
      {user ? (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="w-4/5 flex justify-around items-center gap-8 bg-slate-300 h-4/5 rounded-xl shadow-md shadow-slate-600">
            <div className="w-1/4 md:w-1/3">
              <img
                src={user.user?.avatar.url}
                alt=""
                className="rounded-full object-cover "
              />
            </div>
            <div className="flex flex-col justify-around items-center gap-8">
              <h1 className="text-4xl text-slate-500">{user.user.name}</h1>
              <h2 className="text-slate-500">{user.user.email}</h2>
              <button
                className="bg-blue-400 text-sky-100 p-2 rounded-xl hover:scale-90 hover:shadow-md hover:shadow-slate-800 transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserProfile;
