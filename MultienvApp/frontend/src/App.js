import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dev" element={<Tickets env="dev" />} />
        <Route path="/prod" element={<Tickets env="prod" />} />
      </Routes>
    </Router>
  );
}

export default App;
