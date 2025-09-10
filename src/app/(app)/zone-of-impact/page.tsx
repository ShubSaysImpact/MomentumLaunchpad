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
import { useEffect, useState } from "react";
import { generateActionableSteps } from "@/ai/flows/generate-actionable-steps-from-inputs";
import { useToast } from "@/hooks/use-toast";
import { ActionableNextSteps } from "@/components/zone-of-impact/actionable-next-steps";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Loader2, Wand2 } from "lucide-react";
import Link from "next/link";


const formSchema = z.object({
  gallupStrengths: z.string().min(1, "Please list your Gallup Strengths."),
  mission: z.string().min(1, "Please enter your mission statement."),
  vision: z.string().min(1, "Please enter your vision statement."),
  why: z.string().min(1, "Please describe your 'why'."),
});

export type FormValues = z.infer<typeof formSchema>;

export default function ZoneOfImpactPage() {
  const { zoneOfImpact, loading, updateZoneOfImpact, addTask, addGoal } = useAppContext();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [actionableSteps, setActionableSteps] = useState<string[]>([]);
  
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gallupStrengths: '',
      mission: '',
      vision: '',
      why: ''
    },
  });

  useEffect(() => {
    if (!loading && zoneOfImpact) {
      methods.reset(zoneOfImpact);
    }
  }, [zoneOfImpact, loading, methods]);

  const handleGenerateSteps = async () => {
    const data = methods.getValues();
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill out all fields before generating steps.",
      });
      // Trigger validation to show error messages
      methods.trigger();
      return;
    }

    setIsGenerating(true);
    setActionableSteps([]);
    try {
      const result = await generateActionableSteps(data);
      if (result && result.actionableSteps) {
        const steps = result.actionableSteps.split('\n').map(s => s.replace(/^- /, '')).filter(Boolean);
        setActionableSteps(steps);
      }
      // Save the form data when generation is successful
      updateZoneOfImpact(data);
      toast({
        title: "Actionable Steps Generated!",
        description: "Review your tailored next steps on the right.",
      });
    } catch (error) {
      console.error("Error generating actionable steps:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating actionable steps. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Zone of Impact"
        description="Define your foundational business clarity. What is your unique advantage?"
      />
      <FormProvider {...methods}>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle>Define Your Zone of Impact</CardTitle>
                    <CardDescription>
                      To gain clarity, complete the foundational exercises below. If you haven't done this work yet, these resources can help.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 mb-6">
                      <Button asChild variant="outline">
                        <Link href="https://www.gallup.com/cliftonstrengths/en/strengthsfinder.aspx" target="_blank">
                          Discover Your Gallup Strengths <ArrowUpRight className="ml-2"/>
                        </Link>
                      </Button>
                       <Button asChild variant="outline">
                        <Link href="https://chatgpt.com/g/g-68122c7ac36c819189f999d5b4a834c5-shub-the-impact-coach-mission-vision-and-why" target="_blank">
                          Shub the Impact Coach <ArrowUpRight className="ml-2"/>
                        </Link>
                      </Button>
                  </div>
                  <ZoneOfImpactForm />
                   <Button type="button" className="mt-6" onClick={handleGenerateSteps} disabled={isGenerating}>
                    {isGenerating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate Actionable Steps
                  </Button>
                </CardContent>
            </Card>
            <FoundationalPillars />
          </div>
          <div className="lg:col-span-1">
             <ActionableNextSteps 
                steps={actionableSteps} 
                isGenerating={isGenerating}
                onAddGoal={addGoal}
                onAddTask={addTask}
              />
          </div>
        </div>
      </FormProvider>
    </>
  );
}
