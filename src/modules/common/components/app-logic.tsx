import React from "react";
import { useToast } from "@/components/ui/use-toast";
import {
	getCurrentUserThunk,
	getHealthThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";

const AppLogic: React.FC = () => {
	const dispatch = useAppDispatch();
	const backendStatus = useAppSelector((state) => state.app.backendStatus);
	const { toast } = useToast();

	// Check backend health
	React.useEffect(() => {
		dispatch(getHealthThunk());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// notify user if backend is not available
	React.useEffect(() => {
		if (backendStatus !== "down") return;
		toast({
			variant: "destructive",
			title: "Backend is down",
			description: "The backend is currently down. Please try again later.",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backendStatus]);

	// Check if the user has previously logged in
	React.useEffect(() => {
		if (backendStatus !== "up") return;
		dispatch(getCurrentUserThunk());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backendStatus]);

	return <div className="hidden"></div>;
};

export default AppLogic;
