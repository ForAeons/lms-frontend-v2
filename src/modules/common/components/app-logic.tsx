import React from "react";
import {
	getCurrentUserThunk,
	getHealthThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";

const AppLogic: React.FC = () => {
	const dispatch = useAppDispatch();
	const backendStatus = useAppSelector((state) => state.app.backendStatus);

	// Check backend health
	React.useEffect(() => {
		dispatch(getHealthThunk());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Check if the user has previously logged in
	React.useEffect(() => {
		if (backendStatus === "up") dispatch(getCurrentUserThunk());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backendStatus]);

	return <div className="hidden"></div>;
};

export default AppLogic;
