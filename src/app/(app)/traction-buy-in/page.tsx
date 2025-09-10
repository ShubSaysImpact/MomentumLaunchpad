import { PageHeader } from "@/components/shared/page-header";
import { TractionChatbot } from "@/components/traction/traction-chatbot";
import { IdealCustomerAvatar } from "@/components/traction/ideal-customer-avatar";
import { EvidenceLog } from "@/components/traction/evidence-log";
import { Positioning } from "@/components/traction/positioning";
import { TestsOfResonance } from "@/components/traction/tests-of-resonance";
import { TractionGoalManagement } from "@/components/traction/traction-goal-management";

export default function TractionPage() {
  return (
    <>
      <PageHeader
        title="Traction & Buy-in"
        description="Develop your strategy, set goals, and define your customer."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <IdealCustomerAvatar />
          <Positioning />
          <EvidenceLog />
        </div>
        <div className="space-y-8">
          <TractionGoalManagement />
          <TestsOfResonance />
        </div>
      </div>
      
      <TractionChatbot />
    </>
  );
}
