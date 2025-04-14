
import { getAssessment } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceStats from "./_components/PerformanceStats";
import Quizdata from "./_components/Quizdata";

const page = async () => {
   const assessments = await getAssessment();
  return (
    <div className="md:mx-4">
    <div className="flex items-center justify-between mb-5">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold gradient-title">
        Interview Preparation
      </h1>
    </div>
    <div className="space-y-6">
    <StatsCards assessments={assessments} />
    <PerformanceStats assessments={assessments} />
    <Quizdata assessments={assessments}/>
    </div>
  </div>
  );
};

export default page;
