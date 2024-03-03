import trophyImg from "../assets/trophy.svg";
import SettingButton from "./SettingButton";
export default function Finished() {
  return (
    <div className="w-full finished-section">
      <Congratulation />
    </div>
  );
}

function Congratulation() {
  return (
    <div className="card congratulation-section">
      <h2>Congratulations!</h2>
      <p>You have successfully finished the quiz! </p>
      <button className="card redo">Redo Quiz</button>
      <SettingButton />
      <span>
        <img className="w-full" src={trophyImg} alt="trophy image" />
      </span>
    </div>
  );
}

function AnswerReports() {}

function ReportList() {}

function ReportElem() {}
