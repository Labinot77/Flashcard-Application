"use client";

import { ImageModal } from "@/components/Modals/ImageModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

// Helper function to shuffle options
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

interface Flashcard {
  question: string;
  options: string[];
  answer: string;
  image?: string | null;
}

interface Props {
  flashcards: Flashcard[];
}

const QuestionViewer = ({ flashcards }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard>(
    flashcards[Math.floor(Math.random() * flashcards.length)] // Select a random question
  );
  const [answerChecked, setAnswerChecked] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [lastQuestion, setLastQuestion] = useState<Flashcard | null>(null);

  const checkAnswer = (selectedOption: string) => {
    setUserAnswer(selectedOption);
    setAnswerChecked(true);
  };

  const nextQuestion = () => {
    // Filter out the last displayed question to avoid showing it again
    const availableQuestions = flashcards.filter(
      (flashcard) => flashcard !== lastQuestion
    );

    // Select a random question from the remaining available questions
    const randomFlashcard =
      availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    setCurrentFlashcard(randomFlashcard);
    setLastQuestion(randomFlashcard); // Store the current question as the last question
    setAnswerChecked(false); // Reset answer check for the new question
    setUserAnswer(null); // Reset user answer
  };

  const shuffledOptions = shuffleArray(currentFlashcard.options); // Shuffle options

  return (
    <div className="mx-auto">
      <h1 className="text-xl font-bold">{currentFlashcard.question}</h1>
      {currentFlashcard.image && (
        <div className="my-4 relative">
          <Image
            src={currentFlashcard.image}
            alt="Flashcard Image"
            layout="fill" // This makes the image take up the entire container
            objectFit="cover" // You can adjust this to `contain` if you prefer
            className="w-full h-auto rounded"
          />
        </div>
      )}

      {currentFlashcard.image && (
        <div className="h-[20vh] relative">
          <ImageModal
            src={currentFlashcard.image}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <Image
            onClick={() => setIsModalOpen(true)}
            src={currentFlashcard.image}
            fill
            alt="Image for question"
            className="object-cover object-center rounded-md transition-opacity duration-200 opacity-0 p-1 cursor-pointer"
            onLoad={(e) => {
              const image = e.currentTarget as HTMLImageElement;
              image.classList.remove("opacity-0");
            }}
          />
        </div>
      )}

      <div className="mt-4 space-y-2">
        {shuffledOptions.map((option, index) => {
          let buttonClass =
            "w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded shadow";

          if (answerChecked) {
            if (option === userAnswer) {
              buttonClass =
                option === currentFlashcard.answer
                  ? "w-full px-4 py-2 text-left bg-green-500 text-white rounded shadow"
                  : "w-full px-4 py-2 text-left bg-red-500 text-white rounded shadow";
            } else if (option === currentFlashcard.answer) {
              buttonClass =
                "w-full px-4 py-2 text-left bg-green-500 text-white rounded shadow";
            }
          }

          return (
            <Button
              key={index}
              onClick={() => checkAnswer(option)}
              className={buttonClass}
              disabled={answerChecked}
            >
              {option}
            </Button>
          );
        })}
      </div>

      {answerChecked && (
        <div className="mt-4">
          {userAnswer === currentFlashcard.answer ? (
            <p className="text-green-500">Correct Answer!</p>
          ) : (
            <p className="text-red-500">Wrong Answer!</p>
          )}
        </div>
      )}

      <div className="mt-4">
        <Button onClick={nextQuestion} className="0">
          Следващ въпрос
        </Button>
      </div>
    </div>
  );
};

export default QuestionViewer;
