import en from "../../lang/en.json";
import km from "../../lang/km.json";
import zh from "../../lang/zh.json";
import ko from "../../lang/ko.json";
import ja from "../../lang/ja.json";

export const getMessage = (locale: string): Record<string, string> => {
	switch (locale) {
		case "en":
			return en;
		case "km":
			return km;
		case "zh":
			return zh;
		case "ko":
			return ko;
		case "ja":
			return ja;
		default:
			return en;
	}
};
