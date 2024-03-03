import trophyImg from "../assets/trophy.svg";
import SettingButton from "./SettingButton";
export default function Finished() {
  return (
    <div className="finished-section">
      <Congratulation />
      <AnswerReports />
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

function ReportList() {}

function ReportElem() {}
