// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import About from "./components/About";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route path="/streamlist" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
