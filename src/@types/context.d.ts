type Theme = "dark" | "light" | "system";

type Color =
	| "zinc"
	| "slate"
	| "stone"
	| "gray"
	| "neutral"
	| "red"
	| "rose"
	| "orange"
	| "green"
	| "blue"
	| "yellow"
	| "violet";

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: Theme;
	defaultColor?: Color;
	storageKey?: string;
}

interface ThemeProviderState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	color: Color;
	setColor: (color: Color) => void;
}

type Locale = "en" | "km" | "zh" | "ta" | "ko" | "ja" | "ms";

interface LanguageProviderProps {
	children: React.ReactNode;
	defaultLocale?: Locale;
	storageKey?: string;
}

interface LanguageProviderState {
	locale: Locale;
	setLocale: (Locale: Locale) => void;
}
