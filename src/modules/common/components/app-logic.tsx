import React from "react";
import {
	getHealthThunk,
	getCurrentUserThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";

export const AppLogic: React.FC = () => {
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

	return <div id="app-logic" className="hidden" />;
};
