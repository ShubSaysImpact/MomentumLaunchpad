// src/app/(app)/zone-of-impact/page.tsx
'use client';
import { PageHeader } from "@/components/shared/page-header";
import { ZoneOfImpactForm } from "@/components/zone-of-impact/zoi-form";
import { FoundationalPillars } from "@/components/zone-of-impact/foundational-pillars";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppContext } from "@/context/app-context";
import { useEffect } from "react";

const formSchema = z.object({
  gallupStrengths: z.string().min(1, "Please list your Gallup Strengths."),
  mission: z.string().min(1, "Please enter your mission statement."),
  vision: z.string().min(1, "Please enter your vision statement."),
  why: z.string().min(1, "Please describe your 'why'."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ZoneOfImpactPage() {
  const { zoneOfImpact, loading } = useAppContext();
  
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: zoneOfImpact,
  });

  useEffect(() => {
    if (!loading) {
      methods.reset(zoneOfImpact);
    }
  }, [zoneOfImpact, loading, methods]);

  return (
    <>
      <PageHeader
        title="Zone of Impact"
        description="Define your foundational business clarity. What is your unique advantage?"
      />
      <FormProvider {...methods}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                  <CardTitle>Founder DNA</CardTitle>
                  <CardDescription>Input your Gallup Strengths, Mission, Vision, and 'Why' to generate actionable steps tailored to you.</CardDescription>
              </CardHeader>
              <CardContent>
                  <ZoneOfImpactForm />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
             <FoundationalPillars />
          </div>
        </div>
      </FormProvider>
    </>
  );
}
