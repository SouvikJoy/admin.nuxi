import { createApp as createVueApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/sass/tailwind.scss';
import plugins from '@/plugins';


import 'mosha-vue-toastify/dist/style.css';

// eslint-disable-next-line no-unused-vars
const createApp = (ssr = false) => {
    const app = createVueApp(App);

    app.use(router);
    app.use(store);


    app.use(plugins);

    return {
        app
    };
};

const { app } = createApp(false);

router.isReady().then(() => app.mount('#app'));

