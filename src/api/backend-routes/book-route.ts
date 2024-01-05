export const BookRoutes = {
	BASE: "book",
	AUTOCOMPLETE: {
		ROUTE: "autocomplete",
		DYNAMIC_ROUTE: (value: string) => `autocomplete/${value}`,
	},
	BOOKMARK: {
		ROUTE: "bookmark",
	},
	POPULAR: {
		ROUTE: "popular",
	},
};
