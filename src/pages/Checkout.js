import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import { REMOVE_FROM_CART } from "../constants/productConstants";

const Checkout = () => {
  const [totalCost, setTotalCost] = useState(0);

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  useEffect(() => {
    const cost = cart.reduce((a, p) => {
      return a + p.price;
    }, 0);
    setTotalCost(cost);
  }, [cart]);

  let count = 1;
  return (
    <div className="w-full h-full justify-center items-center">
      <div className="w-full h-full flex flex-col justify-start items-center gap-8 m-8 ">
        <h1 className="text-2xl text-slate-500 underline underline-offset-8 decoration-slate-400  ">
          CheckOut Your Products
        </h1>
        <div className="w-full h-full flex flex-col justify-around items-center gap-8">
          <TableContainer component={Paper} className="w-full">
            <Table aria-label="simple table" style={{ maxWidth: "80%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell align="left">Product Id</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="right">Product Image</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.length &&
                  cart.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{count++}</TableCell>
                      <TableCell align="left">{p._id}</TableCell>
                      <TableCell align="left">{p.name}</TableCell>
                      <TableCell align="center" style={{ maxWidth: "12%" }}>
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          style={{ width: "100%", height: "50px" }}
                        />
                      </TableCell>
                      <TableCell align="right">{p.price}</TableCell>
                      <TableCell align="right">1</TableCell>
                      <TableCell align="right">₹{p.price}</TableCell>
                      <TableCell align="right">
                        <DeleteIcon
                          className="text-red-600 hover:scale-90"
                          onClick={() => handleDelete(p._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Totals:</TableCell>
                  <TableCell align="right">{cart.length}</TableCell>
                  <TableCell align="right">₹{totalCost}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" endIcon={<SendIcon />} className="m-10">
            Proceed for payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
