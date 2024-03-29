// ? This component objective is to ask the user math questions
// ? It then gives 4 choices. each are similar to eachother but only 1 is correct
// ? However each question have a time limit.

// Time Variables in Milliseconds
const ANSWERPAUSEDELAY = 400;
const ANSWERREVEALDELAY = 1000;

import {createContext, useContext, useEffect, useRef, useState} from "react";
import SettingButton from "./SettingButton";

const quizContext = createContext({
  duration: 0,
  answerHandler: () => {},
  setQuestionIndex: () => {},
  questionIndex: 0,
  setCurrentQuestion: () => {},
  currentQuestion: undefined, // state
});

function generateMathProblem(digitsPerTerm, operation) {
  const max = parseInt("9".repeat(digitsPerTerm));
  const min = 1 * 10 ** (digitsPerTerm - 1);

  let firstNumber = Math.floor(Math.random() * (max - min + 1) + min);
  let secondNumber = Math.floor(Math.random() * (max - min + 1) + min);

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
      correctAnswer = firstNumber + secondNumber;
      break;
    case "-":
      correctAnswer = firstNumber - secondNumber;
      break;
    case "x":
      correctAnswer = firstNumber * secondNumber;
      break;
    case "÷":
      const multiplied_answer = firstNumber * secondNumber;
      const original_answer = multiplied_answer / secondNumber;
      firstNumber = multiplied_answer; // for display purposes
      correctAnswer = original_answer;
      break;
  }
  const questionFormat = `${firstNumber} ${operation} ${secondNumber}`;

  return {
    question: questionFormat,
    correctAnswer: correctAnswer,
    answerState: "answering",
  };
}

export default function Quiz({onQuizFinish, maxQuestions}) {
  const digitsPerTerm = useRef(parseInt(localStorage.getItem("digitsPerTerm")) || 2);
  const operation = useRef(localStorage.getItem("operation") || "+");
  const enabledTimer = useRef(localStorage.getItem("enabledTimer") || "true");
  const duration = useRef(parseInt(localStorage.getItem("quizDuration")) || 10000);

  const [questionAnswers, setQuestionAnswers] = useState([]);
  const questionIndex = questionAnswers.length + 1;

  // answerState can be the following: answering, pause, reveal
  const [currentQuestion, setCurrentQuestion] = useState({
    ...generateMathProblem(digitsPerTerm.current, operation.current),
    userAnswer: 0,
    // "missed" by default but it can also be "correct" / "incorrect" depending on the answer. used for displaying answer reports
    answerReport: "missed",
  });

  // if it has reached the maximum amount of question
  useEffect(() => {
    if (questionAnswers.length === maxQuestions) {
      onQuizFinish(questionAnswers);
      return;
    }
  });

  function answerHandler(userAnswer) {
    let answerReport;
    if (isNaN(userAnswer)) {
      answerReport = "missed";
    } else {
      answerReport = userAnswer === currentQuestion.correctAnswer ? "correct" : "incorrect";
    }
    const questionAnswer = {
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correctAnswer,
      userAnswer,
      answerReport,
    };
    setQuestionAnswers((prev) => [...prev, questionAnswer]);
    setCurrentQuestion((prev) => {
      return {...prev, ...generateMathProblem(digitsPerTerm.current, operation.current)};
    });
  }

  const quizCtxValue = {
    enabledTimer,
    duration,
    answerHandler,
    questionIndex,
    setCurrentQuestion,
    currentQuestion,
  };

  return (
    <quizContext.Provider value={quizCtxValue}>
      <div className="card quiz-div">
        <Question
          digitsPerTerm={digitsPerTerm.current}
          operation={operation.current}
          key={questionIndex}
        />
        <QuizHeader questionIndex={questionIndex} />
      </div>
    </quizContext.Provider>
  );
}

// * <- Main Components -> * //

