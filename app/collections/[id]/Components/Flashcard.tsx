
import { Button } from "@/components/ui/button";
import { Flashcard } from "@prisma/client";
import { motion } from "framer-motion";
import { IoBulbOutline } from "react-icons/io5";

interface Props {
  showAnswer: boolean;
  showHint: boolean;
  toggleCard: () => void;
  toggleHint: () => void;
  currentFlashcard: Flashcard;
}

const FlashcardComponent = ({ showAnswer, showHint, toggleCard, toggleHint, currentFlashcard }: Props) => {
  return (
    <motion.div 
    className="w-full h-[18rem] mt-16 bg-card bg-opacity-75 flex flex-col items-center justify-center cursor-pointer rounded-md shadow-lg text-xl text-center p-4 relative"
    onClick={toggleCard}
    initial={{ rotateX: 0 }}
    animate={{ rotateX: showAnswer ? 180 : 0 }}
    transition={{ duration: 0.4}} 
    // style={{ transformStyle: "preserve-3d" }}
  >
    <div className={`${showAnswer ? "rotate-180" : ""} text-slate-600`}>
      {showAnswer ? currentFlashcard.answer : currentFlashcard.question}
    </div>
    
    {(!showAnswer && !!currentFlashcard.hint) && ( 
      <div className="absolute top-4 right-4 w-full">
        <Button className="bg-transparent shadow-none" onClick={(e) => {
          e.stopPropagation(); // Prevent 
          toggleHint();
        }}>
          {showHint ? (
            <div className="inline-flex gap-2">
             <IoBulbOutline /> 
            <p>{currentFlashcard.hint}</p> 

            </div>
            ): "Get a hint"}
        </Button>
      </div>
    )}
  </motion.div>
  )
}

export default FlashcardComponent