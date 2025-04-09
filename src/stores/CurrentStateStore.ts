import { defineStore } from 'pinia';
import type { Quiz } from 'src/types/Quiz';
import { computed, onMounted, ref } from 'vue';
import { useQuizStore } from './QuizStore';

export const useCurrentStateStore = defineStore('currentStateStore', () => {
  const quizStore = useQuizStore();

  const QUIZ_NUM: number = 100;
  const currentQuiz = ref<Quiz>();
  const progress = ref<number>(0);
  const corrections = ref<number>(0);

  const chosenAnswer = ref<'a' | 'b' | 'c' | 'd' | ''>('');
  const isCorrect = computed<boolean>(() => {
    if (currentQuiz.value) {
      return currentQuiz.value.answer === chosenAnswer.value;
    }
    return false;
  });

  const setCurrentQuiz = (): void => {
    const availableQuizzes = quizStore.quizList.filter((quiz) => !quiz.isShowed);

    if (availableQuizzes.length == 0) {
      currentQuiz.value = undefined;
      console.log('クイズがありません');
    } else {
      const i = Math.floor(Math.random() * availableQuizzes.length);
      currentQuiz.value = availableQuizzes[i];
      if (currentQuiz.value) currentQuiz.value.isShowed = true;
      progress.value++;
      chosenAnswer.value = '';
    }
  };

  const countCorrectNum = (): void => {
    if (isCorrect.value) {
      corrections.value++;
    }
  };

  const reset = (): void => {
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
    countCorrectNum,
    reset,
    setCurrentQuiz,
    QUIZ_NUM,
    progress,
    corrections,
    currentQuiz,
    chosenAnswer,
    isCorrect,
  };
});
