import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import { AppLayout, PageNotFound } from "@/modules";
import { LoginPage, SignupPage } from "@/modules/auth";
import { BookPage } from "@/modules/book";

export const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AppLayout />}>
			<Route path="/signin" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/book" element={<BookPage />} />
			<Route path="*" element={<PageNotFound />} />
		</Route>,
	),
);
