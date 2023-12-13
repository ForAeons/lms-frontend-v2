import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logoutThunk, useAppDispatch, useAppSelector } from "@/store";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export const Sidebar: React.FC = () => {
	const appState = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { toast } = useToast();
	const loginStatus = useAppSelector((state) => state.app.loginStatus);
	React.useEffect(() => {
		if (loginStatus === "loggedOut") {
			toast({
				title: "Sign out Successful",
				description: "You are now signed out.",
			});
			navigate("/signin");
		}
	}, [loginStatus]);

	const cln = appState.showSideBar ? "flex" : "hidden";

	return (
		<div className={`flex-col items-start min-w-fit ${cln} lg:flex`}>
			{appState.loginStatus === "loggedIn" && (
				<Button
					variant={"link"}
					size="sm"
					onClick={() => dispatch(logoutThunk())}
				>
					<small className="text-sm font-medium leading-none">Sign Out</small>
					<span className="sr-only">Sign Out</span>
				</Button>
			)}

			{appState.loginStatus !== "loggedIn" && (
				<Button variant={"link"} size="sm" onClick={() => navigate("/signin")}>
					<small className="text-sm font-medium leading-none">Sign In</small>
					<span className="sr-only">Sign In</span>
				</Button>
			)}

			<p className="text-sm text-muted-foreground px-3 mt-5">Resources</p>
			<Separator className="mx-3" />

			<Button variant={"link"} size="sm" onClick={() => navigate("/book")}>
				<small className="text-sm font-medium leading-none">Books</small>
				<span className="sr-only">Link Description</span>
			</Button>

			<Button
				variant={"link"}
				size="sm"
				onClick={() => navigate("/reservation")}
			>
				<small className="text-sm font-medium leading-none">Reservations</small>
				<span className="sr-only">Link Description</span>
			</Button>

			<Button variant={"link"} size="sm" onClick={() => navigate("/loan")}>
				<small className="text-sm font-medium leading-none">Loans</small>
				<span className="sr-only">Link Description</span>
			</Button>

			<Button variant={"link"} size="sm" onClick={() => navigate("/fine")}>
				<small className="text-sm font-medium leading-none">Fines</small>
				<span className="sr-only">Link Description</span>
			</Button>

			<p className="text-sm text-muted-foreground px-3 mt-5">Admin</p>
			<Separator className="mx-3" />

			<Button variant={"link"} size="sm" onClick={() => navigate("/link1")}>
				<small className="text-sm font-medium leading-none">Manage User</small>
				<span className="sr-only">Link Description</span>
			</Button>

			<Button variant={"link"} size="sm" onClick={() => navigate("/link1")}>
				<small className="text-sm font-medium leading-none">Manage Book</small>
				<span className="sr-only">Link Description</span>
			</Button>

			<Button variant={"link"} size="sm" onClick={() => navigate("/link1")}>
				<small className="text-sm font-medium leading-none">
					Manage Reservation
				</small>
				<span className="sr-only">Link Description</span>
			</Button>

			<Button variant={"link"} size="sm" onClick={() => navigate("/link1")}>
				<small className="text-sm font-medium leading-none">Manage Loan</small>
				<span className="sr-only">Link Description</span>
			</Button>

			<Button variant={"link"} size="sm" onClick={() => navigate("/link1")}>
				<small className="text-sm font-medium leading-none">Manage Fine</small>
				<span className="sr-only">Link Description</span>
			</Button>
		</div>
	);
};

export default Sidebar;
