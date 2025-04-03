import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: 'home',
        component: () => import('../views/HomeView.vue'),  // Dynamic import
    },{
        path: "/about",
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: { requiresOnline: true },
    }, {
        path: "/video",
        name: 'video',
        component: () => import('../views/VideoView.vue'),
        meta: { requiresOnline: true },
    }, {
        path: "/book/:pageId", // Dynamic Route
        name: "book",
        component: () => import("../views/BookView.vue"),
        props: true, // Enable route params
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresOnline && !navigator.onLine) {
        alert("This page requires an internet connection.");
        next('/'); // Prevent navigation
    } else {
        next(); // Allow navigation
    }
});

export default router;