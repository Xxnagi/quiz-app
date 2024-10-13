import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

const Quiz = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [error, setError] = useState(null);

  // Fetch questions from the API or localStorage
  const fetchQuestions = async () => {
    const cachedQuestions = localStorage.getItem("quizQuestions");

    if (cachedQuestions) {
      setQuestions(JSON.parse(cachedQuestions));
    } else {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem("quizQuestions", JSON.stringify(data.results));
        setQuestions(data.results);
      } catch (error) {
        setError("Failed to fetch questions. Please try again later.");
        console.error("Error fetching questions:", error);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleRetry = () => {
    localStorage.removeItem("quizQuestions");
    setQuestions(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setCorrectAnswersCount(0);
    setIncorrectAnswersCount(0);
    setQuizFinished(false);
    fetchQuestions();
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!questions) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  // Function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const answerOptions = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  const handleSelectAnswer = (value) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.correct_answer,
      },
    ]);
    setSelectedAnswer(""); // Reset selected answer

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
      setQuizFinished(true);
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    answers.forEach((answer) => {
      if (answer.selectedAnswer === answer.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    if (selectedAnswer === currentQuestion.correct_answer) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    setCorrectAnswersCount(correctCount);
    setIncorrectAnswersCount(incorrectCount);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-fit min-w-[400px] flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-3xl">QUIZZY</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          {!quizFinished ? (
            <>
              {/* Display current question index and total questions */}
              <p className="mb-2">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              {/* Decode HTML entities in the question */}
              <p>{decodeHTML(currentQuestion.question)}</p>
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleSelectAnswer}
              >
                {answerOptions.map((answer, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`flex my-2 ${
                      selectedAnswer === answer
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleSelectAnswer(answer)}
                  >
                    <RadioGroupItem value={answer} id={`r${index}`} />
                    <p>{decodeHTML(answer)}</p> {/* Decode answer options */}
                  </Button>
                ))}
              </RadioGroup>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold">Quiz Finished!</h2>
              <p className="mt-4">Correct Answers: {correctAnswersCount}</p>
              <p>Incorrect Answers: {incorrectAnswersCount}</p>
              <p>Total Questions: {questions.length}</p>
              <p>
                Questions Answered:{" "}
                {correctAnswersCount + incorrectAnswersCount}
              </p>
              <Button className="mt-4" onClick={handleRetry}>
                Retry Quiz
              </Button>
            </div>
          )}
        </CardContent>

        {!quizFinished && (
          <div className="flex justify-between w-full px-4 pb-4">
            <Button onClick={handleNext} disabled={!selectedAnswer}>
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Quiz;
