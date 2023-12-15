import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Router } from "./router";
import { store } from "./store";

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<RouterProvider router={Router} />
				<Toaster />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
