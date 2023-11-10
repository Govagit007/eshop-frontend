import React from "react";
import playStore from "../images/playstoreimg.webp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <div className="w-full h-52  text-slate-50 bg-slate-700 flex flex-col md:flex-row justify-around items-center">
      <div className="w-1/5 h-full flex flex-col justify-around items-center">
        <h1 className="hover:text-slate-300">
          Download <span className="hidden md:inline">our app</span>
        </h1>
        <img
          src={playStore}
          alt=""
          className="object-contain rounded-2xl w-28"
        />
      </div>
      <div className="w-20 h-full hidden md:flex flex-col flex-1 justify-around items-center">
        <h1 className="text-slate-100 font-black text-2xl hover:text-slate-300">
          ESHOP
        </h1>
        <h3 className="hover:text-slate-300">High Quality is our priority</h3>
        <h3 className="hover:text-slate-300">Copyrights 2023 ©Mevenu</h3>
      </div>
      <div className="w-1/5 h-full flex flex-col justify-start items-center">
        <h1 className="mt-4 hover:text-slate-300">Contact us</h1>
        <div className="flex gap-4 md:mt-4 mt-2">
          <InstagramIcon className="hover:text-slate-300" />
          <FacebookIcon className="hover:text-slate-300" />
          <TwitterIcon className="hover:text-slate-300" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
