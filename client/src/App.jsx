import { Routes, Route, useNavigate } from "react-router-dom";

import { useState } from "react";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { Vote } from "./pages/Vote";
import { Results } from "./pages/Results";

function App() {
  const [voteOptions, setVoteOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Vote title");
  const [percentages, setPercentages] = useState([]);
  const [modalMsg, setModalMsg] = useState("");
  const [expireTime, setExpireTime] = useState("");

  const navigate = useNavigate();

  function handleNavigate(path) {
    return navigate(path);
  }

  async function handleFetch(code) {
    try {
      const response = await fetch(`http://localhost:3000/vote/${code}`);
      const result = await response.json();
      const isValid = sessionStorage.getItem(`${code}`) || true;

      if (result.ok && isValid !== "voteCast") {
        setVoteOptions(result.options);
        setPercentages(result.percentages);
        setTitle(result.title);
        handleNavigate(`/vote/${result.joinCode}`);
      } else if (result.ok && isValid === "voteCast") {
        setVoteOptions(result.options);
        setTitle(result.title);
        setPercentages(result.percentages);
        setExpireTime(result.expireTime);
        handleNavigate(`/results/${result.joinCode}`);
      } else {
        setModalMsg("Vote not found!");
        setIsOpen(true);
      }
    } catch (error) {
      setModalMsg(`Server error: ${error.message}`);
      setIsOpen(true);
    }
  }

  return (
    <main>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              modalMsg={modalMsg}
              setModalMsg={setModalMsg}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleFetch={handleFetch}
              handleNavigate={handleNavigate}
            />
          }
        />
        <Route
          path="create"
          element={
            <Create
              title={title}
              setTitle={setTitle}
              handleNavigate={handleNavigate}
              modalMsg={modalMsg}
              setModalMsg={setModalMsg}
              setExpireTime={setExpireTime}
              expireTime={expireTime}
            />
          }
        />
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
              title={title}
            />
          }
        />
        <Route
          path="results/:joinCode"
          element={
            <Results
              modalMsg={modalMsg}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              voteOptions={voteOptions}
              handleNavigate={handleNavigate}
              setVoteOptions={setVoteOptions}
              handleFetch={handleFetch}
              percentages={percentages}
              title={title}
              expireTime={expireTime}
              setExpireTime={setExpireTime}
            />
          }
        ></Route>
      </Routes>
    </main>
  );
}

export default App;
