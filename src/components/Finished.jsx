import SettingButton from "./SettingButton";

import trophyImg from "../assets/trophy.svg";
import correctImg from "../assets/correct.svg";
import incorrectImg from "../assets/incorrect.svg";
import missedImg from "../assets/missed.svg";
import {useRef} from "react";

export default function Finished({questionReport, onQuizRestart}) {
  const finishedRef = useRef();
  function quizRestartHandler() {
    finishedRef.current.classList.add("finished");
    setTimeout(() => {
      onQuizRestart();
    }, 600);
  }
  return (
    <div ref={finishedRef} className="finished-section">
      <Congratulation onQuizRestart={quizRestartHandler} />
      <AnswerReports questionReport={questionReport} />
      <ReportList questionReport={questionReport} />
    </div>
  );
}

function Congratulation({onQuizRestart}) {
  const redoRef = useRef();
  function redoClick() {
    redoRef.current.disabled = true;
    onQuizRestart();
  }
  return (
    <div className="card congratulation-section">
      <h2>Congratulations!</h2>
      <p>You have successfully finished the quiz! </p>
      <button className="card redo" onClick={redoClick} ref={redoRef}>
        Redo Quiz
      </button>{" "}
      {/* Place this inside Answer Reports */}
      <SettingButton />
      <span>
        <img className="w-full" src={trophyImg} alt="trophy image" />
      </span>
    </div>
  );
}

function AnswerReports({questionReport}) {
  const correctCount = questionReport.filter((elem) => elem.answerReport === "correct").length;
  const correctPercentage = Math.round((correctCount / questionReport.length) * 100);

  const incorrectCount = questionReport.filter((elem) => elem.answerReport === "incorrect").length;
  const incorrectPercentage = Math.round((incorrectCount / questionReport.length) * 100);

  const missedCount = questionReport.length - (correctCount + incorrectCount);
  const missedPercentage = 100 - (correctPercentage + incorrectPercentage);

  return (
    <div className="card answer-report">
      <h2>Answer Report</h2>
      <div className="data-div">
        <div className="card data-elem">
          <h3>Correct</h3>
          <p>
            {correctCount}/{questionReport.length}
          </p>
          <p>{correctPercentage}%</p>
        </div>
        <div className="card data-elem">
          <h3>Incorrect</h3>
          <p>
            {incorrectCount}/{questionReport.length}
          </p>
          <p>{incorrectPercentage}%</p>
        </div>
        <div className="card data-elem">
          <h3>Missed</h3>
          <p>
            {missedCount}/{questionReport.length}
          </p>
          <p>{missedPercentage}%</p>
        </div>
      </div>
    </div>
  );
}

function ReportList({questionReport}) {
  return (
    <div className="report-list">
      {questionReport.map((elem, i) => (
        <ReportElem report={elem} key={i} index={i + 1} />
      ))}
    </div>
  );
}

function ReportElem({report, index}) {
  let stateImg;

  switch (report.answerReport) {
    case "correct":
      stateImg = correctImg;
      break;
    case "incorrect":
      stateImg = incorrectImg;
      break;
    case "missed":
      stateImg = missedImg;
      break;
    default:
      console.error("Answer State Does Not Exist");
      break;
  }

  return (
    <div className="card report-elem">
      <div className="card report-question">
        <p className="absolute top-1 left-4">
          <span className="font-bold">Q</span>. {index}
        </p>
        <p>Question</p>
        <p>{report.question}</p>
      </div>
      <div className="card report-answer user-answer">
        <p>Your Answer</p>
        <p>{isNaN(report.userAnswer) ? "N/A" : report.userAnswer}</p>
      </div>
      <div className="card report-answer correct-answer">
        <p>Correct Answer</p>
        <p>{report.correctAnswer}</p>
      </div>
      <div className="card report-feedback">
        <img src={stateImg} alt="correct" />
      </div>
    </div>
  );
}
