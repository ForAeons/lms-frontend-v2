import {
	AdminRole,
	LibAdminRole,
	LibrarianRole,
	MemberRole,
} from "./permission";

export const LANGUAGE_SELECT_OPTIONS: SelectOption[] = [
	{ label: "English", value: "en" },
	{ label: "ខ្មែរ", value: "km" },
];

export const LOCALE_SELECT_OPTIONS: LanguageSelectOption[] = [
	{ label: "🇬🇧 English ", value: "en" },
	{ label: "🇰🇭 ខ្មែរ", value: "km" },
];

export const ROLE_SELECT_OPTIONS = [
	AdminRole,
	LibAdminRole,
	LibrarianRole,
	MemberRole,
];
