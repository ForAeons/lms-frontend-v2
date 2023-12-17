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
	const isLoggedIn = useAppSelector((s) => s.app.isLoggedIn);

	// Check backend health
	React.useEffect(() => {
		if (backendStatus === "unknown") dispatch(getHealthThunk());
	}, [dispatch, backendStatus]);

	// Check if the user has previously logged in
	React.useEffect(() => {
		if (backendStatus === "up" && !isLoggedIn) dispatch(getCurrentUserThunk());
	}, [dispatch, backendStatus, isLoggedIn]);

	return <div className="hidden" />;
};
