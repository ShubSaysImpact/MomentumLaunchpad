import { PageHeader } from "@/components/shared/page-header";
import { RetrospectiveForm } from "@/components/retrospective/retrospective-form";
import { SummaryCards } from "@/components/retrospective/summary-cards";

export default function RetrospectivePage() {
  return (
    <>
      <PageHeader
        title="Weekly Retrospective"
        description="Reflect on your week to generate key learning points and fuel your momentum."
      />
      <div className="grid gap-8">
        <SummaryCards />
        <RetrospectiveForm />
      </div>
    </>
  );
}
