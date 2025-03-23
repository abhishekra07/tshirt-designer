import React from "react";
import Navbar from "./components/Navbar";
import TShirtDesigner from "./components/TShirtDesigner";
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
