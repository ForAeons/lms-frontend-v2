import {
	AdminRole,
	LibAdminRole,
	LibrarianRole,
	MemberRole,
} from "./permission";

export const LANGUAGE_SELECT_OPTIONS: SelectOption<Locale>[] = [
	{ label: "English", value: "en" },
	{ label: "ខ្មែរ", value: "km" },
];

export const LOCALE_SELECT_OPTIONS: SelectOption<Locale>[] = [
	{ label: "English 🇬🇧", value: "en" },
	{ label: "ខ្មែរ 🇰🇭", value: "km" },
];

export const ROLE_SELECT_OPTIONS = [
	AdminRole,
	LibAdminRole,
	LibrarianRole,
	MemberRole,
];

export const COLOR_SELECT_OPTIONS: ExtraSelectOption<
	Color,
	{ color: string }
>[] = [
	{ label: "Zinc", value: "zinc", color: "240 5.9% 10%" },
	{ label: "Slate", value: "slate", color: "215.4 16.3% 46.9%" },
	{ label: "Stone", value: "stone", color: "25 5.3% 44.7%" },
	{ label: "Gray", value: "gray", color: "220 8.9% 46.1%" },
	{ label: "Neutral", value: "neutral", color: "0 0% 45.1%" },
	{ label: "Red", value: "red", color: "0 72.2% 50.6%" },
	{ label: "Rose", value: "rose", color: "346.8 77.2% 49.8%" },
	{ label: "Orange", value: "orange", color: "24.6 95% 53.1%" },
	{ label: "Green", value: "green", color: "142.1 76.2% 36.3%" },
	{ label: "Blue", value: "blue", color: "221.2 83.2% 53.3%" },
	{ label: "Yellow", value: "yellow", color: "47.9 95.8% 53.1%" },
	{ label: "Violet", value: "violet", color: "262.1 83.3% 57.8%" },
];
