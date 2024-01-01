import React from "react";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { getMessage } from "@/util";

const intlCache = createIntlCache();
export let Intl = createIntl({ locale: "en", messages: {} }, intlCache);

const initialState: LanguageProviderState = {
	locale: "en",
	setLocale: () => null,
};

const LangProviderContext =
	React.createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
	children,
	defaultLocale = "en",
	storageKey = "vite-language",
	...props
}: LanguageProviderProps) {
	const [locale, setLocale] = React.useState<Locale>(
		() => (localStorage.getItem(storageKey) as Locale) || defaultLocale,
	);

	const value = {
		locale: locale,
		setLocale: (locale: Locale) => {
			localStorage.setItem(storageKey, locale);
			setLocale(locale);
		},
	};

	React.useEffect(() => {
		Intl = createIntl({ locale, messages: getMessage(locale) }, intlCache);
	}, [locale]);

	return (
		<LangProviderContext.Provider {...props} value={value}>
			<RawIntlProvider value={Intl}>{children}</RawIntlProvider>
		</LangProviderContext.Provider>
	);
}

export const useLocale = () => {
	const context = React.useContext(LangProviderContext);

	if (context === undefined)
		throw new Error("useLocale must be used within a LangProvider");

	return context;
};
