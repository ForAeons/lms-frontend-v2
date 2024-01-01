type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
}

interface ThemeProviderState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

type Locale = "en" | "km" | "system";

interface LanguageProviderProps {
	children: React.ReactNode;
	defaultLocale?: Locale;
	storageKey?: string;
}

interface LanguageProviderState {
	locale: Locale;
	setLocale: (Locale: Locale) => void;
}
