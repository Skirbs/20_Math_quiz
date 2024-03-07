// ? This component objective is to ask the user math questions
// ? It then gives 4 choices. each are similar to eachother but only 1 is correct
// ? However each question have a time limit.

import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import SettingButton from "./SettingButton";

const quizContext = createContext({
  answerHandler: () => {},
  setQuestionIndex: () => {},
  setCurrentQuestion: () => {},
});

export default function Quiz() {
  const digitsPerTerm = useRef(parseInt(localStorage.getItem("digitsPerTerm")) || 2);
  const operation = useRef(localStorage.getItem("operation") || "mixed");
  const duration = useRef(parseInt(localStorage.getItem("quizDuration")) || 10000);

  const [questionIndex, setQuestionIndex] = useState(1);
  const questionAnswers = useRef([]);

  // answerState can be the following: answering, pause, reveal
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    correctAnswer: 0,
    answerState: "answering",
  });

  const setCurrentQuestionHandler = useCallback(
    (question, correctAnswer, answerState) => {
      setCurrentQuestion({question, correctAnswer, answerState});
    },
    [setCurrentQuestion]
  );

  function answerHandler(userAnswer) {
    const questionAnswer = {...currentQuestion, userAnswer};
    questionAnswers.current.unshift(questionAnswer);
    setQuestionIndex((prev) => prev + 1); // ! TEMPORARY
  }

  const quizCtxValue = {
    duration,
    answerHandler,
    questionIndex,
    setQuestionIndex,
    setCurrentQuestionHandler,
    currentQuestion,
  };

  return (
    <quizContext.Provider value={quizCtxValue}>
      <div className="card quiz-div">
        <Question digitsPerTerm={digitsPerTerm.current} operation={operation.current} />
        <QuizHeader questionIndex={questionIndex} />
      </div>
    </quizContext.Provider>
  );
}

// * <- Main Components -> * //

function Question({digitsPerTerm, operation}) {
  const quizCtx = useContext(quizContext);

  const max = parseInt("9".repeat(digitsPerTerm));
  const min = 1 * 10 ** (digitsPerTerm - 1);

  let first_number = Math.floor(Math.random() * (max - min + 1) + min);
  let second_number = Math.floor(Math.random() * (max - min + 1) + min);

  let correctAnswer;

  // if the operation is mixed (because of the settings)
  // it will randomly choose an operation and use that for the question
  if (operation === "mixed") {
    const operationList = ["+", "-", "x", "÷"];
    operation = operationList[Math.floor(Math.random() * operationList.length)];
  }

  // get the answer based on the question format
  switch (operation) {
    case "+":
      correctAnswer = first_number + second_number;
      break;
    case "-":
      correctAnswer = first_number - second_number;
      break;
    case "x":
      correctAnswer = first_number * second_number;
      break;
    case "÷":
      const multiplied_answer = first_number * second_number;
      const original_answer = multiplied_answer / second_number;
      first_number = multiplied_answer; // for display purposes
      correctAnswer = original_answer;
      break;
  }

  const questionFormat = `${first_number} ${operation} ${second_number}`;
  function onAnswer(userAnswer) {
    quizCtx.answerHandler(correctAnswer);
  }

  useEffect(() => {
    quizCtx.setCurrentQuestionHandler(questionFormat, correctAnswer, "answering");
  }, [quizCtx.setCurrentQuestionHandler]);

  return (
    <>
      <div className="card question-display">
        <h2>{questionFormat}</h2>
        <SettingButton />
      </div>

      <AnswerDiv correctAnswer={correctAnswer} onAnswer={onAnswer} />
    </>
  );
}

function AnswerDiv({correctAnswer, onAnswer}) {
  const quizCtx = useContext(quizContext);

  let timerDuration = quizCtx.duration.current;

  if (quizCtx.currentQuestion.answerState === "pause") {
    timerDuration = 1000;
  } else if (quizCtx.currentQuestion.answerState === "reveal") {
    timerDuration = 2000;
  }
  return (
    <div className="answer-div">
      <TimerProgress duration={timerDuration} key={quizCtx.questionIndex} />
      <ChoicesList correctAnswer={correctAnswer} onAnswer={onAnswer} />
    </div>
  );
}

function TimerProgress({duration}) {
  const quizCtx = useContext(quizContext);
  const [timerValue, setTimerValue] = useState(duration);
  useEffect(() => {
    console.log(quizCtx.currentQuestion);
    const timeout = setTimeout(() => {
      quizCtx.answerHandler(NaN);
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, quizCtx.currentQuestion]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerValue((prev) => prev - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [setTimerValue]);
  return <progress value={timerValue} max={duration} />;
}

function ChoicesList({correctAnswer, onAnswer}) {
  let answerOptions = [correctAnswer]; // These are the options that will be display. incorrect ones will soon be added

  function answerHandler(userAnswer) {
    onAnswer(userAnswer);
  }
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
        return (
          <ChoiceElem
            onClick={() => {
              answerHandler(value);
            }}
            key={i}
            value={value}
          />
        );
      })}
    </div>
  );
}
function ChoiceElem({value, onClick}) {
  return (
    <button className="card choice-elem" onClick={onClick}>
      {value}
    </button>
  );
}

// * <- Extra Components -> * //
function QuizHeader({questionIndex}) {
  return <div className="card quiz-header">{questionIndex}</div>;
}
