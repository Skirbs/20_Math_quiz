import {useState, useRef} from "react";
import Finished from "./components/Finished";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

const MAXQUESTIONS = 20;

function App() {
  const [displayState, setDisplayState] = useState("quiz"); // State Can Either Be "quiz" Or "finished"
  const questionReport = useRef([]);
  function quizFinishedHandler(questionAnswers) {
    questionReport.current = questionAnswers;
    setDisplayState("finished");
  }
  function quizRestartHandler() {
    setDisplayState("quiz");
  }

  return (
    <div className="flex flex-col justify-start min-h-screen">
      <main>
        <Header />
        {displayState === "quiz" && (
          <Quiz onQuizFinish={quizFinishedHandler} maxQuestions={MAXQUESTIONS} />
        )}
        {displayState === "finished" && (
          <Finished questionReport={questionReport.current} onQuizRestart={quizRestartHandler} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
