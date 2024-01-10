import React from "react";

export const TanStackQueryDevtools =
	process.env.NODE_ENV === "production"
		? () => null // Render nothing in production
		: React.lazy(
				() =>
					// Lazy load in development
					import("@tanstack/react-query-devtools").then((res) => ({
						default: res.ReactQueryDevtools,
					})),
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  );
