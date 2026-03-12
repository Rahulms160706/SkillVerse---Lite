import { useEffect, useState } from "react";
import questions from "./Data.js";
import Display from "./Display.jsx";
import Numbers from "./Numbers.jsx";
import Results from "./Results.jsx";

function Quiz() {
  const Time = 600;

  const [quiz, setQuiz] = useState("home");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeleft, setTimeLeft] = useState(Time);

  function start() {
    setQuiz("begin");
  }
  useEffect(() => {
    if(quiz === "end" || quiz == "home") return;

    const id = setInterval(() => {
      setTimeLeft(prevTime => {
        if(prevTime <= 1){
          clearInterval(id);
          setQuiz("end");
          return 0;
        }
        return prevTime - 1
      })
    }, 1000);
    return () => clearInterval(id);
  }, [quiz]);

  const min = Math.floor(timeleft / 60);
  const sec = timeleft % 60;

  function increment() {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
    }
  }
  function decrement() {
    if (index > 0) {
      setIndex(i => i - 1);
    }
  }
  function saveAnswer(optionKey) {
    setAnswers(prev => ({
      ...prev,
      [index]: optionKey
    }));
  }
  function end(){
    setQuiz("end");
  }
  function reset(){
    setAnswers({});
    setQuiz("home");
    setTimeLeft(Time);
    setIndex(0);
  }

  return (
    <>
      {quiz === "home" && (
        <div className="quiz-home-container">
          <h2>React Fundamentals Quiz</h2>
          <p>10 Questions</p>
          <p>10 Minutes</p>
          <button onClick={start}>Start the test</button>
        </div>
      )}

      {quiz === "begin" && (
        <>
        <div className="container">
          <div>
            <h3>
              ⏳ {min.toString().padStart(2,"0")}:{sec.toString().padStart(2,"0")} remaining
            </h3>
            <h3>Question {index+1} </h3>
          </div>
          <div className="quiz-page">
            <div className="question-container">
              <div className="questions">
                <Display
                  ques={questions[index]}
                  selected={answers[index] || null}
                  onSelect={saveAnswer}
                />
              </div>
              <div className="buttons">
                <button className="p" onClick={decrement}>Prev</button>
                <button className="n" onClick={increment}>Next</button>
              </div>
            </div>

            <div className="number-container">
              <Numbers 
                goto={setIndex}
                answers={answers}
                current={index}
              />
              <button onClick={end}>Submit</button>
            </div>
          </div>
        </div>
        </>
      )}

      {quiz === "end" && (
        <>
        <div>
          <Results ans={answers}/>
          <button onClick={reset}>Retry</button>
        </div>
        </>
      )}
    </>
  );
}

export default Quiz;
