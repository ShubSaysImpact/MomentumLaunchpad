import { PageHeader } from "@/components/shared/page-header";
import { LearningsBoard } from "@/components/learnings/learnings-board";

export default function LearningsPage() {
  return (
    <>
      <PageHeader
        title="Points to Learn"
        description="A dedicated space for your key insights and takeaways."
      />
      <LearningsBoard />
    </>
  );
}
