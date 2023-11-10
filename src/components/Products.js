import React from "react";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { getProduct } from "../actions/productActions";

const Products = ({ products }) => {
  const dispatch = useDispatch();

  const handleSelect = (id) => {
    dispatch(getProduct(id));
  };

  return (
    <div className="flex pb-8 w-full min-h-full h-full justify-center flex-wrap gap-10 mt-8 ">
      {products.map((p, i) => {
        return (
          <Link to={`product/${p._id}`} key={i}>
            <div
              className="w-56 h-52 hover:bg-amber-300 flex flex-col justify-between items-center gap-2 rounded-xl transition-all duration-300 hover:scale-110"
              onClick={() => handleSelect(p._id)}
            >
              <div className="w-full h-4/5 flex  justify-center items-center">
                <img
                  src={p.thumbnail}
                  alt={p.name}
                  className="w-full  object-cover h-full rounded-2xl"
                />
              </div>
              <div className="text-sm text-orange-800 pb-2 flex gap-4">
                <h1>
                  {p.name.length < 10 ? p.name : `${p.name.slice(0, 10)}..`}
                </h1>
                <h1>₹{p.price}</h1>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Products;
