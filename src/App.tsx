import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/sonner";
import { Router } from "@/router";
import { store } from "@/store";
import { AppLogic } from "@/modules";

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<LanguageProvider defaultLocale="en" storageKey="vite-language">
					<Analytics />
					<SpeedInsights />
					<AppLogic>
						<RouterProvider router={Router} />
						<Toaster />
					</AppLogic>
				</LanguageProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
