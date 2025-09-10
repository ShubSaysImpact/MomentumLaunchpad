// src/components/traction/traction-chatbot.tsx
"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, MessageCircle, Send, User, Wand2 } from 'lucide-react';
import { adviseOnBuildingTraction } from '@/ai/flows/advise-on-building-traction';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export function TractionChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(scrollAreaRef.current) {
            // Use `setTimeout` to scroll after the new message has been rendered
            setTimeout(() => {
                 if(scrollAreaRef.current) {
                    scrollAreaRef.current.children[0].scrollTop = scrollAreaRef.current.children[0].scrollHeight;
                 }
            }, 0)
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        const userInput = input;
        setInput('');

        startTransition(async () => {
            try {
                const conversationHistory = newMessages.map(msg => `${msg.role}: ${msg.content}`);
                const result = await adviseOnBuildingTraction({
                    conversationHistory,
                    userInput: userInput,
                });

                if (result && result.aiResponse) {
                    setMessages(prev => [...prev, { role: 'assistant', content: result.aiResponse }]);
                }
            } catch (error) {
                console.error("Error with AI assistant:", error);
                setMessages(prev => prev.slice(0, -1)); // Remove the user message if AI fails
                toast({
                    variant: "destructive",
                    title: "AI Error",
                    description: "The assistant is currently unavailable. Please try again later.",
                });
            }
        });
    };

    return (
        <>
            <Button
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
                onClick={() => setIsOpen(true)}
            >
                <Wand2 className="h-8 w-8" />
                <span className="sr-only">Open AI Assistant</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="flex flex-col w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle>Traction AI Assistant</SheetTitle>
                        <SheetDescription>
                            Your co-pilot for building traction. Ask for ideas, feedback, or strategy.
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="flex-1 my-4 pr-4 -mr-6" ref={scrollAreaRef}>
                        <div className="space-y-4 pr-6">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? "justify-end" : "justify-start")}>
                                    {message.role === 'assistant' && (
                                        <Avatar className="w-8 h-8 border">
                                            <AvatarFallback><Wand2 className="h-4 w-4"/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "p-3 rounded-lg max-w-sm", 
                                        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    )}>
                                        <p className="text-sm" style={{whiteSpace: 'pre-wrap'}}>{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="w-8 h-8 border">
                                            <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isPending && (
                                <div className="flex items-start gap-3 justify-start">
                                     <Avatar className="w-8 h-8 border">
                                        <AvatarFallback><Wand2 className="h-4 w-4"/></AvatarFallback>
                                    </Avatar>
                                    <div className="p-3 rounded-lg bg-muted flex items-center">
                                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <SheetFooter className="mt-auto">
                        <div className="flex w-full space-x-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !isPending && handleSendMessage()}
                                placeholder="Ask about building traction..."
                                disabled={isPending}
                            />
                            <Button onClick={handleSendMessage} disabled={isPending || !input.trim()} size="icon">
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
}