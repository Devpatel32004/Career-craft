"use client";

import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { BarLoader } from "react-spinners";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QuizResult from "./quiz-result";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  console.log(resultData);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    if (!quizData) {
      toast.error("Quiz data is not available.");
      return;
    }
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to save quiz results");
      } else {
        toast.error("Failed to save quiz results");
      }
    }
  };

  const handleNext = () => {
    if (!quizData) return;
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };
  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResultData(null);
    setShowExplanation(false);
    generateQuizFn();
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle className="leading-6">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            className="w-full hover:cursor-pointer"
            onClick={generateQuizFn}
          >
            {savingResult && (
              <BarLoader className="mt-4" width={"100%"} color="gray" />
            )}
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2 bg-transparent">
    <CardHeader>
      <CardTitle>
        Question {currentQuestion + 1} of {quizData.length}
      </CardTitle>
    </CardHeader>
    
    <CardContent className="space-y-4 px-4 sm:px-6">
      <p className="text-lg sm:text-xl font-medium mb-7">{question.question}</p>
      
      <RadioGroup
        onValueChange={handleAnswer}
        value={answers[currentQuestion] || undefined}
        className="space-y-2" // Increased spacing between options
      >
        {question.options.map((option, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-4 p-2 hover:bg-muted/50 rounded-lg transition-colors" // Added padding and hover effect
          >
            <RadioGroupItem 
              value={option} 
              id={`option-${index}`} 
              className="h-5 w-5" 
            />
            <Label 
              htmlFor={`option-${index}`} 
              className="text-base sm:text-md cursor-pointer flex-1"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
  
      {showExplanation && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="font-medium text-lg">Explanation:</p>
          <p className="text-muted-foreground mt-2">{question.explanation}</p>
        </div>
      )}
    </CardContent>
    
    <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 px-4 sm:px-6 py-4">
      {!showExplanation && (
        <Button
          onClick={() => setShowExplanation(true)}
          variant="outline"
          disabled={!answers[currentQuestion]}
          className="w-full sm:w-fit text-sm sm:text-base py-3 px-4 sm:px-6" // Full width on mobile
        >
          Show Explanation
        </Button>
      )}
      <Button
        onClick={handleNext}
        disabled={Boolean(!answers[currentQuestion] || savingResult)}
        className={`w-full sm:w-fit text-sm sm:text-base cursor-pointer py-3 px-4 sm:px-6 ${
          showExplanation ? 'sm:ml-auto' : ''
        }`} // Full width on mobile
      >
        {savingResult ? (
          <BarLoader className="w-full" color="hsl(var(--primary))" />
        ) : (
          currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"
        )}
      </Button>
    </CardFooter>
  </Card>
  );
};

export default Quiz;
