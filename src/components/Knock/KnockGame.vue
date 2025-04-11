<template>
  <div class="full-width q-mt-md" style="max-width: 600px;">
    <!-- 解説ボタン -->
    <q-btn class="absolute-top-right q-ma-sm" label="解説" type="a" :href="currentQuiz.link" target="_blank"
      color="primary" size="lg" />

    <!-- 進捗表示 -->
    <div class="row justify-around items-center q-pa-sm">
      <div class="col text-center" style="font-size: 24px;">
        <p>{{ progress }} / {{ QUIZ_NUM }}</p>
      </div>
    </div>

    <!-- 問題文 -->
    <q-card class="q-pa-md flex column items-center">
      <div v-if="currentQuiz.questionCode.length > 0" class="full-width bg-black text-white q-px-sm rounded-borders">
        <div v-for="(code, key) in currentQuiz.questionCode" :key="key">
          <pre class="text-mono" style="font-size: 16px;">{{ code }}</pre>
        </div>
      </div>
      <p class="q-mt-sm text-left full-width" style="font-size: 20px;">{{ currentQuiz.questionText }}</p>
    </q-card>

    <!-- 選択肢ボタン -->
    <div v-for="(value, key) in currentQuiz.options" :key="key" class="q-mt-sm flex column items-center full-width">
      <q-btn :label="`${key} : ${value}`" @click="handleClickOption(key)" style="text-transform: none;"
        class="full-width" color="primary" size="lg" />
    </div>

    <!-- 回答後の表示エリア（未回答時は空白） -->
    <div class="flex column justify-center">
      <div class="q-mt-sm row items-center" style="min-height: 60px;"
        :style="{ visibility: chosenAnswer ? 'visible' : 'hidden' }">

        <!-- 回答部分 -->
        <div class="col-6 text-bold text-center">
          <pre style="font-size: 24px;"
            :class="isCorrect ? 'text-blue' : 'text-red'">{{ isCorrect ? "正解！" : "不正解" }}（ 答え：{{ currentQuiz.answer }} ）</pre>
        </div>

        <!-- ボタン部分 -->
        <div class="col-6 flex justify-center">
          <q-btn v-if="progress === QUIZ_NUM" label="Reset" @click="handleClickReset" color="orange" size="lg"
            class="full-width" />
          <q-btn v-else label="Next" @click="handleClickNext" color="secondary" size="lg" class="full-width" />
        </div>
      </div>
    </div>

    <!-- 正解数（最終問題の回答後表示） -->
    <div class="q-mt-md col text-bold text-center" style="font-size: 24px;">
      <p :style="{ visibility: progress === QUIZ_NUM && chosenAnswer ? 'visible' : 'hidden' }">
        正解数：{{ correctNum }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from 'src/stores/GameStateStore';
import { storeToRefs } from 'pinia';
import { QUIZ_NUM } from 'src/constants';

const gameStateStore = useGameStateStore();
const { currentQuiz, progress, chosenAnswer, isCorrect, correctNum } = storeToRefs(gameStateStore);

const handleClickOption = (ans: 'a' | 'b' | 'c' | 'd'): void => {
  if (chosenAnswer.value) return;
  chosenAnswer.value = ans;
  gameStateStore.countCorrectNum();
};

const handleClickNext = (): void => {
  gameStateStore.setCurrentQuiz();
};

const handleClickReset = (): void => {
  gameStateStore.reset();
};

defineOptions({
  name: 'KnockGame',
});
</script>
