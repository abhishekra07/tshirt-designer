import React from "react";
import { Routes, Route } from "react-router-dom";
import TShirtDesigner from "./components/TShirtDesigner";
import TShirtDesignerPro from "./components/TShirtDesignerPro";
import TShirtDesignerUI from "./components/TShirtDesignerUI";
import TShirtEditor from "./components/TShirtEditor";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TShirtDesigner />} />
      <Route path="/tshirt" element={<TShirtDesigner />} />
      <Route path="/tshirt-2" element={<TShirtDesignerUI />} />
      <Route path="/tshirt-3" element={<TShirtEditor />} />
      <Route path="/tshirt-4" element={<TShirtDesignerPro />} />
    </Routes>
  );
};

export default AppRouter;
