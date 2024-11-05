"use client";

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import {
  createFlashcards,
  deleteFlashcard as deleteFlashcardFromDB,
  updateFlashcard,
} from "@/lib/actions/Flashcard";
import { Collection, Flashcard } from "@prisma/client";
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
import { useRouter } from "next/navigation";
import { updateCollection } from "@/lib/actions/Collection";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface Props {
  flashcards: Flashcard[];
  collection: Collection;
}

const EditForm = ({ flashcards, collection }: Props) => {
  const router = useRouter();
  const [flashcardsToDelete, setFlashcardsToDelete] = useState<string[]>([]);
  const form = useForm<z.infer<typeof FlashcardValidation>>({
    resolver: zodResolver(FlashcardValidation),
    defaultValues: {
      collectionId: collection.id,
      title: collection.title,
      description: collection.description || "",
      flashcards: flashcards.map((flashcard) => ({
        id: flashcard.id,
        question: flashcard.question,
        answer: flashcard.answer,
        hint: flashcard.hint || "",
        collectionId: collection.id,
        updatedAt: flashcard.updatedAt,
        createdAt: flashcard.createdAt,
        deleted: false,
      })),
    },
  });

  const { isSubmitting } = form.formState;
  const flashcardList = form.watch("flashcards");
  console.log(flashcardList)
  const addNewFlashcard = () => {
    const newFlashcard = {
      id: `temp-${Date.now()}`,
      question: "",
      answer: "",
      hint: "",
      collectionId: collection.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    };

    const exisitingFlashcards = form.getValues("flashcards");
    form.setValue("flashcards", [...exisitingFlashcards, newFlashcard]);
  };

  const onSubmit = async (values: z.infer<typeof FlashcardValidation>) => {    
    try {
      const exisitingFlashcards = values.flashcards.filter((flashcard) => !flashcard.id.startsWith("temp"))
      const newFlashcards = values.flashcards.filter((flashcard) => flashcard.id.startsWith("temp") && flashcard.deleted === false) // DONE

      if (newFlashcards.length > 0) {
        for (const flashcard of newFlashcards) {
          await createFlashcards(flashcard.collectionId!, flashcard.question, flashcard.answer, flashcard.hint!)
        }
      }

      if (exisitingFlashcards.length > 0) {
        for (const flashcard of exisitingFlashcards) {
          await updateFlashcard(flashcard)
        }
      }

      if (flashcardsToDelete.length > 0) {
        for (const flashcardId of flashcardsToDelete) {
          await deleteFlashcardFromDB(flashcardId)
        }
      }

      await updateCollection(values.collectionId, values.title, values.description)

      router.refresh()
      toast({
        title: "Collection Updated",
        description: "Your collection has been updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your collection.",
      })
    }
  };

  const deleteFlashcard = async (id: string) => {
    if (!id.startsWith("temp")) {
      setFlashcardsToDelete((prev) => [...prev, id])
    }
    
    // const updatedFlashcards = flashcardList.map((flashcard) =>
    //   flashcard.id === id ? { ...flashcard, deleted: true } : flashcard
    // );

    const updatedFlashcards = flashcardList.filter(flashcard => flashcard.id !== id);

    form.setValue('flashcards', updatedFlashcards)
  };
  
  return (
    <div className="h-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="flex justify-between items-start mb-1">
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <DefaultInput
                      {...field}
                      placeholder="Title"
                      className="text-4xl py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 items-end">
              <small>ID: {collection.id}</small>
              <small>Number of Flashcards: {flashcards.length}</small>
            </div>
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <DefaultInput
                    {...field}
                    placeholder="Description"
                    className="text-2xl py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ScrollArea className="py-2 pr-4 rounded-md mt-2 h-[74vh]">
            {flashcardList.filter(flashcard => !flashcard.deleted).map((flashcard, index) => (
              <Card
                key={flashcard.id}
                className="mb-4 p-3 "
              >
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

              </Card>
            ))}

            <DefaultButton
              className="w-full h-14"
              pending={false}
              type="button"
              onClick={() => addNewFlashcard()}
            >
              Add New Flashcard
            </DefaultButton>

          </ScrollArea>
          <DefaultButton pending={isSubmitting}>Save Collection</DefaultButton>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
