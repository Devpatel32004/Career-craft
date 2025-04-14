import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

const QuizResult = ({
  result,
  hideStartNew = false,
  onStartNew,
}) => {
  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Result
      </h1>

      <CardContent className="space-y-6">
        <div className="text-center space-y-3">
          <h2 className="font-bold text-2xl">{result.quizScore.toFixed(1)}%</h2>
          <Progress value={result?.quizScore} className="w-full" />
        </div>
        {result.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <div className="font-medium">improvement Tip:</div>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}
        <div className="space-y-4">
          <h3 className="md:text-2xl font-semibold">Question Review</h3>

          {result.questions.map((q, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
               <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Your Answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct Answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-muted p-2 rounded">
                <div className="font-medium">Explanation:</div>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {!hideStartNew && (
        <CardFooter className="mt-5">
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
};

export default QuizResult;
