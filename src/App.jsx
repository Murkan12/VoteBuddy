import { Routes, Route } from "react-router-dom";

import { useState } from "react";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Create } from "./components/Create";

function App() {
  return (
    <main className="h-screen w-screen bg-slate-500">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </main>
  );
}

export default App;
