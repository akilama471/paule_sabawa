/**
 * @fileoverview Paule Sabawa Mobile App - Vue + Ionic Capacitor
 * @description This file is part of the open-source mobile application "Paule Sabawa".
 *
 * @author Akila Madhushanka
 * @company NextGenWare
 * @email nextgenwarelk@gmail.com
 * @created 2025-06-02
 * @license MIT
 *
 * Copyright (c) 2025 NextGenWare. All rights reserved.
 * This project is released under the MIT License.
 * See LICENSE file in the root of the repository.
 */

import { Capacitor } from '@capacitor/core';
import { createApp } from 'vue';
import { createPinia } from "pinia";

import App from './App.vue';
import router from './router';

import './assets/style.css';
import "animate.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faArrowRight, faHouse , faDownload,faVideo, faBookOpen} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faArrowRight, faHouse, faDownload, faVideo, faBookOpen);

const app = createApp(App)
app.use(createPinia());
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
