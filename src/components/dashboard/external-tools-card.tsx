// src/components/dashboard/external-tools-card.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Tool = {
    name: string;
    description: string;
    href: string;
}

interface ExternalToolsCardProps {
    tools: Tool[];
    title?: string;
    description?: string;
}

export function ExternalToolsCard({ tools, title, description }: ExternalToolsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || "External Tools & Resources"}</CardTitle>
        <CardDescription>{description || "Quick links to helpful external resources and AI coaches."}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
            {tools.map(tool => (
                <li key={tool.name}>
                    <Button variant="outline" className="w-full justify-between h-auto py-3 items-start text-left" asChild>
                         <Link href={tool.href} target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col">
                                <span className="font-semibold">{tool.name}</span>
                                <span className="text-muted-foreground text-xs">{tool.description}</span>
                            </div>
                           <ArrowUpRight className="text-muted-foreground" />
                        </Link>
                    </Button>
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
