import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import { AppLayout, PageNotFound } from "@/modules";
import { LoginPage, SignupPage } from "@/modules/auth";
import { BookPage } from "@/modules/book";
import ManageUserPage from "@/modules/user/page/manage-user-page";

export const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AppLayout />}>
			<Route path="/signin" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />

			<Route path="/book" element={<BookPage />} />

			<Route path="/manage_user" element={<ManageUserPage />} />
			<Route path="*" element={<PageNotFound />} />
		</Route>,
	),
);
