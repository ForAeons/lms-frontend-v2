import React from "react";
import { Outlet } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getHealthThunk, useAppDispatch, useAppSelector } from "@/store";
import { Footer, Navbar, Sidebar } from "..";

export const AppLayout: React.FC = () => {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(getHealthThunk());
	}, []);

	const backendStatus = useAppSelector((state) => state.app.backendStatus);

	const { toast } = useToast();
	React.useEffect(() => {
		if (backendStatus === "down") {
			toast({
				variant: "destructive",
				title: "Backend is down",
				description: "The backend is currently down. Please try again later.",
			});
		}
	}, [backendStatus]);

	return (
		<div className="relative min-h-[calc(100vh+1px)] w-full flex flex-col items-center">
			<Navbar />

			<div className="flex-grow flex w-full h-full gap-3 justify-center">
				<Sidebar />

				<div className="flex-grow">
					<Outlet />
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default AppLayout;
