"use client";

import { useEffect, useState } from "react";
import { Flashcard, User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { getMostRecentDate } from "@/lib/Misc";
import { useRouter, useSearchParams } from "next/navigation";
import FlashcardComponent from "./Flashcard";
import FlashcardNavigation from "./FlashcardNavigation";
import FlashcardMisc from "./FlashcardMisc";
import { CollectionToUserExtended } from "@/types/types";

interface Props {
  flashcards: Flashcard[];
  collection: CollectionToUserExtended;
  currentUser: User;
}

const FlashcardViewer = ({ flashcards, collection, currentUser }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shuffledFlashcards, setShuffledFlashcards] = useState<Flashcard[]>(flashcards);
  const searchParams = useSearchParams();
  const router = useRouter();

  const recentTime = getMostRecentDate(collection.createdAt, collection.updatedAt);
  const currentFlashcard = shuffledFlashcards[currentIndex];

  useEffect(() => {
    const randomized = searchParams.get("randomized") === "true";
    if (randomized) {
      setShuffledFlashcards([...flashcards].sort(() => Math.random() - 0.5));
    } else {
      setShuffledFlashcards(flashcards);
    }
    
    setCurrentIndex(0);
    setShowAnswer(false);
    setShowHint(false);
  }, [searchParams, flashcards]);

  const toggleCard = () => {
    setShowAnswer((prev) => !prev);
    setShowHint(false);
  };

  const toggleHint = () => setShowHint((prev) => !prev);

  const nextFlashcard = () => {
    const lastFlashcard = flashcards.length - 1;
    if (currentIndex < lastFlashcard) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
      setShowHint(false);
    }
  };

  const prevFlashcard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowAnswer(false);
      setShowHint(false);
    }
  };

  const randomizeFlashcards = () => {
    const isShuffled = searchParams.get("randomized") === "true";
    if (!isShuffled) {
      setShuffledFlashcards([...flashcards].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      setShowAnswer(false);
      setShowHint(false);
      router.push(`/collections/${collection.id}?randomized=true`);
    } else {
      setShuffledFlashcards(flashcards);
      setCurrentIndex(0);
      setShowAnswer(false);
      setShowHint(false);
      router.push(`/collections/${collection.id}`);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-4xl">{collection.title}</h1>
      <div className="w-full lg:w-[90%]">
        <FlashcardComponent
          showAnswer={showAnswer}
          showHint={showHint}
          toggleCard={toggleCard}
          toggleHint={toggleHint}
          currentFlashcard={currentFlashcard}
        />

        <FlashcardNavigation
          flashcards={shuffledFlashcards}
          currentIndex={currentIndex}
          prevFlashcard={prevFlashcard}
          nextFlashcard={nextFlashcard}
        />

        <Separator className="mt-6 mb-6" />

        <FlashcardMisc   
          onRandomize={randomizeFlashcards}
          recentTime={recentTime} 
          collection={collection}
          currentUser={currentUser} />
      </div>
    </div>
  );
};

export default FlashcardViewer;
