import { selectQuestion } from "@/lib/actions/Flashcard";
import QuestionViewer from "./Components/QuestionViewer";

const Page = async () => {
  const flashcards = await selectQuestion(); // Fetch a random flashcard

  if (!flashcards) {
    return (
      <main>
        <h1>No flashcards available</h1>
      </main>
    );
  }

  return (
    <main>
      <QuestionViewer flashcards={flashcards}/>
    </main>
  );
};

export default Page;
