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
	Sun,
	Moon,
	Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/theme-provider";
import { logoutThunk, useAppDispatch, useAppSelector } from "@/store";
import { SIDEBAR_ICON_SIZE } from "@/constants";

export const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.app.user);
	const isLoggedIn = useAppSelector((s) => s.app.isLoggedIn);
	const navigate = useNavigate();

	const { theme, setTheme } = useTheme();
	const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

	return (
		<ScrollArea className="h-[100vh]">
			<nav className="space-y-4 py-4 hidden lg:block">
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight truncate">
						{user ? `Welcome ${user.person_attributes.full_name}` : "Welcome"}
					</h2>

					<div className="space-y-1">
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/")}
						>
							<Home size={SIDEBAR_ICON_SIZE} />
							<p className="ml-3">Home</p>

							<span className="sr-only">Go to Home</span>
						</Button>

						{isLoggedIn && (
							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => dispatch(logoutThunk())}
							>
								<LogInIcon size={SIDEBAR_ICON_SIZE} />
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
								<LogOutIcon size={SIDEBAR_ICON_SIZE} />
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
							<BookIcon size={SIDEBAR_ICON_SIZE} />
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
									<BookDownIcon size={SIDEBAR_ICON_SIZE} />
									<p className="ml-3">Reservation</p>
									<span className="sr-only">Reservation resources</span>
								</Button>

								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => navigate("/loan")}
								>
									<BookCheckIcon size={SIDEBAR_ICON_SIZE} />
									<p className="ml-3">Loan</p>
									<span className="sr-only">Loan resources</span>
								</Button>

								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => navigate("/fine")}
								>
									<WalletIcon size={SIDEBAR_ICON_SIZE} />
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
								<UserCogIcon size={SIDEBAR_ICON_SIZE} />
								<p className="ml-3">Manage User</p>
								<span className="sr-only">Manage user</span>
							</Button>

							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/manage_book")}
							>
								<BookKeyIcon size={SIDEBAR_ICON_SIZE} />
								<p className="ml-3">Manage Book</p>
								<span className="sr-only">Manage book</span>
							</Button>

							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/manage_reservation")}
							>
								<LibraryBigIcon size={SIDEBAR_ICON_SIZE} />
								<p className="ml-3">Manage Reservation</p>
								<span className="sr-only">Manage reservation</span>
							</Button>

							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/manage_loan")}
							>
								<HelpingHandIcon size={SIDEBAR_ICON_SIZE} />
								<p className="ml-3">Manage Loan</p>
								<span className="sr-only">Manage loan</span>
							</Button>

							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/manage_fine")}
							>
								<LandmarkIcon size={SIDEBAR_ICON_SIZE} />
								<p className="ml-3">Manage Fine</p>
								<span className="sr-only">MManage fine</span>
							</Button>
						</div>
					</div>
				)}

				<div className="px-3 mt-auto">
					<div className="w-full justify-start h-10 px-4 py-2 inline-flex items-center whitespace-nowrap rounded-md">
						<div className="relative flex">
							<Sun
								size={SIDEBAR_ICON_SIZE}
								className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							/>
							<Moon
								size={SIDEBAR_ICON_SIZE}
								className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
							/>
							<span className="sr-only">Toggle theme</span>
						</div>
						<Switch
							id="dark-mode"
							checked={theme === "dark"}
							onClick={toggleTheme}
							className="ml-3"
						/>
					</div>
				</div>
			</nav>
		</ScrollArea>
	);
};

export default Sidebar;
