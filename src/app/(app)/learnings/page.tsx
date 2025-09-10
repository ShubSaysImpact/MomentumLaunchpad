import { PageHeader } from "@/components/shared/page-header";
import { LearningsBoard } from "@/components/learnings/learnings-board";
import { AiLearningRecommendations } from "@/components/learnings/ai-learning-recommendations";

export default function LearningsPage() {
  return (
    <>
      <PageHeader
        title="Points to Learn"
        description="A dedicated space for your key insights and takeaways."
      />
      <div className="space-y-8">
        <AiLearningRecommendations />
        <LearningsBoard />
      </div>
    </>
  );
}
