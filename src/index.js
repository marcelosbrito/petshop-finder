import React from "react";
import ReactDOM from "react-dom/client";
import Map from "./Components/Map";
import PetStore from "./Components/Petstore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Map />} />
        <Route path="/pet/:petId" exact element={<PetStore />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
