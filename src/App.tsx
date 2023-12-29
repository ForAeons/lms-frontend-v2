import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Router } from "./router";
import { store } from "./store";
import { AppLogic } from "./modules";

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<AppLogic />
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<RouterProvider router={Router} />
				<Toaster />
			</ThemeProvider>
			<Analytics />
		</Provider>
	);
};

export default App;
