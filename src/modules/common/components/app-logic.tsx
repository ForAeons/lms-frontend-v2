import React from "react";
import { IntlProvider } from "react-intl";
import {
	getHealthThunk,
	getCurrentUserThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { useLocale } from "@/components/language-provider";
import { getMessage } from "@/util";

export const AppLogic: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	const dispatch = useAppDispatch();
	const backendStatus = useAppSelector((s) => s.app.backendStatus);
	const hasFetchedUser = useAppSelector((s) => s.app.hasFetchedUser);

	// Check backend health
	React.useEffect(() => {
		const c = new AbortController();
		if (backendStatus !== "unknown") return;
		dispatch(getHealthThunk(c.signal));
		return () => c.abort();
	}, [dispatch, backendStatus]);

	// Check if the user has previously logged in
	React.useEffect(() => {
		const c = new AbortController();
		if (backendStatus !== "up" || hasFetchedUser) return;
		dispatch(getCurrentUserThunk(c.signal));
		return () => c.abort();
	}, [dispatch, backendStatus, hasFetchedUser]);

	const { locale } = useLocale();
	const messages = getMessage(locale);

	return (
		<IntlProvider locale={locale} messages={messages}>
			{children}
		</IntlProvider>
	);
};
