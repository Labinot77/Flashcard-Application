"use client"

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import { Button } from "@/components/ui/button";
import { Flashcard } from "@prisma/client";

interface Props {
  currentIndex: number;
  flashcards: Flashcard[];
  prevFlashcard: () => void;  
  nextFlashcard: () => void;
}

const FlashcardNavigation = ({ currentIndex, flashcards, prevFlashcard, nextFlashcard }: Props) => {
  return (
    <div className="gap-2 flex flex-col justify-center mt-4">
    <p className="w-full text-center text-slate-400 ">
    {currentIndex + 1}/{flashcards.length}
    </p>
    <div className="flex w-full justify-center gap-4">
      <Button onClick={prevFlashcard} disabled={currentIndex === 0}>
        Previous
      </Button>
      <Button onClick={nextFlashcard} disabled={currentIndex === flashcards.length - 1}>
        Next
      </Button>
    </div>

    </div>
  )
}

export default FlashcardNavigation