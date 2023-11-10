import React, { useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import { Link } from "react-router-dom";

import logo from "../logos/eshoplogo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const [open, setOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);

  const { isAthenticated } = useSelector((state) => state.userReducer);

  return (
    <div className="absolute flex flex-row justify-center items-center w-screen h-auto z-10">
      <div className=" fixed left-4 top-4 overflow-hidden z-20  rounded-md hover:scale-110">
        <AnimatePresence>
          {open ? (
            <div>
              <CloseIcon
                onClick={() => setOpen(!open)}
                className="close w-full scale-150 z-20"
              />
            </div>
          ) : (
            <div>
              <MenuIcon
                onClick={() => setOpen(!open)}
                className="burger w-full scale-150 z-20"
              />
            </div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {open && (
          <div className="flex w-screen left-0 top-0 z-10 fixed h-screen md:flex-row overflow-hidden justify-around items-center">
            <div className=" w-full h-full md:h-1/3 flex flex-col md:flex-row justify-around items-center overflow-hidden">
              <m.div
                initial={{ x: "-200%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-200%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className=" rounded-lg w-auto h-auto flex justify-center "
              >
                <img
                  src={logo}
                  alt=""
                  className="rounded-2xl w-1/2 md:auto hover:shadow-lg shadow-slate-900"
                />
              </m.div>

              <m.div
                className="flex w-auto h-auto justify-between overflow-hidden  lg:flex-row flex-col md:gap-10 gap-4 items-center"
                initial={{ y: "-1000px" }}
                animate={{ y: "0%" }}
                exit={{ y: "1000px" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                <h1
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  {" "}
                  <Link to="/"> Home</Link>
                </h1>
                <h1
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <Link to="/search">Products</Link>
                </h1>
                <h1
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <Link to="/about"> About us </Link>
                </h1>
                <h1
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <Link to="/contact">Contact</Link>
                </h1>
              </m.div>
              <m.div
                className="flex flex-row  md:flex-col lg:flex-row md:gap-8 gap-4  justify-around items-center  overflow-hidden"
                initial={{ x: "300%" }}
                animate={{ x: "0%" }}
                exit={{ x: "300%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <Link to="/search">
                  <SearchIcon
                    className="hover:text-blue-600 cursor-pointer"
                    onClick={() => setOpen(!open)}
                  />
                </Link>

                <Link to="/checkout">
                  {" "}
                  <IconButton
                    aria-label="cart"
                    className="flex justify-center items-center bg-red-300"
                  >
                    <Badge badgeContent={cart.length} color="secondary">
                      <LocalGroceryStoreIcon
                        className="hover:text-blue-600 cursor-pointer"
                        onClick={() => setOpen(!open)}
                      />
                    </Badge>
                  </IconButton>
                </Link>

                <Link to={isAthenticated ? `/profile` : "/"}>
                  <AccountBoxIcon
                    className="hover:text-blue-600 cursor-pointer"
                    onClick={() => setOpen(!open)}
                  />
                </Link>
              </m.div>
            </div>
            <div className="absolute w-screen h-screen flex flex-row -z-10 overflow-hidden">
              <m.div
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-1/4 h-screen bg-slate-400 z-40"
              ></m.div>
              <m.div
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-1/4 h-screen bg-slate-400 z-40"
              ></m.div>
              <m.div
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-1/4 h-screen bg-slate-400 z-40"
              ></m.div>
              <m.div
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="w-1/4 h-screen bg-slate-400 z-40"
              ></m.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
