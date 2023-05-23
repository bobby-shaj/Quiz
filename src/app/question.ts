export class Question {
  id: number = 0;
  text: string | null = null;
  correctAnswer: string = '';
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  selectedAnswer: string = '';
  quizId: number | null = null;
  answers?: string[];
}
