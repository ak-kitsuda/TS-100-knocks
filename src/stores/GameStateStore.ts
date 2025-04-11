import { defineStore } from 'pinia';
import type { Quiz } from 'src/types/Quiz';
import { computed, onMounted, ref } from 'vue';
import { TS_QUIZ_LIST, QUIZ_NUM } from '../constants';

export const useGameStateStore = defineStore('gameStateStore', () => {
  const currentQuizList = ref<Quiz[]>(TS_QUIZ_LIST);
  const currentQuiz = ref<Quiz>(TS_QUIZ_LIST[0] as Quiz);
  const progress = ref<number>(0);
  const correctNum = ref<number>(0);

  const chosenAnswer = ref<'a' | 'b' | 'c' | 'd' | ''>('');
  const isCorrect = computed<boolean>(() => chosenAnswer.value === currentQuiz.value.answer);

  const setCurrentQuizList = (): void => {
    // Fisher-Yatesアルゴリズム
    const shuffledArray: Quiz[] = [...TS_QUIZ_LIST];
    for (let i = TS_QUIZ_LIST.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j] as Quiz, shuffledArray[i] as Quiz];
    }
    currentQuizList.value = [...shuffledArray].slice(0, QUIZ_NUM);
  };

  const setCurrentQuiz = (): void => {
    progress.value++;
    currentQuiz.value = currentQuizList.value[progress.value - 1] as Quiz;
    chosenAnswer.value = '';
  };

  const countCorrectNum = (): void => {
    if (isCorrect.value) {
      correctNum.value++;
    }
  };

  const reset = (): void => {
    progress.value = 0;
    correctNum.value = 0;
    setCurrentQuizList();
    setCurrentQuiz();
  };

  // currentQuizList & currentQuiz初期化
  onMounted(() => {
    setCurrentQuizList();
    setCurrentQuiz();
  });

  return {
    setCurrentQuiz,
    countCorrectNum,
    reset,
    progress,
    correctNum,
    currentQuiz,
    chosenAnswer,
    isCorrect,
  };
});
