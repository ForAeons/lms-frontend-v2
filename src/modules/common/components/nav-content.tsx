import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "boring-avatars";
import {
	LogInIcon,
	LogOutIcon,
	BookUserIcon,
	CircleDollarSignIcon,
	UserCogIcon,
	BookIcon,
	Sun,
	Moon,
	Home,
	LockKeyholeIcon,
	ScrollTextIcon,
	BookmarkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import {
	CheckPermission,
	signOutThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import {
	AVATAR_COLORS,
	MANAGE_BOOK_RECORDS,
	MD_ICON_SIZE,
	READ_AUDIT_LOG,
} from "@/constants";
import { LangSelectBtn } from ".";

export const NavContent: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.app.user);
	const person = useAppSelector((s) => s.app.person);
	const isLoggedIn = useAppSelector((s) => s.app.isLoggedIn);
	const canManageBookRecords = useAppSelector((s) =>
		CheckPermission(s, MANAGE_BOOK_RECORDS),
	);
	const canReadAuditLog = useAppSelector((s) =>
		CheckPermission(s, READ_AUDIT_LOG),
	);
	const navigate = useNavigate();

	const { theme, setTheme } = useTheme();
	const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

	const handleLogout = () => {
		dispatch(signOutThunk()).then(() => navigate("/signin"));
	};

	return (
		<nav className="space-y-4 py-4">
			<div className="px-3 py-2">
				<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight break-words">
					{person
						? `Welcome ${person.preferred_name ?? person.full_name}`
						: "Welcome"}
				</h2>

				{user && (
					<div className="px-4 py-2 w-fit">
						<Avatar
							size={100}
							name={user.username}
							variant="beam"
							colors={AVATAR_COLORS}
						/>
					</div>
				)}

				<div className="space-y-1">
					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={() => navigate("/")}
					>
						<Home size={MD_ICON_SIZE} />
						<p className="ml-3">Home</p>

						<span className="sr-only">Go to Home</span>
					</Button>

					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={() => navigate("/book")}
					>
						<BookIcon size={MD_ICON_SIZE} />
						<p className="ml-3">Catalogue</p>
						<span className="sr-only">Catalogue</span>
					</Button>

					{isLoggedIn && (
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={handleLogout}
						>
							<LogInIcon size={MD_ICON_SIZE} />
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
							<LogOutIcon size={MD_ICON_SIZE} />
							<p className="ml-3">Sign in</p>
							<span className="sr-only">Sign In</span>
						</Button>
					)}
				</div>
			</div>

			{isLoggedIn && (
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Resources
					</h2>

					<div className="space-y-1">
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/bookmark")}
						>
							<BookmarkIcon size={MD_ICON_SIZE} />
							<p className="ml-3">My Bookmarks</p>
							<span className="sr-only">My bookmarks</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/loan")}
						>
							<BookUserIcon size={MD_ICON_SIZE} />
							<p className="ml-3">My Loan</p>
							<span className="sr-only">Loan resources</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/reservation")}
						>
							<LockKeyholeIcon size={MD_ICON_SIZE} />
							<p className="ml-3">My Reservation</p>
							<span className="sr-only">Reservation resources</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/fine")}
						>
							<CircleDollarSignIcon size={MD_ICON_SIZE} />
							<p className="ml-3">My Fine</p>
							<span className="sr-only">Fine resources</span>
						</Button>
					</div>
				</div>
			)}

			{canManageBookRecords && (
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Admin
					</h2>

					<div className="space-y-1">
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/user")}
						>
							<UserCogIcon size={MD_ICON_SIZE} />
							<p className="ml-3">Manage User</p>
							<span className="sr-only">Manage user</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/book")}
						>
							<BookIcon size={MD_ICON_SIZE} />
							<p className="ml-3">Manage Book</p>
							<span className="sr-only">Manage book</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/loan")}
						>
							<BookUserIcon size={MD_ICON_SIZE} />
							<p className="ml-3">Manage Loan</p>
							<span className="sr-only">Manage loan</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/reservation")}
						>
							<LockKeyholeIcon size={MD_ICON_SIZE} />
							<p className="ml-3">Manage Reservation</p>
							<span className="sr-only">Manage reservation</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/fine")}
						>
							<CircleDollarSignIcon size={MD_ICON_SIZE} />
							<p className="ml-3">Manage Fine</p>
							<span className="sr-only">MManage fine</span>
						</Button>

						{canReadAuditLog && (
							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/manage/audit_log")}
							>
								<ScrollTextIcon size={MD_ICON_SIZE} />
								<p className="ml-3">Audit Log</p>
								<span className="sr-only">Audit logs</span>
							</Button>
						)}
					</div>
				</div>
			)}

			<div className="px-3 py-2">
				<div className="space-y-1">
					<LangSelectBtn />

					<div className="w-full justify-start h-10 px-4 py-2 inline-flex items-center whitespace-nowrap">
						<div className="relative flex">
							<Sun
								size={MD_ICON_SIZE}
								className="transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
							/>
							<Moon
								size={MD_ICON_SIZE}
								className="absolute transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100"
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
			</div>
		</nav>
	);
};
