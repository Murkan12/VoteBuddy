import { Routes, Route, useNavigate } from "react-router-dom";

import { useState } from "react";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { Vote } from "./pages/Vote";

function App() {
  const [voteOptions, setVoteOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleNavigate(path) {
    return navigate(path);
  }

  async function handleFetch(code) {
    const response = await fetch(`http://localhost:3000/vote/${code}`);
    const result = await response.json();
    console.log(result);

    if (result.ok) {
      setVoteOptions(result.options);
      handleNavigate(`/vote/${result.joinCode}`);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <main className="h-screen w-screen bg-slate-500">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              voteOptions={voteOptions}
              setVoteOptions={setVoteOptions}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleFetch={handleFetch}
              handleNavigate={handleNavigate}
            />
          }
        />
        <Route path="create" element={<Create />} />
        <Route
          path="vote/:joinCode"
          element={
            <Vote
              voteOptions={voteOptions}
              setVoteOptions={setVoteOptions}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleFetch={handleFetch}
              handleNavigate={handleNavigate}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
