"use client";

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import { createFlashcards, updateFlashcard } from "@/lib/actions/Flashcard";
import { Flashcard } from "@prisma/client";
import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashcardValidation } from "@/lib/validations/Collections";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateForm = () => {
  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof FlashcardValidation>>({
    resolver: zodResolver(FlashcardValidation),
    defaultValues: {
      title: '',
      description: '',
      flashcards: [
      ],
    },
  });
  const { isSubmitting } = form.formState;

  // Initialize with two default flashcards
  const [newFlashcards, setNewFlashcards] = useState<Flashcard[]>([
    { id: `temp-1`, question: "", answer: "", hint: "", collectionId: "", createdAt: new Date(), updatedAt: new Date() },
    { id: `temp-2`, question: "", answer: "", hint: "", collectionId: "", createdAt: new Date(), updatedAt: new Date() },
  ]);

  const addNewFlashcard = () => {
    const newFlashcard = {
      id: `temp-${Math.random().toString()}`,
      question: "",
      answer: "",
      hint: "",
      collectionId: "", // You might want to add the collectionId dynamically
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNewFlashcards((prev) => [...prev, newFlashcard]);
  };

  const deleteFlashcard = async (id: string) => {
    setNewFlashcards((prev) => prev.filter((flashcard) => flashcard.id !== id))
  }

  const onSubmit = async (values: z.infer<typeof FlashcardValidation>) => {
    const formData = {
      existingFlashcards: values.flashcards.filter((flashcard) => !flashcard.id.startsWith("temp")),
      newFlashcards: newFlashcards.map((flashcard) => {
        const { id, ...rest } = flashcard;
        return rest;
      }),
    };

    const totalFlashcards = formData.existingFlashcards.length + formData.newFlashcards.length;
    if (totalFlashcards < 2) {
      toast({
        title: "Insufficient Flashcards",
        description: "A collection must have at least 2 flashcards before it can be saved.",
      });
      return;
    }

    if (formData.existingFlashcards.length > 0) {
      const res = await updateFlashcard(formData.existingFlashcards);
      if (!res.success) {
        toast({ title: "Error", description: "There was an error updating your flashcards." });
        return;
      }
      toast({ title: "Flashcards Updated", description: "Your flashcards have been updated successfully!" });
    }

    if (formData.newFlashcards.length > 0) {
      const res = await createFlashcards(formData.newFlashcards);
      if (!res.success) {
        toast({ title: "Error", description: "There was an error creating your flashcards." });
        return;
      }
      toast({ title: "Flashcards Created", description: "Your flashcards have been created successfully!" });
    }
  };

  return (
    <div className="h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <FormField
                    control={form.control}
                    name={`title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter answer" className="w-full border p-2 rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`description`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter answer" className="w-full border p-2 rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

        <ScrollArea className="py-2 pr-4 rounded-md mt-2 h-[95%]">
            {newFlashcards.map((flashcard, index) => (
              <div key={flashcard.id} className="mb-4 p-2 rounded-lg bg-[#2e3856] bg-opacity-45">
                <div className="flex w-full gap-2">
                  <FormField
                    control={form.control}
                    name={`flashcards.${index}.question`}
                    render={({ field, fieldState }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter question" className="w-full border rounded-md" />
                        </FormControl>
                        {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`flashcards.${index}.answer`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Answer</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter answer" className="w-full border p-2 rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex w-full gap-2">
                  <FormField
                    control={form.control}
                    name={`flashcards.${index}.hint`}
                    render={({ field }) => (
                      <FormItem className="mt-2 flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Enter hint (optional)" className="border rounded-md" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end items-end">
                    <Button type="button" onClick={() => deleteFlashcard(flashcard.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}

          <DefaultButton className="w-full h-14" pending={false} onClick={addNewFlashcard}>
            Add New Flashcard
          </DefaultButton>
          <DefaultButton pending={isSubmitting}>Create Collection</DefaultButton>
          </ScrollArea>

          <div ref={ref} className="mb-14" />
        </form>
      </Form>
    </div>
  );
};

export default CreateForm;
