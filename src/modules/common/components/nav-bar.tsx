import React from "react";
import { NavbarMobileBtn } from ".";
import { LG_ICON_SIZE } from "@/constants";
import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { useAppSelector } from "@/store";

export const NavBar: React.FC = () => {
	const user = useAppSelector((s) => s.app.user);

	const { theme, setTheme } = useTheme();
	const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

	return (
		<nav className="w-full lg:hidden p-3 grid grid-cols-3 items-center">
			<div className="flex justify-start">
				<NavbarMobileBtn />
			</div>

			<h2 className="text-lg font-semibold tracking-tight truncate text-center">
				{user ? `Welcome ${user.person_attributes.full_name}` : "Welcome"}
			</h2>

			<div className="flex justify-end">
				<div className="flex items-center">
					<div className="relative flex">
						<SunIcon
							size={LG_ICON_SIZE}
							className="transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
						/>
						<MoonIcon
							size={LG_ICON_SIZE}
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
		</nav>
	);
};
