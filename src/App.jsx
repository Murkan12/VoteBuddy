import { Routes, Route } from "react-router-dom";

import { useState } from "react";

import { Header } from "./components/Header";
import { Home } from "./components/Home";

function App() {
  return (
    <main className="h-screen w-screen bg-slate-500">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
