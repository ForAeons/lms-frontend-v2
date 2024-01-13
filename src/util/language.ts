import en from "../../lang/en.json";
import km from "../../lang/km.json";
import zh from "../../lang/zh.json";

export const getMessage = (locale: string): Record<string, string> => {
	switch (locale) {
		case "en":
			return en;
		case "km":
			return km;
		case "zh":
			return zh;
		default:
			return en;
	}
};
