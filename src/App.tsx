import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/sonner";
import { TanStackQueryDevtools } from "@/util";
import { Router } from "@/router";
import { store } from "@/store";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 1000 * 60 * 5 },
	},
});

export const App: React.FC = () => {
	return (
		<ThemeProvider
			defaultTheme="light"
			defaultColor="slate"
			storageKey="vite-ui-theme"
		>
			<LanguageProvider defaultLocale="en" storageKey="vite-language">
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<RouterProvider router={Router} />
						<Toaster closeButton />
						<TanStackQueryDevtools initialIsOpen={false} />
						<Analytics />
						<SpeedInsights />
					</Provider>
				</QueryClientProvider>
			</LanguageProvider>
		</ThemeProvider>
	);
};

export default App;
