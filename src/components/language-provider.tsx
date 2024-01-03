import React from "react";
import { createIntl, createIntlCache, IntlProvider } from "react-intl";
import { getMessage } from "@/util";
import { translations, Translator } from "@/util/translation";

const intlCache = createIntlCache();
const temp = createIntl({ locale: "en", messages: {} }, intlCache);
const tempTranslator = translations(temp);

// I need Intl to be globally available, even inside redux stores
export const IntlWrapper = {
	intl: temp,
	translator: tempTranslator,
};

interface LanguageProviderState {
	locale: Locale;
	translator: Translator;
	setLocale: (Locale: Locale) => void;
}

const initialState: LanguageProviderState = {
	locale: "en",
	translator: tempTranslator,
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
	const intl = createIntl({ locale, messages }, intlCache);
	const translator = React.useMemo(() => translations(intl), [locale]);

	const value = {
		locale,
		translator,
		setLocale: (locale: Locale) => {
			localStorage.setItem(storageKey, locale);
			setLocale(locale);
		},
	};

	React.useEffect(() => {
		IntlWrapper.intl = intl;
		IntlWrapper.translator = translator;
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

export const useTranslations = () => {
	const { translator } = useLocale();
	return translator;
};
