"use client";

import { DefaultButton } from "@/components/Buttons/DefaultButton";
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
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { ImageModal } from "@/components/Modals/ImageModal";
import Image from "next/image";

interface Props {
  flashcards: Flashcard[];
  collection: Collection;
}

const EditForm = ({ flashcards, collection }: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashcardsToDelete, setFlashcardsToDelete] = useState<string[]>([]);
  const form = useForm<z.infer<typeof FlashcardValidation>>({
    resolver: zodResolver(FlashcardValidation),
    defaultValues: {
      collectionId: collection.id,
      title: collection.title,
      flashcards: flashcards.map((flashcard) => ({
        id: flashcard.id,
        question: flashcard.question,
        answer: flashcard.answer,
        options: flashcard.options || ["", "", "", ""], // Ensure options are always an array of 4
        image: flashcard.image || null,
        collectionId: collection.id,
        updatedAt: flashcard.updatedAt,
        createdAt: flashcard.createdAt,
      })),
    },
  });

  const { isSubmitting } = form.formState;
  const flashcardList = form.watch("flashcards");

  const addNewFlashcard = () => {
    const newFlashcard = {
      id: `temp-${Date.now()}`,
      question: "",
      answer: "",
      options: ["", "", "", ""], // Default empty options
      image: "",
      collectionId: collection.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const existingFlashcards = form.getValues("flashcards");
    form.setValue("flashcards", [...existingFlashcards, newFlashcard]);
  };

  const deleteFlashcard = (id: string) => {
    if (!id.startsWith("temp")) {
      setFlashcardsToDelete((prev) => [...prev, id]);
    }

    const updatedFlashcards = flashcardList.filter((flashcard) => flashcard.id !== id);
    form.setValue("flashcards", updatedFlashcards);
  };

  const onSubmit = async (values: z.infer<typeof FlashcardValidation>) => {
    try {
      const existingFlashcards = values.flashcards.filter((flashcard) => !flashcard.id.startsWith("temp"));
      const newFlashcards = values.flashcards.filter((flashcard) => flashcard.id.startsWith("temp"));

      if (existingFlashcards.length + newFlashcards.length < 2) {
        toast({
          title: "Insufficient Flashcards",
          description: "You need at least 2 flashcards in your collection.",
        });
        return;
      }

      await updateCollection(
        values.collectionId,
        values.title,
        existingFlashcards,
        newFlashcards,
        flashcardsToDelete
      );

      router.push(`/collections/${values.collectionId}`);
      toast({
        title: "Колекцията е актуализирана",
        description: "Вашата колекция беше актуализирана успешно!",
      });
    } catch (error) {
      toast({
        title: "Грешка",
        description: "Възникна грешка при актуализиране на вашата колекция.",
      });
    }
  };

  return (
    <div className="h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="flex justify-between items-start mb-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <DefaultInput {...field} placeholder="Заглавие" className="text-4xl py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 items-end">
              <small>ID: {collection.id}</small>
              <small>Въпроси: {flashcards.length}</small>
            </div>
          </div>

          <ScrollArea className="py-2 pr-4 rounded-md mt-2 h-[81vh]">
            {flashcardList.map((flashcard, index) => (
              <Card key={flashcard.id} className="mb-4 p-3">
                <div className="flex w-full gap-2">
                  <FormField
                    control={form.control}
                    name={`flashcards.${index}.question`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Въпрос</FormLabel>
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
                        <FormLabel>Верен отговор</FormLabel>
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

                {/* Options fields for editing multiple choice */}
                <div className="flex w-full gap-2 mt-2">
                  {flashcard.options.map((option, optionIndex) => (
                    <FormField
                      key={optionIndex}
                      control={form.control}
                      name={`flashcards.${index}.options.${optionIndex}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Отговор {optionIndex + 1}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Option ${optionIndex + 1}`}
                              className="w-full border p-2 rounded-md"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="mt-2">
                  <UploadButton
                    onClientUploadComplete={(res) => {
                      const imageUrl = res[0]?.url;
                      form.setValue(`flashcards.${index}.image`, imageUrl);
                    }}
                    onUploadError={(error: Error) => {
                      alert(`Please try again: ${error.message}`);
                    }}
                    endpoint="imageUploader"
                  />

                  {flashcard.image && (
                    <div className='h-[20vh] relative'>
                      <ImageModal
                        src={flashcard.image}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                      />
                      <div className="mt-2 mb-2">
                        <Image
                          onClick={() => setIsModalOpen(true)}
                          src={flashcard.image}
                          alt={`Image for question: ${flashcard.question}`}
                          className="object-cover object-center rounded-md transition-opacity duration-200 opacity-0 p-1 cursor-pointer"
                          fill
                          priority
                          onLoad={(e) => {
                            const image = e.currentTarget as HTMLImageElement;
                            image.classList.remove("opacity-0");
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end items-end mt-2">
                  <Button type="button" onClick={() => deleteFlashcard(flashcard.id)}>
                    Изтрий
                  </Button>
                </div>
              </Card>
            ))}

            <DefaultButton
              className="w-full h-14"
              pending={false}
              type="button"
              onClick={addNewFlashcard}
            >
              Създай нов въпрос
            </DefaultButton>
          </ScrollArea>

          <DefaultButton disabledText="Saving" pending={isSubmitting}>
            Запази тема
          </DefaultButton>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
