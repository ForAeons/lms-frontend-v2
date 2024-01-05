import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/store";
import { PleaseLoginPage } from "..";

export const RequireSignInLogic: React.FC = () => {
	const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn);

	if (!isLoggedIn) return <PleaseLoginPage />;

	return <Outlet />;
};
