import { Routes, Route, useNavigate } from "react-router-dom";

import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { Vote } from "./pages/Vote";
import { Results } from "./pages/Results";

function App() {
  const [voteOptions, setVoteOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Vote Title");
  const [modalMsg, setModalMsg] = useState("");
  const [time, setTime] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const milSecRef = useRef(60000);

  const navigate = useNavigate();

  function handleNavigate(path) {
    return navigate(path);
  }

  async function handleExpire(joinCode) {
    const response = await fetch(
      `http://localhost:4000/vote/expire/${joinCode}`
    );
    const result = await response.json();

    if (result.ok) {
      setModalMsg("Vote session expired!");
      setIsOpen(true);
    } else {
      setModalMsg("New error: " + result.error);
      setIsOpen(true);
    }
  }

  async function handleFetch(code) {
    try {
      if (code === "" || undefined)
        throw new Error("Empty input! Please enter a Join Code.");

      const response = await fetch(`http://localhost:4000/vote/${code}`);
      const result = await response.json();

      const time =
        new Date(result.time).getTime() +
        milSecRef.current -
        new Date().getTime();

      console.log(Cookies.get(code));

      if (result.ok && !Cookies.get(code) && time > 0) {
        setVoteOptions(result.options);
        setTitle(result.title);
        handleNavigate(`/vote/${result.joinCode}`);
      } else if (result.ok && Cookies.get(code) === "token" && time > 0) {
        setVoteOptions(result.options);
        setTitle(result.title);
        setTime(result.time);
        handleNavigate(`/results/${result.joinCode}`);
      } else if (result.ok && time <= 0) {
        handleExpire(result.joinCode);
      } else {
        setModalMsg(result.error);
        setIsOpen(true);
      }
    } catch (error) {
      setModalMsg(`New error: ${error.message}`);
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
              modalMsg={modalMsg}
              setModalMsg={setModalMsg}
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
              title={title}
              time={time}
              setTime={setTime}
              setModalMsg={setModalMsg}
              handleExpire={handleExpire}
              milSecRef={milSecRef}
            />
          }
        ></Route>
      </Routes>
    </main>
  );
}

export default App;
