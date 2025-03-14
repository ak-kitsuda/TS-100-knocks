import AnswerPage from 'src/pages/AnswerPage.vue';
import KnockPage from 'src/pages/KnockPage.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: KnockPage },
      { path: 'answer', component: AnswerPage }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
