import '../styles/vuetify.scss';
import { createVuetify } from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { md } from 'vuetify/iconsets/md';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { getColorsArray } from "../utils/getColorsArray";

export default createVuetify({
	theme: {
		themes: {
			light: {
				dark: false,
				colors: getColorsArray()
			},
		}
	},
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			md, mdi,
		}
	},
});
