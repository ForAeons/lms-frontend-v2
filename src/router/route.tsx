import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import { AppLayout, PageNotFound } from "@/modules/common";
import { LoginPage } from "@/modules/auth";
import { ManageUserPage } from "@/modules/user";
import { BookPage } from "@/modules/book";

export const Router = createBrowserRouter(
	createRoutesFromElements([
		<Route key={"Signin"} path="/signin" element={<LoginPage />} />,
		<Route key={"Main"} path="/" element={<AppLayout />}>
			<Route path="/book" element={<BookPage />} />
			<Route path="/manage_user" element={<ManageUserPage />} />
			<Route path="*" element={<PageNotFound />} />
		</Route>,
	]),
);
