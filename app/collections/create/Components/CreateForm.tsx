"use client";

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashcardValidation } from "@/lib/validations/Collections&Flashcard";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DefaultInput } from "@/components/Inputs/DefaultInput";
import { createCollection } from "@/lib/actions/Collection";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();  
  const form = useForm<z.infer<typeof FlashcardValidation>>({
    resolver: zodResolver(FlashcardValidation),
    defaultValues: {
      title: "",
      description: "",
      collectionId: "",
      flashcards: [
        {
          // Need to use Math.random() to avoid duplicate ids
          id: `temp-${Date.now() + Math.random()}`,
          question: "Sample question 1",
          answer: "Sample answer 1",
          hint: "Sample hint 1",
          collectionId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `temp-${Date.now() + Math.random()}`,
          question: "",
          answer: "",
          hint: "",
          collectionId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  });

  const { isSubmitting } = form.formState;

  const addNewFlashcard = () => {
    const newFlashcard = {
      id: `temp-${Date.now()}`,
      question: "",
      answer: "",
      hint: "",
      collectionId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const existingFlashcards = form.getValues("flashcards")
    form.setValue("flashcards", [...existingFlashcards, newFlashcard]);
  };

  const deleteFlashcard = async (id: string) => {
   const flashcards = form.watch('flashcards')
   const updatedFlashcards = flashcards.filter((flashcard) => flashcard.id !== id)

   form.setValue('flashcards', updatedFlashcards)
  }

  const onSubmit = async (values: z.infer<typeof FlashcardValidation>) => {
    console.log("Form submitted with values:", values);

    if (form.watch("flashcards").length <= 1) {
      toast({
        title: "Cannot create",
        description: "You have to have more than 2 flashcards"
      })
      
    } else {
      const res = await createCollection(values)
      if (res) {
        toast({
          title: "Collection Created",
          description: `Your collection has been created with ${res.flashcards.length} flashcards` ,
        })
        router.push("/collections")
      }
    }
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <DefaultInput {...field} placeholder="Title" className="text-4xl py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <DefaultInput {...field} placeholder="Description" className="text-2xl py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ScrollArea className="py-2 pr-4 rounded-md mt-2 h-[74vh]">
            {form.watch("flashcards").map((flashcard, index) => (
              <div key={flashcard.id} className="mb-4 p-2 rounded-lg bg-[#2e3856] bg-opacity-45">
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

                <div className="flex w-full gap-2">
                  <FormField
                    control={form.control}
                    name={`flashcards.${index}.hint`}
                    render={({ field }) => (
                      <FormItem className="mt-2 flex-1">
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
                    <Button
                      type="button"
                      onClick={() => deleteFlashcard(flashcard.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <DefaultButton className="w-full h-14" pending={false} type="button" onClick={addNewFlashcard}>
              Add New Flashcard
            </DefaultButton>

            {/* <div ref={ref} className="mb-4"/> */}
          </ScrollArea>

            <DefaultButton pending={isSubmitting}>
              Create Collection
            </DefaultButton>
        </form>
      </Form>
  );
};

export default CreateForm;
