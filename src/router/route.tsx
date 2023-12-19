import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { AppLayout, PageNotFound } from "@/modules/common";
import { LoginPage } from "@/modules/auth";
import { ManageUserPage } from "@/modules/user";
import { BookIndexPage, BookPage, ManageBookPage } from "@/modules/book";
import { LoanPage } from "@/modules/loan";

export const Router = createBrowserRouter(
	createRoutesFromElements([
		<Route key={"Signin"} path="/signin" element={<LoginPage />} />,
		<Route key={"Main"} path="/" element={<AppLayout />}>
			<Route path="/book" element={<BookIndexPage />} />
			<Route path="/book/:book_id" element={<BookPage />} />
			<Route path="/manage_book" element={<ManageBookPage />} />

			<Route path="/loan" element={<LoanPage />} />
			<Route path="/manage_user" element={<ManageUserPage />} />

			<Route path="*" element={<PageNotFound />} />
		</Route>,
	]),
);
