"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ImageModal } from "@/components/Modals/ImageModal";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collection } from "@prisma/client";

interface Flashcard {
  id: string;
  question: string;
  options: string[];
  answer: string;
  image?: string | null;
}

interface FlashcardsViewerProps {
  flashcards: Flashcard[];
  collection: Collection;
}

// Utility function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const FlashcardsViewer = ({ flashcards, collection }: FlashcardsViewerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Map<string, string>>(new Map());
  const [submitted, setSubmitted] = useState(false);

  // Shuffle questions and options on initial load
  const [shuffledFlashcards, setShuffledFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const shuffled = shuffleArray(
      flashcards.map((flashcard) => ({
        ...flashcard,
        options: shuffleArray(flashcard.options), // Shuffle options for each flashcard
      }))
    );
    setShuffledFlashcards(shuffled); // Shuffle the entire list of flashcards
  }, [flashcards]);

  const form = useForm({
    defaultValues: shuffledFlashcards.reduce<Record<string, string>>((acc, flashcard) => {
      acc[flashcard.id] = ""; // Initialize empty string for each flashcard's ID
      return acc;
    }, {}),
  });

  const onSubmit = async (values: any) => {
    setUserAnswers(new Map(Object.entries(values)));
    setSubmitted(true); // Mark form as submitted
  };

  return (
    <ScrollArea className="pr-4 h-full rounded-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-2xl">{collection.title}</h1>
          {shuffledFlashcards.map((flashcard) => (
            <div key={flashcard.id} className="space-y-4 p-4 border rounded-md">
              <div className="text-xl mb-2">{flashcard.question}</div>

              {flashcard.image && (
                <div className="h-[20vh] relative">
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

              <FormField
                control={form.control}
                name={flashcard.id}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2">
                        {flashcard.options.map((option, index) => {
                          const isSelected = userAnswers.get(flashcard.id) === option;
                          const isCorrect = option === flashcard.answer;

                          return (
                            <label
                              key={index}
                              className={`block cursor-pointer p-2 rounded-md ${
                                isSelected && submitted
                                  ? isCorrect
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                  : isCorrect && submitted
                                  ? "bg-green-500"
                                  : ""
                              }`}
                            >
                              <input
                                type="radio"
                                {...field}
                                value={option}
                                className="mr-2"
                                disabled={submitted}
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="mt-6">
            <Button type="submit" className="w-full bg-blue-500 text-white">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default FlashcardsViewer;
