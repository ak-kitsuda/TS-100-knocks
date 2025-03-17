import { defineStore } from 'pinia';
import type { Quiz } from 'src/types/Quiz';
import { onMounted, ref } from 'vue';
import { useQuizStore } from './QuizStore';
//import { nextTick } from "process";

export const useCurrentStateStore = defineStore('currentStateStore', () => {
  const quizStore = useQuizStore();

  const progress = ref<number>(0);
  const corrections = ref<number>(0);
  const currentQuiz = ref<Quiz>();
  const isAnswered = ref<boolean>(false);

  const setCurrentQuiz = (): void => {
    const availableQuizzes = quizStore.quizList.filter((quiz) => !quiz.isShowed);

    if (availableQuizzes.length !== 0) {
      const i = Math.floor(Math.random() * availableQuizzes.length);
      currentQuiz.value = availableQuizzes[i];
      if (currentQuiz.value) currentQuiz.value.isShowed = true;
    } else {
      currentQuiz.value = undefined;
    }
  };

  const judge = (isCorrect: boolean): void => {
    if (isCorrect) {
      corrections.value++;
    }
  };

  const reset = (): void => {
    isAnswered.value = false;
    progress.value = 0;
    corrections.value = 0;
    quizStore.reset();
    setCurrentQuiz();
  };

  // nowQuiz初期化
  onMounted(() => {
    setCurrentQuiz();
  });

  return {
    judge,
    reset,
    setCurrentQuiz,
    progress,
    corrections,
    currentQuiz,
    isAnswered,
  };
});
