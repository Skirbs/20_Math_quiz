import {useState} from "react";
import Finished from "./components/Finished";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  const [displayState, setDisplayState] = useState("quiz"); // State Can Either Be "quiz" Or "finished"

  function quizFinishedHandler(questionAnswers) {
    setDisplayState("finished");
  }

  return (
    <div className="flex flex-col justify-start min-h-screen">
      <main>
        <Header />
        {displayState === "quiz" && <Quiz onQuizFinish={quizFinishedHandler} />}
        {displayState === "finished" && <Finished />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
