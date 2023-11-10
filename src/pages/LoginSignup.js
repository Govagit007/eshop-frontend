import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../actions/userActions";
import Error from "../components/layout/Error";
import Success from "../components/layout/Success";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();

  const { loading, error, isAthenticated } = useSelector(
    (state) => state.userReducer
  );

  const [showPassword, setShowPassword] = useState(false);
  const [openLogin, setOpenLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: "",
    avatar: {
      url: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  });

  const [confirmPassword, setConfirmPassword] = useState();

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(userLogin(loginData));
    navigate("/");
  };

  const postDetails = (pics) => {
    if (!pics) {
      return console.log("select a pic");
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dd3qo1ji4");
      fetch("https://api.cloudinary.com/v1_1/dd3qo1ji4/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setSignupData({
            ...signupData,
            avatar: {
              url: data.url.toString(),
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("pic selection failed");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.password !== confirmPassword) {
      console.log("password not matched");
    } else {
      dispatch(userRegister(signupData));
    }
  };

  useEffect(() => {
    if (isAthenticated) {
      navigate("/");
    }
  }, [isAthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <> </>
      )}
      {error ? (
        <Error error={error} />
      ) : (
        <>
          {" "}
          <Success message={"Sign up Successfully...Go to Login"} />
        </>
      )}

      <div className="w-screen h-screen bg-orange-100 flex justify-center items-start   ">
        <div className="flex flex-col justify-start items-start sm:m-20 mt-8 m-2  w-full md:w-1/3 h-96 bg-slate-700">
          <div className={`flex justify-around w-full`}>
            <button
              className={`p-2 w-1/2 ${
                openLogin
                  ? "scale-105 bg-sky-300 text-slate-500"
                  : "scale-100 text-slate-300 "
              } transition-all duration-300 `}
              onClick={() => setOpenLogin(true)}
            >
              Login
            </button>
            <button
              className={` p-2 w-1/2 ${
                openLogin
                  ? "scale-105 text-slate-300 "
                  : "scale-100 bg-sky-300 text-slate-500 "
              } transition-all duration-300`}
              onClick={() => setOpenLogin(false)}
            >
              Signup
            </button>
          </div>
          {openLogin ? (
            <form
              className="bg-slate-200 flex flex-col w-full flex-1 h-auto gap-20 p-4 justify-around pb-4 items-center"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col gap-8 w-2/3  relative">
                <TextField
                  id="outlined-basic"
                  required
                  label="email"
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  variant="outlined"
                />
                <div className="w-full flex relative ">
                  <TextField
                    id="outlined-basic"
                    type={showPassword ? "text" : "password"}
                    label="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    variant="outlined"
                    className="w-full"
                    required
                  />
                  <div className="absolute  right-0 bottom-2 flex justify-end ">
                    {" "}
                    <Button
                      className=" hover:scale-90"
                      variant="text"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <p className="text-xs hover:text-sky-600 text-slate-400 cursor-pointer">
                  forget password?
                </p>
                <button
                  className="bg-blue-300 text-slate-600 p-2 rounded hover:scale-90 hover:shadow-md hover:shadow-slate-600 shadow-sm transition-all duration-300"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          ) : (
            <form
              className="bg-slate-200 flex flex-col w-full flex-1 gap-10 p-4 justify-around pb-4 items-center"
              onSubmit={handleSignup}
            >
              <div className="flex flex-col gap-4 w-2/3">
                <TextField
                  id="outlined-basic"
                  required
                  label="Name"
                  variant="outlined"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                />
                <TextField
                  id="outlined-basic"
                  required
                  label="Email"
                  variant="outlined"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />
                <div className="w-full flex relative ">
                  <TextField
                    id="outlined-basic"
                    type={showPassword ? "text" : "password"}
                    label="password"
                    name="password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    variant="outlined"
                    className="w-full"
                    required
                  />
                  <div className="absolute  right-0 bottom-2 flex justify-end ">
                    {" "}
                    <Button
                      className=" hover:scale-90"
                      variant="text"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>

                <div className="w-full flex relative ">
                  <TextField
                    id="outlined-basic"
                    type={showPassword ? "text" : "password"}
                    label="confirm password"
                    name="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    className="w-full"
                    required
                  />
                  <div className="absolute  right-0 bottom-2 flex justify-end ">
                    {" "}
                    <Button
                      className=" hover:scale-90"
                      variant="text"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>
                <input
                  className="w-full bg-pink-300 choose-file"
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="file"
                  accept="image/*"
                  label="Upload Profile Picture"
                  custom
                />
              </div>

              <button
                className="bg-blue-300 text-slate-600 p-2 rounded hover:scale-90 hover:shadow-md hover:shadow-slate-600 shadow-sm transition-all duration-300"
                type="submit"
              >
                Signup
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
