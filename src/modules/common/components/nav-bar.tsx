import React from "react";
import { useIntl } from "react-intl";
import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { useAppSelector } from "@/store";
import { LG_ICON_SIZE } from "@/constants";
import { NavbarMobileBtn } from ".";

export const NavBar: React.FC = () => {
	const person = useAppSelector((s) => s.app.person);

	const { theme, setTheme } = useTheme();
	const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

	const intl = useIntl();
	const welcome = intl.formatMessage(
		{ id: "gDMHVV", defaultMessage: "Welcome {name}" },
		{ name: person?.preferred_name ?? person?.full_name },
	);
	const toggleThemeText = intl.formatMessage({
		id: "EQpyb8",
		defaultMessage: "Toggle theme",
	});

	return (
		<nav className="w-full p-3 grid grid-cols-3 items-center">
			<div className="flex justify-start">
				<NavbarMobileBtn />
			</div>

			<h2 className="text-lg font-semibold tracking-tight truncate text-center">
				{welcome}
			</h2>

			<div className="flex justify-end">
				<div className="flex items-center px-2">
					<div className="relative flex">
						<SunIcon
							size={LG_ICON_SIZE}
							className="transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
						/>
						<MoonIcon
							size={LG_ICON_SIZE}
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
		</nav>
	);
};
