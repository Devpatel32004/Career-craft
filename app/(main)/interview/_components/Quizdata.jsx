"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { format } from "date-fns";
import { useState } from "react";
import QuizResult from "./quiz-result";
import { useRouter } from "next/navigation";

const Quizdata = ({ assessments }) => {
  const router = useRouter();
  const [selectedQuiz, setselectedQuiz] = useState(null);

  const mapAssessmentToResult = (assessment) => {
    return {
      quizScore: assessment.quizScore,
      improvementTip: assessment.improvementTip ?? "No tip provided",
      questions: assessment.questions.map((q) => ({
        question: q.question,
        isCorrect: q.isCorrect,
        answer: q.answer,
        userAnswer: q.userAnswer,
        explanation: q.explanation ?? "", // fallback for safety
      })),
    };
  };

  return (
    <>
      <Card className="bg-transparent">
        <CardHeader className="flex md:flex-row flex-col items-start space-y-3 md:space-y-0 md:items-center justify-between">
          <div>
            <CardTitle className="gradient-title text-3xl md;text-4xl">
              Recent Quizes
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Review your past quiz performance
            </CardDescription>
          </div>
          <Button
            size="lg"
            className="hover:cursor-pointer"
            onClick={() => router.push("/interview/mock")}
          >
            Start New Quiz
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {assessments.map((assessment, index) => (
              <Card
                onClick={() => setselectedQuiz(assessment)}
                className="bg-transparent cursor-pointer hover:bg-muted/50 transition-colors"
                key={index}
              >
                <CardHeader>
                  <div className="flex md:flex-row flex-col items-start space-y-3 md:space-y-0 md:items-center justify-between">
                    <div>
                      <CardTitle className="font-semibold text-xl gradient-title">
                        Quiz {index + 1}
                      </CardTitle>
                      <CardDescription>
                        Score {assessment?.quizScore.toFixed(1)}%
                      </CardDescription>
                    </div>
                    <CardDescription>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {assessment.improvementTip}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!selectedQuiz} onOpenChange={() => setselectedQuiz(null)}>
        <DialogContent className="overflow-y-auto max-w-xl md:max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          {selectedQuiz && (
            <QuizResult
              result={mapAssessmentToResult(selectedQuiz)}
              hideStartNew
              onStartNew={() => router.push("/interview/mock")}
            />
          )}
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Quizdata;
