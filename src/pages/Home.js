import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import homeimg from "../images/homepage.avif";
import Products from "../components/Products";
import { getProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/layout/Loader";
import Profile from "../components/layout/Profile";

const Home = () => {
  const produtRef = useRef();
  const homeStart = useRef();

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  const { isAthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="relative z-0 w-full h-auto scrollbar-hide bg-gradient-to-b from-amber-200  to-orange-500">
        {isAthenticated ? (
          <div className="fixed top-8 right-10 z-50">
            <Profile isAthenticated={isAthenticated} />
          </div>
        ) : (
          <></>
        )}

        <div
          className="fixed bottom-6 right-5 z-40 text-2xl cursor-pointer hover:scale-150 transition-all duration-300"
          onClick={() => homeStart.current?.scrollIntoView()}
        >
          ⬆️
        </div>
        <img
          ref={homeStart}
          src={homeimg}
          alt=""
          className="absolute clip w-full h-screen object-fit"
        />
        <div className="z-10 relative  w-full h-screen  bg-sky- flex flex-col gap-y-10  justify-center md:items-start items-center ">
          <h1 className="md:text-6xl text-4xl text-orange-600  md:ml-20 font-bold">
            Wecome to Eshop
          </h1>
          <div className=" md:ml-28 flex flex-col md:flex-row justify-center items-center gap-8">
            {" "}
            <h3 className="text-2xl text-orange-600">Enjoy Your Shopping</h3>
            <div className="bg-orange-400 px-6 rounded-lg text-orange-100 hover:scale-125 hover:bg-orange-100 hover:text-orange-600 transition-all duration-300 p-4">
              <button onClick={() => produtRef.current?.scrollIntoView()}>
                Scroll ▼
              </button>
            </div>
          </div>
          {isAthenticated ? (
            <></>
          ) : (
            <Link to="/loginsignup">
              <div className=" md:ml-28  flex text-orange-100 justify-center items-center bg-orange-500 p-4 rounded-lg hover:scale-90 hover:shadow-md hover:shadow-slate-800 transition-all duration-300">
                <button>Login/Signup</button>
              </div>
            </Link>
          )}
        </div>
        <div
          ref={produtRef}
          className="flex w-full overflow-hidden   flex-wrap gap-6"
        >
          <div className="w-full h-full flex flex-col justify-center items-center mb-8">
            <h1 className="m-8 text-slate-600 md:text-xl text-md decoration-slate-600 underline underline-offset-8">
              Featured Products
            </h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <div>Error loading products: {error.message}</div>
            ) : products && products.length > 0 ? (
              <Products products={products} />
            ) : (
              <div>No products found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
