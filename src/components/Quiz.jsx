// ? This component objective is to ask the user math questions
// ? It then gives 4 choices. each are similar to eachother but only 1 is correct

import {useEffect, useRef} from "react";
import SettingButton from "./SettingButton";

// ? However each question have a time limit.

export default function Quiz() {
  const digitsPerTerm = useRef(parseInt(localStorage.getItem("digitsPerTerm")) || 2);
  const operation = useRef(localStorage.getItem("operation") || "mixed");

  return (
    <div className="card quiz-div">
      <Question digitsPerTerm={digitsPerTerm.current} operation={operation.current} />
      <AnswerDiv />
      <QuizHeader />
    </div>
  );
}

// * <- Main Components -> * //

function Question({digitsPerTerm, operation}) {
  const max = parseInt("9".repeat(digitsPerTerm));
  const min = 1 * 10 ** (digitsPerTerm - 1);

  let first_number = Math.floor(Math.random() * (max - min + 1) + min);
  let second_number = Math.floor(Math.random() * (max - min + 1) + min);

  let answer;

  if (operation === "mixed") {
    const operationList = ["+", "-", "x", "÷"];
    operation = operationList[Math.floor(Math.random() * operationList.length)];
  }

  switch (operation) {
    case "+":
      answer = first_number + second_number;
      break;
    case "-":
      answer = first_number - second_number;
      break;

    case "x":
      answer = first_number * second_number;
      break;

    case "÷":
      const multiplied_answer = first_number * second_number;
      const original_answer = multiplied_answer / second_number;
      first_number = multiplied_answer;
      answer = original_answer;
      break;
  }

  return (
    <div className="card question-display">
      <h2>
        {first_number} {operation} {second_number}
      </h2>
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
