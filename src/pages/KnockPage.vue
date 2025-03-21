<template>
  <q-page class="flex items-center column q-pa-md">
    <div v-if="currentStateStore.currentQuiz" class="full-width q-mt-md" style="max-width: 600px;">
      <!-- 解説ボタン -->
      <q-btn class="absolute-top-right q-ma-sm" label="解説" type="a" :href="currentStateStore.currentQuiz.link"
        target="_blank" color="primary" size="lg" />

      <!-- 進捗表示・回答結果・正解数を横並び -->
      <div class="row justify-around items-center q-pa-sm">

        <!-- 進捗表示 -->
        <div class="col text-h6 text-center">
          <p>{{ currentStateStore.progress }} / {{ QUIZ_NUM }}</p>
        </div>
      </div>

      <!-- 問題文 -->
      <q-card class="q-mt-sm q-pa-md flex column items-center">
        <div v-if="currentStateStore.currentQuiz.questionCode"
          class="full-width bg-black text-white q-px-sm rounded-borders">
          <div v-for="(code, key) in currentStateStore.currentQuiz.questionCode" :key="key">
            <pre class="text-mono">{{ code }}</pre>
          </div>
        </div>
        <p class="text-h6 text-left full-width q-mt-sm">{{ currentStateStore.currentQuiz.questionText }}</p>
      </q-card>

      <!-- 選択肢ボタン -->
      <div v-for="(value, key) in currentStateStore.currentQuiz.options" :key="key"
        class="q-mt-sm flex column items-center full-width">
        <q-btn :label="`${key} : ${value}`" @click="handleClickOption(key)" style="text-transform: none;"
          class="full-width" color="primary" size="lg" />
      </div>

      <div class="flex column justify-center">
        <!-- 回答後の表示エリア（未回答時は空白） -->
        <div class="q-mt-sm row items-center" style="min-height: 60px;"
          :style="{ visibility: currentStateStore.isAnswered ? 'visible' : 'hidden' }">

          <!-- 回答部分 -->
          <div class="col-6 text-h5 text-bold text-center">
            <pre
              :class="isCorrect ? 'text-blue' : 'text-red'">{{ isCorrect ? "正解！" : "不正解" }}（ 答え：{{ currentStateStore.currentQuiz.answer }} ）</pre>
          </div>

          <!-- ボタン部分 -->
          <div class="col-6 flex justify-center">
            <q-btn v-if="currentStateStore.progress === QUIZ_NUM" label="Reset" @click="handleClickReset" color="orange"
              size="lg" class="full-width" />
            <q-btn v-else label="Next" @click="handleClickNext" color="secondary" size="lg" class="full-width" />
          </div>

        </div>
      </div>

      <!-- 正解数（最後の問題時のみ表示） -->
      <div class="q-mt-md col text-h3 text-bold text-center ">
        <p :style="{ visibility: currentStateStore.progress === QUIZ_NUM ? 'visible' : 'hidden' }">
          正解率：{{ currentStateStore.corrections }} %
        </p>
      </div>
    </div>

    <div v-else>
      <p>問題が設定されていません</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCurrentStateStore } from 'src/stores/CurrentStateStore';
import { ref } from 'vue';

const QUIZ_NUM: number = 100;

const currentStateStore = useCurrentStateStore();
type ansOption = 'a' | 'b' | 'c' | 'd' | null;
const chosenAns = ref<ansOption>(null);
const isCorrect = ref<boolean>(false);


const handleClickOption = (ans: Exclude<ansOption, null>): void => {
  if (currentStateStore.currentQuiz && !currentStateStore.isAnswered) {
    currentStateStore.isAnswered = true;
    chosenAns.value = ans;
    if (ans === currentStateStore.currentQuiz.answer) {
      isCorrect.value = true;
    }
    currentStateStore.progress++;
  }
  currentStateStore.judge(isCorrect.value)
}

const handleClickNext = (): void => {
  currentStateStore.setCurrentQuiz();
  currentStateStore.isAnswered = false;
  isCorrect.value = false;
  chosenAns.value = null;
}

const handleClickReset = (): void => {
  currentStateStore.reset();
  isCorrect.value = false;
  chosenAns.value = null;
};

defineOptions({
  name: 'KnockPage'
})




</script>
