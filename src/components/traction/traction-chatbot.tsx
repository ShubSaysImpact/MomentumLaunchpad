"use client";

import { useState, useRef, useEffect } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const conversationHistory = newMessages.map(msg => `${msg.role}: ${msg.content}`);
            const result = await adviseOnBuildingTraction({
                conversationHistory,
                userInput: input,
            });

            if (result && result.aiResponse) {
                setMessages(prev => [...prev, { role: 'assistant', content: result.aiResponse }]);
            }
        } catch (error) {
            console.error("Error with AI assistant:", error);
            toast({
                variant: "destructive",
                title: "AI Error",
                description: "The assistant is currently unavailable. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
                onClick={() => setIsOpen(true)}
            >
                <MessageCircle className="h-8 w-8" />
                <span className="sr-only">Open AI Assistant</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Traction AI Assistant</SheetTitle>
                        <SheetDescription>
                            Get advice on building traction for your venture.
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="flex-1 my-4 pr-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? "justify-end" : "")}>
                                    {message.role === 'assistant' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback><Wand2/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("p-3 rounded-lg max-w-xs md:max-w-md", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback><User /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-3">
                                     <Avatar className="w-8 h-8">
                                        <AvatarFallback><Wand2/></AvatarFallback>
                                    </Avatar>
                                    <div className="p-3 rounded-lg bg-muted flex items-center">
                                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <SheetFooter>
                        <div className="flex w-full space-x-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                                placeholder="Ask about building traction..."
                                disabled={isLoading}
                            />
                            <Button onClick={handleSendMessage} disabled={isLoading}>
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
