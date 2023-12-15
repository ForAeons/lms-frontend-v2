import React from "react";
import {
	getCurrentUserThunk,
	getHealthThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";

export const AppLogic: React.FC = () => {
	const dispatch = useAppDispatch();
	const backendStatus = useAppSelector((s) => s.app.backendStatus);
	const isLoggedIn = useAppSelector((s) => s.app.isLoggedIn);

	// Check backend health
	React.useEffect(() => {
		if (backendStatus === "unknown") dispatch(getHealthThunk());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Check if the user has previously logged in
	React.useEffect(() => {
		if (backendStatus === "up" && !isLoggedIn) dispatch(getCurrentUserThunk());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backendStatus, isLoggedIn]);

	return <div className="hidden" />;
};
