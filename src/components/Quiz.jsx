// ? This component objective is to ask the user math questions
// ? It then gives 4 choices. each are similar to eachother but only 1 is correct

import SettingButton from "./SettingButton";

// ? However each question have a time limit.
export default function Quiz() {
  return (
    <div className="card quiz-div">
      <Question />
      <AnswerDiv />
      <QuizHeader />
    </div>
  );
}

// * <- Main Components -> * //

function Question() {
  return (
    <div className="card question-display">
      <h2>999 + 999</h2>
      <SettingButton />
    </div>
  );
}

function AnswerDiv() {
  return (
    <div className="answer-div">
      <TimerProgress />
      <ChoicesList />
    </div>
  );
}

function TimerProgress() {
  return <progress value={20} max={40} />;
}

function ChoicesList() {
  return (
    <div className="choices">
      <ChoiceElem />
      <ChoiceElem />
      <ChoiceElem />
      <ChoiceElem />
    </div>
  );
}
function ChoiceElem() {
  return <button className="card choice-elem">a</button>;
}

// * <- Extra Components -> * //
function QuizHeader() {
  return <div className="card quiz-header">1</div>;
}
