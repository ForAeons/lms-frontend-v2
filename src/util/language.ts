import en from "../../lang/en.json";
import km from "../../lang/km.json";

export const getMessage = (locale: string) => {
	switch (locale) {
		case "en":
			return en;
		case "km":
			return km;
		default:
			return en;
	}
};
