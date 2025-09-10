import { PageHeader } from "@/components/shared/page-header";
import { ZoneOfImpactForm } from "@/components/zone-of-impact/zoi-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ZoneOfImpactPage() {
  return (
    <>
      <PageHeader
        title="Zone of Impact"
        description="Define your foundational business clarity. What is your unique advantage?"
      />
      <Card>
        <CardHeader>
            <CardTitle>Founder DNA</CardTitle>
            <CardDescription>Input your Gallup Strengths, Mission, Vision, and 'Why' to generate actionable steps tailored to you.</CardDescription>
        </CardHeader>
        <CardContent>
            <ZoneOfImpactForm />
        </CardContent>
      </Card>
    </>
  );
}
