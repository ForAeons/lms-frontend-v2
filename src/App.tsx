import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/sonner";
import { Router } from "@/router";
import { store } from "@/store";
import { AppLogic } from "@/modules";

export const App: React.FC = () => {
	return (
		<ThemeProvider
			defaultTheme="light"
			defaultColor="slate"
			storageKey="vite-ui-theme"
		>
			<LanguageProvider defaultLocale="en" storageKey="vite-language">
				<Provider store={store}>
					<Toaster closeButton />
					<AppLogic />
					<Analytics />
					<SpeedInsights />
					<RouterProvider router={Router} />
				</Provider>
			</LanguageProvider>
		</ThemeProvider>
	);
};

export default App;
