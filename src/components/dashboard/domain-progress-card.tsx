// src/components/dashboard/domain-progress-card.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/lib/placeholder-images";
import { Domain } from "@/lib/types";
import { useAppContext } from "@/context/app-context";
import { useEffect, useState } from "react";

interface DomainProgressCardProps {
  domain: Domain;
  title: string;
  description: string;
  href: string;
  image: ImagePlaceholder;
}

export function DomainProgressCard({ domain, title, description, href, image }: DomainProgressCardProps) {
  const { goals, tasks, loading } = useAppContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      const domainItems = [...goals, ...tasks].filter(item => item.domain === domain);
      if (domainItems.length === 0) {
        setProgress(0);
        return;
      }
      const completedItems = domainItems.filter(item => item.completed);
      setProgress((completedItems.length / domainItems.length) * 100);
    }
  }, [goals, tasks, loading, domain]);

  if (loading) {
    return (
        <Card className="flex flex-col animate-pulse">
            <CardHeader>
                <div className="w-3/4 h-6 rounded bg-muted" />
                <div className="w-1/2 h-4 rounded bg-muted mt-2" />
            </CardHeader>
            <CardContent className="flex-1">
                <div className="w-full h-10 rounded bg-muted" />
            </CardContent>
            <CardFooter>
                 <div className="w-24 h-10 rounded bg-muted" />
            </CardFooter>
        </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <div className="relative w-full h-40">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover rounded-t-lg"
          data-ai-hint={image.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">{progress.toFixed(0)}% Complete</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href={href}>
            Go to {title} <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
