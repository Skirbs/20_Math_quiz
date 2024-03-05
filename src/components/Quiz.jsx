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

  // if the operation is mixed (because of the settings)
  // it will randomly choose an operation and use that for the question
  if (operation === "mixed") {
    const operationList = ["+", "-", "x", "÷"];
    operation = operationList[Math.floor(Math.random() * operationList.length)];
  }

  // get the answer based on the question format
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
      first_number = multiplied_answer; // for display purposes
      answer = original_answer;
      break;
  }

  return (
    <>
      <div className="card question-display">
        <h2>
          {first_number} {operation} {second_number}
        </h2>
        <SettingButton />
      </div>

      <AnswerDiv correctAnswer={answer} />
    </>
  );
}

function AnswerDiv({correctAnswer}) {
  return (
    <div className="answer-div">
      <TimerProgress />
      <ChoicesList correctAnswer={correctAnswer} />
    </div>
  );
}

function TimerProgress() {
  return <progress value={20} max={40} />;
}

function ChoicesList({correctAnswer}) {
  let answerOptions = [correctAnswer]; // These are the options that will be display. incorrect ones will soon be added

  // this for loop generates 3 altered answers
  for (let i = 0; i < 3; i++) {
    let alteredAnswer;

    // The while loop makes sure that and option cannot be repeated again
    while (true) {
      // if the digits of the correct answer is less than 4 (inc. 1000) then the gap between the options will be -10 to 10
      if (Math.abs(correctAnswer) <= 1000) {
        alteredAnswer = correctAnswer + Math.floor(Math.random() * (10 + 9) - 10);
      }

      // if the digits of the correct answer is higher than 4 (excl. 1000) then the gap between the options will be -10*[answerDigitsCount - 2] to 10*[answerDigitsCount - 2]
      else {
        const answerDigitsCount = correctAnswer.toString().length;
        const alterDifference = 10 ** (answerDigitsCount - 2);
        alteredAnswer =
          correctAnswer +
          Math.floor(Math.random() * (alterDifference + alterDifference - 1) - alterDifference);
      }

      // this stops the break if the altered answer does not exist.
      if (!answerOptions.includes(alteredAnswer)) {
        break;
      }
    }
    answerOptions.push(alteredAnswer);
  }
  answerOptions.sort(() => Math.random() - 0.5); // randomly shuffle the options

  return (
    <div className="choices">
      {answerOptions.map((value, i) => {
        return <ChoiceElem key={i} value={value} />;
      })}
    </div>
  );
}
function ChoiceElem({value}) {
  return <button className="card choice-elem">{value}</button>;
}

// * <- Extra Components -> * //
function QuizHeader() {
  return <div className="card quiz-header">1</div>;
}
