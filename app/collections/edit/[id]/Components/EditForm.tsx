"use client";

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import { updateFlashcard } from "@/lib/actions/Flashcard";
import { Flashcard } from "@prisma/client";
import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashcardValidation } from "@/lib/validations/Collections";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useRef } from "react";

interface Props {
  flashcards: Flashcard[];
}

const EditForm = ({ flashcards }: Props) => {
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

  const onSubmit = async (values: z.infer<typeof FlashcardValidation>) => {
    const res = await updateFlashcard(values.flashcards);


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

    console.log(values);
  };

  return (
    <div className="h-full">
      <Form {...form}>
        <div className="py-2 overflow-y-scroll h-full pr-2">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {flashcards.map((item, index) => (
            <div key={item.id} className="mb-4 p-2 rounded-lg bg-slate-600">
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name={`flashcards.${index}.question`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter question"
                          className="w-full border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
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

              {item.hint ? (
                <FormField
                  control={form.control}
                  name={`flashcards.${index}.hint`}
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Hint</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter hint (optional)"
                          className="w-full border p-2 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ): (
                <div className="flex justify-center items-center p-1">
                  <small onClick={() => {}}>Add hint</small>
                </div>
              )}
            </div>

          ))}
          
      <DefaultButton pending={isSubmitting}>Save</DefaultButton>
          <div ref={ref} className="mb-24" />
        </form>
        </div>
       
      </Form>
    </div>
  );
};

export default EditForm;
