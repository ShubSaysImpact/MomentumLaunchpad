// src/components/traction/add-item-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  content: z.string().min(1, "Content cannot be empty."),
  category: z.string().min(1, "Please select a category."),
});

type FormValues = z.infer<typeof formSchema>;

interface AddItemFormProps<T extends string> {
  itemType: "goal" | "task";
  onAddItem: (content: string, category: T) => void;
  categories: T[];
  placeholder: string;
}

export function AddItemForm<T extends string>({ itemType, onAddItem, categories, placeholder }: AddItemFormProps<T>) {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      category: categories[0],
    },
  });

  const onSubmit = (data: FormValues) => {
    onAddItem(data.content, data.category as T);
    toast({
        title: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} Added!`,
        description: `Your new ${itemType} has been saved.`
    })
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mb-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add {itemType}</span>
        </Button>
      </form>
    </Form>
  );
}
