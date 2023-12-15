import React from "react";
import { useNavigate } from "react-router-dom";
import {
	LogInIcon,
	LogOutIcon,
	BookIcon,
	BookDownIcon,
	WalletIcon,
	BookCheckIcon,
	UserCogIcon,
	BookKeyIcon,
	LibraryBigIcon,
	LandmarkIcon,
	HelpingHandIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutThunk, useAppDispatch, useAppSelector } from "@/store";

export const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((s) => s.app.isLoggedIn);
	const navigate = useNavigate();

	return (
		<nav className="space-y-4 py-4 hidden lg:block col-span-1">
			<div className="px-3 py-2">
				<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
					Account
				</h2>

				<div className="space-y-1">
					{isLoggedIn && (
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => dispatch(logoutThunk())}
						>
							<LogInIcon height={16} />
							<p className="ml-3">Sign Out</p>
							<span className="sr-only">Sign Out</span>
						</Button>
					)}

					{!isLoggedIn && (
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/signin")}
						>
							<LogOutIcon height={16} />
							<p className="ml-3">Sign in</p>
							<span className="sr-only">Sign In</span>
						</Button>
					)}
				</div>
			</div>

			<div className="px-3 py-2">
				<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
					Resources
				</h2>

				<div className="space-y-1">
					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={() => navigate("/book")}
					>
						<BookIcon height={16} />
						<p className="ml-3">Book</p>
						<span className="sr-only">Book resources</span>
					</Button>

					{isLoggedIn && (
						<>
							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/reservation")}
							>
								<BookDownIcon height={16} />
								<p className="ml-3">Reservation</p>
								<span className="sr-only">Reservation resources</span>
							</Button>

							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/loan")}
							>
								<BookCheckIcon height={16} />
								<p className="ml-3">Loan</p>
								<span className="sr-only">Loan resources</span>
							</Button>

							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/fine")}
							>
								<WalletIcon height={16} />
								<p className="ml-3">Fine</p>
								<span className="sr-only">Fine resources</span>
							</Button>
						</>
					)}
				</div>
			</div>

			{isLoggedIn && (
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Admin
					</h2>

					<div className="space-y-1">
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage_user")}
						>
							<UserCogIcon height={16} />
							<p className="ml-3">Manage User</p>
							<span className="sr-only">Manage user</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage_book")}
						>
							<BookKeyIcon height={16} />
							<p className="ml-3">Manage Book</p>
							<span className="sr-only">Manage book</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage_reservation")}
						>
							<LibraryBigIcon height={16} />
							<p className="ml-3">Manage Reservation</p>
							<span className="sr-only">Manage reservation</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage_loan")}
						>
							<HelpingHandIcon height={16} />
							<p className="ml-3">Manage Loan</p>
							<span className="sr-only">Manage loan</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage_fine")}
						>
							<LandmarkIcon height={16} />
							<p className="ml-3">Manage Fine</p>
							<span className="sr-only">MManage fine</span>
						</Button>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Sidebar;
