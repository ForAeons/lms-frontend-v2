import React from "react";

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
	color: "orange",
	setColor: () => null,
};

const ThemeProviderContext =
	React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	defaultColor = "orange",
	storageKey = "vite-ui-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = React.useState<Theme>(
		() => (localStorage.getItem(`${storageKey}-mode`) as Theme) || defaultTheme,
	);
	const [color, setColor] = React.useState<Color>(
		() =>
			(localStorage.getItem(`${storageKey}-color`) as Color) || defaultColor,
	);

	React.useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	React.useEffect(() => {
		const root = window.document.documentElement;
		document.body.classList.forEach((className) => {
			if (className.match(/^theme.*/)) {
				document.body.classList.remove(className);
			}
		});

		document.body.classList.add(`theme-${color}`);
	}, [color]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(`${storageKey}-mode`, theme);
			setTheme(theme);
		},
		color,
		setColor: (color: Color) => {
			localStorage.setItem(`${storageKey}-color`, color);
			setColor(color);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = React.useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
