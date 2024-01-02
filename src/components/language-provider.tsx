import React from "react";
import { createIntl, createIntlCache, IntlProvider } from "react-intl";
import { getMessage } from "@/util";

const intlCache = createIntlCache();
// I need Intl to be globally available, even inside redux stores
export let IntlWrapper = {
	intl: createIntl({ locale: "en", messages: {} }, intlCache),
};

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

	const messages = getMessage(locale);

	const value = {
		locale: locale,
		setLocale: (locale: Locale) => {
			localStorage.setItem(storageKey, locale);
			setLocale(locale);
		},
	};

	React.useEffect(() => {
		IntlWrapper.intl = createIntl({ locale, messages }, intlCache);
	}, [locale]);

	return (
		<LangProviderContext.Provider {...props} value={value}>
			<IntlProvider
				messages={messages}
				locale={locale}
				defaultLocale={defaultLocale}
			>
				{children}
			</IntlProvider>
		</LangProviderContext.Provider>
	);
}

export const useLocale = () => {
	const context = React.useContext(LangProviderContext);

	if (context === undefined)
		throw new Error("useLocale must be used within a LangProvider");

	return context;
};
