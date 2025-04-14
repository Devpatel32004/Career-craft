import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Trophy } from "lucide-react";

const StatsCards = ({ assessments }) => {

  const calculateAverageScore = async () => {
    if (!assessments?.length) return 0;
    const score = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (score / assessments.length).toFixed(1);
  };

  const totalQuestions = () => {
    if(!assessments.length) {
      return 0;
    }
    const totalquestion = assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
    return totalquestion;
  }

  const latestScore = () => {
    if(!assessments.length) return null;
   return assessments[0];
  }


  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Card className="bg-transparent hover:border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl">{calculateAverageScore()}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Across All Assessments
          </p>
        </CardContent>
      </Card>
      <Card className="bg-transparent hover:border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Questions Practised</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl">{totalQuestions()}</h2>
          <p className="text-sm text-muted-foreground mt-1">
           Total questions
          </p>
        </CardContent>
      </Card>
      <Card className="bg-transparent hover:border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl">{latestScore()?.quizScore.toFixed(1) || 0}</h2>
          <p className="text-sm text-muted-foreground mt-1">
          Most recent quiz
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