function Question({}) {
  const quizCtx = useContext(quizContext);

  return (
    <>
      <div className="card question-display">
        <h2>{quizCtx.currentQuestion.question}</h2>
        <SettingButton />
      </div>

      <AnswerDiv />
    </>
  );
}

function AnswerDiv() {
  const quizCtx = useContext(quizContext);

  let timerDuration = quizCtx.duration.current;
  if (quizCtx.currentQuestion.answerState === "pause") {
    timerDuration = ANSWERPAUSEDELAY;
  } else if (quizCtx.currentQuestion.answerState === "reveal") {
    timerDuration = ANSWERREVEALDELAY;
  }

  return (
    <div className="answer-div">
      <TimerProgress duration={timerDuration} key={quizCtx.currentQuestion} />
      <ChoicesList />
    </div>
  );
}

function TimerProgress({duration}) {
  const quizCtx = useContext(quizContext);
  const timesUp = useRef(false);
  const [timerValue, setTimerValue] = useState(duration);
  if (quizCtx.enabledTimer.current === "false") return;

  useEffect(() => {
    if (timerValue <= 0 && timesUp.current) {
      if (quizCtx.currentQuestion.answerState === "answering") {
        quizCtx.answerHandler(NaN);
      }
      timesUp.current = false;
      return;
    }
  });

  useEffect(() => {
    setTimerValue(duration);

    const timeout = setTimeout(() => {
      timesUp.current = true;
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, quizCtx.currentQuestion.answer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerValue((prev) => prev - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [setTimerValue]);

  return (
    <progress
      value={timerValue}
      className={`timer-${quizCtx.currentQuestion.answerState}`}
      max={duration}
    />
  );
}

function ChoicesList({}) {
  const quizCtx = useContext(quizContext);

  let [answerOptions, setAnswerOptions] = useState([]); // These are the options that will be display. incorrect ones will soon be added

  function answerHandler(userAnswer) {
    quizCtx.setCurrentQuestion((prev) => {
      return {...prev, answerState: "pause", userAnswer};
    });

    setTimeout(() => {
      quizCtx.setCurrentQuestion((prev) => {
        return {...prev, answerState: "reveal"};
      });
      setTimeout(() => {
        quizCtx.setCurrentQuestion((prev) => {
          return {...prev, answerState: "answering"};
        });
        quizCtx.answerHandler(userAnswer);
      }, ANSWERREVEALDELAY);
    }, ANSWERPAUSEDELAY);
  }

  useEffect(() => {
    if (quizCtx.currentQuestion.answerState != "answering") return;

    const correctAnswer = quizCtx.currentQuestion.correctAnswer;
    setAnswerOptions((prev) => [correctAnswer]);

    const newOptions = [correctAnswer]; // Adds the correct option first
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
        if (!newOptions.includes(alteredAnswer)) {
          break;
        }
      }
      newOptions.push(alteredAnswer);
    }
    setAnswerOptions(newOptions.sort(() => Math.random() - 0.5));
  }, [setAnswerOptions, quizCtx.currentQuestion]);

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
  const quizCtx = useContext(quizContext);
  const currentQuestion = quizCtx.currentQuestion;
  let choiceClass;

  let buttonDisabled = currentQuestion.answerState != "answering";
  if (quizCtx.currentQuestion.answerState === "pause") {
    choiceClass = "paused";
  }
  if (currentQuestion.answerState === "reveal") {
    if (value === currentQuestion.correctAnswer) {
      choiceClass = "correct";
    } else if (value === currentQuestion.userAnswer) {
      choiceClass = "incorrect";
    }
  }

  return (
    <button
      className={`card choice-elem ${choiceClass}`}
      onClick={onClick}
      disabled={buttonDisabled}>
      {value}
    </button>
  );
}

// * <- Extra Components -> * //
function QuizHeader({questionIndex}) {
  return <div className="card quiz-header">{questionIndex}</div>;
}
