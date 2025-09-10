import { PageHeader } from "@/components/shared/page-header";
import { TractionChatbot } from "@/components/traction/traction-chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TractionPage() {
  return (
    <>
      <PageHeader
        title="Traction & Buy-in"
        description="Develop your strategy, set goals, and define your customer."
      />

      <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Strategy Hub</CardTitle>
                <CardDescription>This is where you'll manage your traction strategies. Use the AI assistant for guidance.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Coming soon: Tools for goal setting and customer definition.</p>
            </CardContent>
        </Card>
      </div>
      
      <TractionChatbot />
    </>
  );
}
