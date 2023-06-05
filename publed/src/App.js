import React, { Suspense, lazy } from "react";
import "./assets/App.css";
import { Link, Route, Router, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";

const Home = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/AboutPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

export default App;
