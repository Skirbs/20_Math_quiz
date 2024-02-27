// ? This component objective is to ask the user math questions
// ? It then gives 4 choices. each are similar to eachother but only 1 is correct
// ? However each question have a time limit.
export default function Quiz() {
  return <div className="card"></div>;
}

// * <- Main Components -> * //

function Question() {
  return <div className="card"></div>;
}

function TimerProgress() {
  return <progress />;
}

function ChoicesLIst() {
  return <div></div>;
}

function ChoiceElem() {
  return <button></button>;
}

// * <- Extra Components -> * //
function QuizHeader() {
  return <div className="card"></div>;
}

function SettingButton() {
  return <button></button>;
}
