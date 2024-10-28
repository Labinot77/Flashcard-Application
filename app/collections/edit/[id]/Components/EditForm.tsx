"use client";

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import { createFlashcards, deleteFlashcard, updateFlashcard } from "@/lib/actions/Flashcard";
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

interface Props {
  flashcards: Flashcard[];
  collectionId: string;
}

const EditForm = ({ flashcards, collectionId }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof FlashcardValidation>>({
    resolver: zodResolver(FlashcardValidation),
    defaultValues: {
      flashcards: flashcards.map((flashcard) => ({
        id: flashcard.id,
        question: flashcard.question,
        answer: flashcard.answer,
        hint: flashcard.hint || "",
      })),
    },
  });
  const { isSubmitting } = form.formState;
  const [newFlashcards, setNewFlashcards] = useState<Flashcard[]>([]);

  const addNewFlashcard = () => {
    const newFlashcard = {
      id: `temp-${Math.random().toString()}`,
      question: "",
      answer: "",
      hint: "",
      collectionId: collectionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNewFlashcards((prev) => [...prev, newFlashcard]);
  };

  const onSubmit = async (values: z.infer<typeof FlashcardValidation>) => {
    
    const formData = {
      existingFlashcards: values.flashcards.filter((flashcard) => !flashcard.id.startsWith("temp")), // ! They don't matter because on refresh they are already added to the db
      newFlashcards: newFlashcards.map((flashcard) => {
        // Remove the temp id before sending to DB
        const { id, ...rest } = flashcard;
        return rest;
      })
    };

    console.log("Exist", formData.existingFlashcards)
    console.log("New",formData.newFlashcards)

    // Update existing flashcards in the database
    if (formData.existingFlashcards.length > 0) {
      const res = await updateFlashcard(formData.existingFlashcards);

      if (!res.success) {
        toast({
          title: "Error",
          description: "There was an error updating your flashcards.",
        })

        return;
      }
      toast({
        title: "Flashcards Updated",
        description: "Your flashcards have been updated successfully!",
      })
    }

    // Create new flashcards without ids
    if (formData.newFlashcards.length > 0) {
      const res = await createFlashcards(formData.newFlashcards); // Adjust as per your create function
      if (!res.success) {
        toast({
          title: "Error",
          description: "There was an error updating your flashcards.",
        })

        return;
      }
      toast({
        title: "Flashcards Updated",
        description: "Your flashcards have been updated successfully!",
      })

    }

  };

  return (
    <div className="h-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="py-2 pr-2 rounded-md overflow-y-scroll h-[95%]">
          {flashcards.map((item, index) => (
            <div key={item.id} className="mb-4 p-2 rounded-lg bg-[#2e3856] bg-opacity-45 ">
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name={`flashcards.${index}.question`}
                  render={({ field, fieldState }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter question"
                          className="w-full border rounded-md"
                        />
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
                        <Input
                          {...field}
                          placeholder="Enter answer"
                          className="w-full border p-2 rounded-md"
                        />
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
                      {/* <FormLabel>Hint</FormLabel> */}
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter hint (optional)"
                          className="border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  <div className="flex justify-end items-end">
                    <Button type="button" onClick={() => deleteFlashcard(item.id)}>Delete</Button>
                  </div>
                </div>
             


              <div>
              </div>

            </div>


          ))}
          
          <DefaultButton className="w-full h-14" pending={false} onClick={() => addNewFlashcard()}>
            Add New Flashcard
          </DefaultButton>

          <DefaultButton pending={isSubmitting}>Save</DefaultButton>
          <div ref={ref} className="mb-14" />
          </div>
        </form>

      </Form>

    </div>
  );
};

export default EditForm;