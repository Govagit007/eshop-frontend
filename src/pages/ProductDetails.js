import React, { useState } from "react";

import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { motion as m, AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../constants/productConstants";
import Loader from "../components/layout/Loader";

const ProductDetails = () => {
  const { product, loading } = useSelector((state) => state.singleProduct);

  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [item, setItem] = useState(0);

  const [open, setOpen] = useState(false);

  const [alert, setAlert] = useState(false);

  const alertHandler = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2200);
  };

  const backdropHandler = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const handleAddProduct = (product) => {
    const addedItem = cart.filter((p) => p._id === product._id);

    if (item && !addedItem[0]) {
      dispatch({ type: ADD_TO_CART, payload: product });
      backdropHandler();
      alertHandler();
    } else {
    }
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <AnimatePresence>
        {alert && (
          <m.div
            className="fixed top-12 z-50"
            initial={{ y: "-200px", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-200px", opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            {" "}
            <Alert severity="success">
              {product.name.slice(0, 10)} is added to cart!
            </Alert>
          </m.div>
        )}
      </AnimatePresence>
      {/* <AnimatePresence>
        {itemAlert && (
          <m.div
            className="fixed top-12 z-50"
            initial={{ y: "-200px", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-200px", opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            {" "}
            <Alert severity="success">
              {product.name.slice(0, 10)} is added to cart!
            </Alert>
          </m.div>
        )}
      </AnimatePresence> */}

      <Card className="w-5/6 h-5/6 flex flex-col justify-center items-center">
        {loading ? (
          <Loader />
        ) : product ? (
          <div className="w-full  bg-slate-200 h-full flex md:flex-row flex-col justify-center items-center gap-4">
            <div className="w-1/2 relative bg-slate-200 flex justify-center items-center">
              <img
                src={product.thumbnail}
                alt=""
                className="w-2/3 rounded-xl"
              />
            </div>
            <div className="flex flex-col w-1/2 justify-center items-center gap-4">
              <h1 className="text-xl text-slate-600 font-black">
                {" "}
                {product.name}
              </h1>

              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <h1>₹ {product.price}.00 /-</h1>
              <h1>{product.description}</h1>
              <div className="flex justify-center flex-col items-center w-full gap-4">
                <div className="w-1/2 flex justify-center items-center gap-4">
                  <RemoveIcon
                    className="bg-slate-300"
                    onClick={() => setItem(Math.max(item - 1, 0))}
                  />
                  <span>{item}</span>
                  <AddIcon
                    className="bg-slate-300"
                    onClick={() => setItem(Math.min(item + 1, product.Stock))}
                  />
                </div>

                <div className="w-1/2 text-xs flex justify-center items-center">
                  {product.Stock} in Stock
                </div>
              </div>
              <div
                className="w-auto px-4 rounded-lg flex justify-center z-0 items-center bg-green-300 cursor-pointer hover:scale-90 hover:shadow-md shadow-slate-700 transition-all duration-300"
                onClick={() => handleAddProduct(product)}
              >
                {" "}
                <h1> Add to Cart</h1>
                <Tooltip title="Add to Basket">
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <IconButton>
                    <ShoppingBasketIcon />
                  </IconButton>
                </Tooltip>
              </div>

              <Link to="/checkout">
                <Button variant="contained" endIcon={<SendIcon />}>
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <span>No product is available with the ID</span>
        )}
      </Card>
    </div>
  );
};

export default ProductDetails;
