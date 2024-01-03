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
import { useTranslations } from "@/hooks";
import { ColorSelectBtn, LangSelectBtn } from ".";

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

	const { theme, setTheme } = useTheme();
	const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(signOutThunk()).then(() => navigate("/signin"));
	};

	const translate = useTranslations();
	const welcome = translate["gDMHVV"]({
		name: person?.preferred_name ?? person?.full_name ?? "",
	});
	const homePage = translate["xHJnaY"]();
	const catalogue = translate["U2napd"]();
	const signOut = translate["F62y+K"]();
	const signIn = translate["Ub+AGc"]();
	const resources = translate["c/KktL"]();
	const myBookmark = translate["X9bISG"]();
	const myLoan = translate["InakXV"]();
	const myReservation = translate["r3JtGI"]();
	const myFine = translate["UPVRty"]();
	const admin = translate["iHN12u"]();
	const manageUser = translate["55dcAt"]();
	const manageBook = translate["RTM+tQ"]();
	const manageLoan = translate["zrW7b6"]();
	const manageReservation = translate["eujWGK"]();
	const manageFine = translate["pWbzFs"]();
	const auditLog = translate["7GrpT1"]();
	const settings = translate["D3idYv"]();
	const toggleThemeText = translate["EQpyb8"]();

	return (
		<nav className="space-y-4 py-4">
			<div className="px-3 py-2">
				<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight break-words">
					{welcome}
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
						<p className="ml-3">{homePage}</p>

						<span className="sr-only">{homePage}</span>
					</Button>

					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={() => navigate("/book")}
					>
						<BookIcon size={MD_ICON_SIZE} />
						<p className="ml-3">{catalogue}</p>
						<span className="sr-only">{catalogue}</span>
					</Button>

					{isLoggedIn && (
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={handleLogout}
						>
							<LogInIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{signOut}</p>
							<span className="sr-only">{signOut}</span>
						</Button>
					)}

					{!isLoggedIn && (
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/signin")}
						>
							<LogOutIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{signIn}</p>
							<span className="sr-only">{signIn}</span>
						</Button>
					)}
				</div>
			</div>

			{isLoggedIn && (
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						{resources}
					</h2>

					<div className="space-y-1">
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/bookmark")}
						>
							<BookmarkIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{myBookmark}</p>
							<span className="sr-only">{myBookmark}</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/loan")}
						>
							<BookUserIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{myLoan}</p>
							<span className="sr-only">{myLoan}</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/reservation")}
						>
							<LockKeyholeIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{myReservation}</p>
							<span className="sr-only">{myReservation}</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/fine")}
						>
							<CircleDollarSignIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{myFine}</p>
							<span className="sr-only">{myFine}</span>
						</Button>
					</div>
				</div>
			)}

			{canManageBookRecords && (
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						{admin}
					</h2>

					<div className="space-y-1">
						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/user")}
						>
							<UserCogIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{manageUser}</p>
							<span className="sr-only">{manageUser}</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/book")}
						>
							<BookIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{manageBook}</p>
							<span className="sr-only">{manageBook}</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/loan")}
						>
							<BookUserIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{manageLoan}</p>
							<span className="sr-only">{manageLoan}</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/reservation")}
						>
							<LockKeyholeIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{manageReservation}</p>
							<span className="sr-only">{manageReservation}</span>
						</Button>

						<Button
							variant="ghost"
							className="w-full justify-start"
							onClick={() => navigate("/manage/fine")}
						>
							<CircleDollarSignIcon size={MD_ICON_SIZE} />
							<p className="ml-3">{manageFine}</p>
							<span className="sr-only">{manageFine}</span>
						</Button>

						{canReadAuditLog && (
							<Button
								variant="ghost"
								className="w-full justify-start"
								onClick={() => navigate("/manage/audit_log")}
							>
								<ScrollTextIcon size={MD_ICON_SIZE} />
								<p className="ml-3">{auditLog}</p>
								<span className="sr-only">{auditLog}</span>
							</Button>
						)}
					</div>
				</div>
			)}

			<div className="px-3 py-2">
				<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
					{settings}
				</h2>

				<div className="space-y-1">
					<LangSelectBtn />

					<ColorSelectBtn />

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
							<span className="sr-only">{toggleThemeText}</span>
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
