import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
      path: "/",
      name: 'home',
      component: () => import('../views/Page1View.vue'),  // Dynamic import
      meta: {
          prevPage: "8",
          nextPage: "2",
          title: "ආරම්භක යාච්ඤාව",
          audio: "/audio/1.mp3"
      },
  },
  {
      path: "/1",
      name: 'page1',
      component: () => import('../views/Page1View.vue'),  // Dynamic import
      meta: {
          prevPage: "8",
          nextPage: "2",
          title: "ආරම්භක යාච්ඤාව",
          audio: "/audio/1.mp3"
      },
  },
  {
      path: "/2",
      name: 'page2',
      component: () => import('../views/Page2View.vue'),  // Dynamic import
      meta: {
          prevPage: "1",
          nextPage: "3",
          title: "සිත් පිරිසිදු කිරීමේ යැදුම",
          audio: "/audio/2.mp3"
      },
  },
  {
      path: "/3",
      name: 'page3',
      component: () => import('../views/Page3View.vue'),  // Dynamic import
      meta: {
          prevPage: "2",
          nextPage: "4",
          title: "ආඥා සාරාංශය කියවීම",
          audio: "/audio/3.mp3"          
      },
  },
  {
      path: "/4",
      name: 'page4',
      component: () => import('../views/Page4View.vue'),  // Dynamic import
      meta: {
          prevPage: "3",
          nextPage: "5",
          title: "ආරාධනාව",
          audio: "/audio/4.mp3"
      },
  },
  {
      path: "/5",
      name: 'page5',
      component: () => import('../views/Page5View.vue'),  // Dynamic import
      meta: {
          prevPage: "4",
          nextPage: "6",
          title: "පාපොච්චාරණය",
          audio: "/audio/5.mp3"
      },
  },
  {
      path: "/6",
      name: 'page6',
      component: () => import('../views/Page6View.vue'),  // Dynamic import
      meta: {
          prevPage: "5",
          nextPage: "7",
          title: "දවසේ දේව වචනය",
      },
  },
  {
      path: "/7",
      name: 'page7',
      component: () => import('../views/Page7View.vue'),  // Dynamic import
      meta: {
          prevPage: "6",
          nextPage: "8",
          title: "සමිඳු පැසසුම",
      },
  },
  {
      path: "/8",
      name: 'page8',
      component: () => import('../views/Page8View.vue'),  // Dynamic import
      meta: {
          prevPage: "7",
          nextPage: "1",
          title: "දවසේ යාච්ඤාව",
      },
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
