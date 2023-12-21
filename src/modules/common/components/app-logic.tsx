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
		if (backendStatus === "unknown") dispatch(getHealthThunk());
	}, [dispatch, backendStatus]);

	// Check if the user has previously logged in
	React.useEffect(() => {
		if (backendStatus === "up" && !hasFetchedUser)
			dispatch(getCurrentUserThunk());
	}, [dispatch, backendStatus, hasFetchedUser]);

	return <div className="hidden" />;
};
