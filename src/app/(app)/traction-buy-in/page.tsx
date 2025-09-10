// src/app/(app)/traction-buy-in/page.tsx
import { PageHeader } from "@/components/shared/page-header";
import { TractionChatbot } from "@/components/traction/traction-chatbot";
import { IdealCustomerAvatar } from "@/components/traction/ideal-customer-avatar";
import { EvidenceLog } from "@/components/traction/evidence-log";
import { Positioning } from "@/components/traction/positioning";
import { TestsOfResonance } from "@/components/traction/tests-of-resonance";
import { TractionGoalManagement } from "@/components/traction/traction-goal-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalToolsCard } from "@/components/dashboard/external-tools-card";

export default function TractionPage() {
  return (
    <>
      <PageHeader
        title="Traction & Buy-in"
        description="Develop your strategy, execute on your goals, and connect with your target audience."
      />

      <Tabs defaultValue="strategy" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="goals">Goals & Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="strategy" className="space-y-6">
            <ExternalToolsCard 
                tools={[
                    {
                        name: "Clinician Founder Signature Story Coach",
                        description: "Craft a compelling narrative to connect with your audience and build credibility.",
                        href: "https://chatgpt.com/g/g-68ba17977f44819190896b7d74dbbeda-clinician-founder-signature-story-coach"
                    }
                ]}
                title="External Tools & Coaches"
                description="Specialized AI coaches to help you refine your strategy."
            />
            <Card>
                <CardContent className="p-6">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="space-y-8">
                            <IdealCustomerAvatar />
                            <Positioning />
                        </div>
                        <div className="space-y-8">
                             <TestsOfResonance />
                             <EvidenceLog />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="goals">
             <Card className="mt-6">
                <CardContent className="p-0 md:p-6">
                    <TractionGoalManagement />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
      <TractionChatbot />
    </>
  );
}
