export const BookRoutes = {
	BASE: "book",
	AUTOCOMPLETE: {
		DYNAMIC_ROUTE: (value: string) => `autocomplete/${value}`,
	},
	BOOKMARK: {
		BASE: "bookmark",
	},
	POPULAR: {
		BASE: "popular",
	},
};
