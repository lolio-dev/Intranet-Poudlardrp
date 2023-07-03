import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { router } from './router';
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import Datepicker from '@vuepic/vue-datepicker';
import "vue-toastification/dist/index.css";
import '@vuepic/vue-datepicker/dist/main.css'
import './style.scss';
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiDiscord, GiTavernSign, FaShieldAlt, IoPersonSharp, BiStopwatchFill, RiHotelBedFill, MdBloodtype } from "oh-vue-icons/icons";

loadFonts().then();

const app = createApp(App);

const pinia = createPinia();
const toastOptions: PluginOptions = {
	position: POSITION.BOTTOM_RIGHT
};

addIcons(BiDiscord, GiTavernSign, FaShieldAlt, IoPersonSharp, BiStopwatchFill, RiHotelBedFill, MdBloodtype);

app.component('Vicon', OhVueIcon);
app.component('Datepicker', Datepicker);

app.use(vuetify);
app.use(router);
app.use(pinia);
app.use(Toast, toastOptions);

app.mount('#app');
