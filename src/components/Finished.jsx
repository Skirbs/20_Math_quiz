import SettingButton from "./SettingButton";

import trophyImg from "../assets/trophy.svg";
import correctImg from "../assets/correct.svg";
import incorrectImg from "../assets/incorrect.svg";
import missedImg from "../assets/missed.svg";

export default function Finished() {
  return (
    <div className="finished-section">
      <Congratulation />
      <AnswerReports />
      <ReportList />
    </div>
  );
}

function Congratulation() {
  return (
    <div className="card congratulation-section">
      <h2>Congratulations!</h2>
      <p>You have successfully finished the quiz! </p>
      <button className="card redo">Redo Quiz</button> {/* Place this inside Answer Reports */}
      <SettingButton />
      <span>
        <img className="w-full" src={trophyImg} alt="trophy image" />
      </span>
    </div>
  );
}

function AnswerReports() {
  return (
    <div className="card answer-report">
      <h2>Answer Report</h2>
      <div className="data-div">
        <div className="card data-elem">
          <h3>Correct</h3>
          <p>15/20</p>
          <p>50%</p>
        </div>
        <div className="card data-elem">
          <h3>Correct</h3>
          <p>15/20</p>
          <p>50%</p>
        </div>
        <div className="card data-elem">
          <h3>Correct</h3>
          <p>15/20</p>
          <p>50%</p>
        </div>
      </div>
    </div>
  );
}

function ReportList() {
  return (
    <div className="report-list">
      <ReportElem answerState={"correct"} />
      <ReportElem answerState={"incorrect"} />
      <ReportElem answerState={"missed"} />
    </div>
  );
}

function ReportElem({answerState}) {
  let stateImg;

  switch (answerState) {
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
        <p>Question</p>
        <p>123+123</p>
      </div>
      <div className="card report-answer user-answer">
        <p>Your Answer</p>
        <p>1203</p>
      </div>
      <div className="card report-answer correct-answer">
        <p>Correct Answer</p>
        <p>1203</p>
      </div>
      <div className="card report-feedback">
        <img src={stateImg} alt="correct" />
      </div>
    </div>
  );
}
