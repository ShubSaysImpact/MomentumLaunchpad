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
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <RetrospectiveForm />
        </div>
        <div className="lg:col-span-1 space-y-8">
            <SummaryCards />
        </div>
      </div>
    </>
  );
}
