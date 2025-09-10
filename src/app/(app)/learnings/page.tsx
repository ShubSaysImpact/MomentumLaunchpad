import { PageHeader } from "@/components/shared/page-header";
import { LearningsBoard } from "@/components/learnings/learnings-board";

export default function LearningsPage() {
  return (
    <>
      <PageHeader
        title="Learnings Board"
        description="A space to manually add and track your key learning points."
      />
      <LearningsBoard />
    </>
  );
}
