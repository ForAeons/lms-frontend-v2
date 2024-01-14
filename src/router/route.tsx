import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import {
	AppLayout,
	OnMountLogic,
	PageNotFound,
	RequireSignInLogic,
} from "@/modules/common";
import { SigninPage } from "@/modules/auth";
import { ManageUserPage, SignupPage } from "@/modules/user";
import {
	BookIndexPage,
	BookPage,
	BookmarkPage,
	ManageBookPage,
} from "@/modules/book";
import {
	LoanPage,
	ManageLoanPage,
	LoanScannerPage,
	ReturnScannerPage,
} from "@/modules/loan";
import { ManageResPage, ResPage } from "@/modules/reservation";
import { FinePage, ManageFinePage } from "@/modules/fine";
import { AuditLogPage } from "@/modules/auditlog";

export const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<OnMountLogic />}>
			<Route path="/signin" element={<SigninPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<BookIndexPage />} />
				<Route path="/book" element={<BookPage />} />

				<Route path="/" element={<RequireSignInLogic />}>
					<Route path="/bookmark" element={<BookmarkPage />} />
					<Route path="/loan" element={<LoanPage />} />
					<Route path="/loan/scanner" element={<LoanScannerPage />} />
					<Route path="/reservation" element={<ResPage />} />
					<Route path="/fine" element={<FinePage />} />

					<Route path="/manage/user" element={<ManageUserPage />} />
					<Route path="/manage/book" element={<ManageBookPage />} />
					<Route path="/manage/loan" element={<ManageLoanPage />} />
					<Route path="/manage/loan/scanner" element={<ReturnScannerPage />} />
					<Route path="/manage/reservation" element={<ManageResPage />} />
					<Route path="/manage/fine" element={<ManageFinePage />} />
					<Route path="/manage/audit_log" element={<AuditLogPage />} />
				</Route>

				<Route path="*" element={<PageNotFound />} />
			</Route>
		</Route>,
	),
);
