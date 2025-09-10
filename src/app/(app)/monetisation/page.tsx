// src/app/(app)/monetisation/page.tsx
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientFlowProcess } from "@/components/monetisation/client-flow-process";
import { BoostersForConversion } from "@/components/monetisation/boosters-for-conversion";
import { ModelOfTransformation } from "@/components/monetisation/model-of-transformation";
import { MonetisationGoalManagement } from "@/components/monetisation/monetisation-goal-management";
import { Card, CardContent } from "@/components/ui/card";

export default function MonetisationPage() {
  return (
    <>
      <PageHeader
        title="Monetisation"
        description="Map out your revenue strategies and financial goals."
      />

      <Tabs defaultValue="strategy" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="goals">Goals & Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="strategy">
            <Card className="mt-6">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <ClientFlowProcess />
                            <ModelOfTransformation />
                        </div>
                        <div className="space-y-8">
                            <BoostersForConversion />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="goals">
            <Card className="mt-6">
                <CardContent className="p-0 md:p-6">
                    <MonetisationGoalManagement />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
