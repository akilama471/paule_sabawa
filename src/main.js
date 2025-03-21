import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/style.css'
import "animate.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faArrowRight);

const app = createApp(App)

app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
