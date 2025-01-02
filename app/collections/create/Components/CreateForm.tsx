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
import { UploadButton } from "@/utils/uploadthing";
import { Card } from "@/components/ui/card";
import { ImageModal } from "@/components/Modals/ImageModal";
import { useState } from "react";
import Image from "next/image";

const CreateForm = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<z.infer<typeof FlashcardValidation>>({
    resolver: zodResolver(FlashcardValidation),
    defaultValues: {
      collectionId: "",
      title: "",
      flashcards: [
        {
          id: `temp-${Date.now() + Math.random()}`,
          question: "",
          options: ["", "", "", ""], // Editable options
          image: "", // New field for image URL
          collectionId: Math.random().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          answer: "", // New field for the answer input
        },
      ],
    },
  });

  const { isSubmitting } = form.formState;
  const flashcardList = form.watch("flashcards");

  const addNewFlashcard = () => {
    const newFlashcard = {
      id: `temp-${Date.now()}`,
      question: "",
      options: ["", "", "", ""],
      image: "",
      collectionId: Math.random().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      answer: "", // New field for the answer input
    };
    const existingFlashcards = form.getValues("flashcards");
    form.setValue("flashcards", [...existingFlashcards, newFlashcard]);
  };

  const deleteFlashcard = (id: string) => {
    const updatedFlashcards = flashcardList.filter(
      (flashcard) => flashcard.id !== id
    );
    form.setValue("flashcards", updatedFlashcards);
  };

  const onSubmit = async (values: any) => {
    console.log(values);
    if (flashcardList.length <= 1) {
      toast({
        title: "Не може да се създаде",
        description: "Трябва да имате повече от 2 флашкарти",
      });
      } else {
        const res = await createCollection(values);
        if (res) {
          toast({
            title: "Колекцията е създадена",
            description: `Вашата колекция е създадена с ${res.flashcards.length} флашкарти`,
          });
          router.push(`/collections/${res.id}`);
        }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <div className="flex justify-between items-start mb-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <DefaultInput
                    {...field}
                    placeholder="Заглавие"
                    className="text-4xl py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ScrollArea className="py-2 pr-4 rounded-md mt-2 h-[81vh]">
          {flashcardList.map((flashcard, flashcardIndex) => (
            <Card key={flashcard.id} className="mb-4 p-3">
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name={`flashcards.${flashcardIndex}.question`}
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
                  name={`flashcards.${flashcardIndex}.answer`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Верен отговор</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter correct answer"
                          className="w-full border rounded-md"
                          value={flashcard.answer}
                          onChange={(e) =>
                            form.setValue(
                              `flashcards.${flashcardIndex}.answer`,
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full gap-2 mt-2">
                {flashcard.options.map((option, optionIndex) => (
                  <FormField
                    key={optionIndex}
                    control={form.control}
                    name={`flashcards.${flashcardIndex}.options.${optionIndex}`}
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
                    form.setValue(
                      `flashcards.${flashcardIndex}.image`,
                      imageUrl
                    );
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
                <Button
                  type="button"
                  onClick={() => deleteFlashcard(flashcard.id)}
                >
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
            Добави нов въпрос
          </DefaultButton>
        </ScrollArea>

        <DefaultButton disabledText="Creating" pending={isSubmitting}>
          Създай тема
        </DefaultButton>
      </form>
    </Form>
  );
};

export default CreateForm;
