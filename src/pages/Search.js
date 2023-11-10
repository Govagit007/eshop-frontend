import React, { useState, useEffect } from "react";
import Products from "../components/Products";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/productActions";

const Search = () => {
  const { products, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [originalProducts, setOriginalProducts] = useState(products);
  const [range, setRange] = useState(10000);
  const [input, setInput] = useState("");

  const handleRange = (e) => {
    const rng = e.target.value;
    setRange(rng);

    const newProducts = products.filter((p) => p.price <= rng);
    setOriginalProducts(newProducts);
    setInput(""); // Reset search
  };

  const handleCategory = (e) => {
    const category = e.target.value;

    if (category === "") {
      setOriginalProducts(products);
    } else {
      const newProducts = products.filter((p) => p.category === category);
      setOriginalProducts(newProducts);
    }
    setInput(""); // Reset search
  };

  const sortProducts = (type) => {
    const sortedProducts = [...originalProducts];

    switch (type) {
      case "1":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "9":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "A":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setOriginalProducts(sortedProducts);
  };

  const handleFilter = (e) => {
    const filter = e.target.value;

    if (filter === "all") {
      setOriginalProducts(products);
    } else {
      sortProducts(filter);
    }
    setInput(""); // Reset search
  };

  const handleSearch = (e) => {
    const search = e.target.value;

    setInput(search);

    const newArr = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    setOriginalProducts(newArr);
    setRange(10000); // Reset range
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setOriginalProducts(products);
  }, [products]);

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="flex gap-4 mx-20 w-full h-20 justify-center items-center m-8">
        <div className="w-1/6">
          <FormControl fullWidth>
            <InputLabel id="label">Category</InputLabel>
            <Select
              labelId="label"
              id="demo-simple-select"
              label="Type"
              onChange={handleCategory}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="smartphones">Smartphones</MenuItem>
              <MenuItem value="laptops">Laptop</MenuItem>
              <MenuItem value="groceries">Groceries</MenuItem>
              <MenuItem value="fragrances">Fragrances</MenuItem>
              <MenuItem value="skincare">Skincare</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-2/6">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            className="w-full p-1 rounded-md font-f"
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center  w-1/6 h-auto md:gap-4">
          <FormControl fullWidth>
            <InputLabel
              id="filter-label"
              className="absolute flex justify-center items-center"
            >
              Filter
            </InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              label="Type"
              onChange={handleFilter}
              className="w-full h-10"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="A">A-Z</MenuItem>
              <MenuItem value="Z">Z-A</MenuItem>
              <MenuItem value="1">Price: Low to High</MenuItem>
              <MenuItem value="9">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
          <div className=" flex flex-col justify-center w-full h-2/5 md:1/2 items-center">
            <input
              type="range"
              min={10}
              max={10000}
              value={range}
              onChange={(e) => handleRange(e)}
              className="w-full h-full"
            />
            <label className="">{range}</label>
          </div>
        </div>
      </div>
      <div className="w-full h-full min-h-1/2 flex flex-col justify-center items-center">
        {input && originalProducts.length > 0 && (
          <p className="text-sm text-slate-500">
            results related to "
            <span className="text-lg text-slate-600">{input}</span>"
          </p>
        )}

        {error && <div>{error}</div>}

        {originalProducts.length === 0 ? (
          <div className="w-full h-80 flex justify-center items-center text-4xl text-slate-300">
            No products found
          </div>
        ) : (
          <Products products={originalProducts} />
        )}
      </div>
    </div>
  );
};

export default Search;
