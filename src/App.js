import "./App.css";
import Header from "./components/Header";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Search from "./pages/Search";

import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import LoginSignup from "./pages/LoginSignup";
import UserProfile from "./pages/UserProfile";
import { useEffect } from "react";
import store from "./store";
import { userLoad } from "./actions/userActions";

function App() {
  useEffect(() => {
    store.dispatch(userLoad());
  });
  return (
    <div className="relative scrollbar-hide font-f flex flex-col justify-start items-center gap-10">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search/product/:id" element={<ProductDetails />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
