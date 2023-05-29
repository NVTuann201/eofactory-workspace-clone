/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
// Plugins
import { registerPlugins } from '@/plugins'
const app = createApp(App)
app.use(Vuex);
app.use(VueCookies);
registerPlugins(app)

app.mount('#app')
