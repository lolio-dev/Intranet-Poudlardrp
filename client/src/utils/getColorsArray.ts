import { Colors } from "../enums/Colors";

export const getColorsArray = (): Record<string, string> => {
	const newObjet: Record<string, string> = {};

	Object.entries(Colors).forEach((color: [string, string]) => {
		newObjet[color[0].toLowerCase()] = color[1];
	});

	return newObjet;
};
