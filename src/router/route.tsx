import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import { AppLayout, PageNotFound } from "@/modules";
import { LoginPage, SignupPage } from "@/modules/auth";

export const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AppLayout />}>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="*" element={<PageNotFound />} />
		</Route>,
	),
);
