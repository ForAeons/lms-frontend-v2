import { createContext, useContext, useState } from "react";

const initialState: LanguageProviderState = {
	locale: "system",
	setLocale: () => null,
};

const LangProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
	children,
	defaultLocale = "system",
	storageKey = "vite-language",
	...props
}: LanguageProviderProps) {
	const [locale, setLocale] = useState<Locale>(
		() => (localStorage.getItem(storageKey) as Locale) || defaultLocale,
	);

	const value = {
		locale: locale,
		setLocale: (locale: Locale) => {
			localStorage.setItem(storageKey, locale);
			setLocale(locale);
		},
	};

	return (
		<LangProviderContext.Provider {...props} value={value}>
			{children}
		</LangProviderContext.Provider>
	);
}

export const useLocale = () => {
	const context = useContext(LangProviderContext);

	if (context === undefined)
		throw new Error("useLocale must be used within a LangProvider");

	return context;
};
