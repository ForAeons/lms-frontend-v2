import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { AppLayout, PageNotFound } from "@/modules/common";
import { LoginPage } from "@/modules/auth";
import { ManageUserPage } from "@/modules/user";
import {
	BookIndexPage,
	BookListPage,
	BookPage,
	ManageBookPage,
} from "@/modules/book";
import { LoanPage, ManageLoanPage } from "@/modules/loan";
import { ManageResPage, ResPage } from "@/modules/reservation";
import { FinePage, ManageFinePage } from "@/modules/fine";
import { AuditLogPage } from "@/modules/auditlog";

export const Router = createBrowserRouter(
	createRoutesFromElements([
		<Route key={"Signin"} path="/signin" element={<LoginPage />} />,
		<Route key={"Main"} path="/" element={<AppLayout />}>
			<Route path="/" element={<BookIndexPage />} />
			<Route path="/book" element={<BookListPage />} />
			<Route path="/book/:book_id" element={<BookPage />} />
			<Route path="/loan" element={<LoanPage />} />
			<Route path="/reservation" element={<ResPage />} />
			<Route path="/fine" element={<FinePage />} />

			<Route path="/manage/user" element={<ManageUserPage />} />
			<Route path="/manage/book" element={<ManageBookPage />} />
			<Route path="/manage/loan" element={<ManageLoanPage />} />
			<Route path="/manage/reservation" element={<ManageResPage />} />
			<Route path="/manage/fine" element={<ManageFinePage />} />
			<Route path="/manage/audit_log" element={<AuditLogPage />} />

			<Route path="*" element={<PageNotFound />} />
		</Route>,
	]),
);
