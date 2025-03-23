import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
