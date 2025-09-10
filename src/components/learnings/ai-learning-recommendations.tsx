// src/components/learnings/ai-learning-recommendations.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, BookOpen, Youtube, GraduationCap, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/app-context";
import { generateLearningTopics, GenerateLearningTopicsOutput } from "@/ai/flows/generate-learning-topics";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const iconMap = {
    article: <BookOpen className="h-4 w-4" />,
    video: <Youtube className="h-4 w-4" />,
    course: <GraduationCap className="h-4 w-4" />,
};

export function AiLearningRecommendations() {
    const { toast } = useToast();
    const { goals, tasks, loading: appLoading } = useAppContext();
    const [isGenerating, setIsGenerating] = useState(false);
    const [recommendations, setRecommendations] = useState<GenerateLearningTopicsOutput | null>(null);

    const handleGenerate = async () => {
        if (goals.length === 0 && tasks.length === 0) {
            toast({
                variant: "destructive",
                title: "No Goals or Tasks",
                description: "Please add some goals or tasks before generating learning recommendations.",
            });
            return;
        }

        setIsGenerating(true);
        setRecommendations(null);
        try {
            const result = await generateLearningTopics({
                goals: goals.map(g => g.content),
                tasks: tasks.map(t => t.content),
            });
            setRecommendations(result);
            toast({
                title: "Recommendations Generated!",
                description: "Review your personalized learning topics below.",
            });
        } catch (error) {
            console.error("Error generating learning recommendations:", error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "There was an error generating recommendations. Please try again.",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI-Powered Learning Recommendations</CardTitle>
                <CardDescription>
                    Based on your current goals and tasks, here are some recommended topics and resources to help you level up.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleGenerate} disabled={isGenerating || appLoading}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    {appLoading ? "Loading your data..." : "Generate Recommendations"}
                </Button>

                <div className="mt-6 space-y-6">
                    {isGenerating && (
                        <div className="space-y-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    )}
                    {recommendations && recommendations.learningTopics.map((topic, index) => (
                         <Alert key={index}>
                            <Wand2 className="h-4 w-4" />
                            <AlertTitle className="font-bold">{topic.topic}</AlertTitle>
                            <AlertDescription>
                                <p className="mb-4">{topic.description}</p>
                                <div className="space-y-2">
                                    <h4 className="font-semibold">Recommended Resources:</h4>
                                    <ul className="space-y-2">
                                        {topic.resources.map((resource, rIndex) => (
                                            <li key={rIndex}>
                                                <Button variant="outline" className="w-full justify-between h-auto py-2" asChild>
                                                     <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                                                        <div className="flex items-center gap-2">
                                                            {iconMap[resource.type]}
                                                            <span className="text-left">{resource.title}</span>
                                                        </div>
                                                        <ArrowUpRight className="text-muted-foreground" />
                                                    </Link>
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AlertDescription>
                        </Alert>
                    ))}
                    {!isGenerating && !recommendations && (
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">AI-generated recommendations will appear here.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
