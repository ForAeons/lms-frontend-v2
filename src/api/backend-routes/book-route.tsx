import { cqToUrl } from "@/util";

export const BookRoutes = {
	BASE: "book",
	LIST: {
		DYNAMIC_ROUTE: (q: CollectionQuery) => cqToUrl(q),
	},
	SPECIFIC: {
		DYNAMIC_ROUTE: (bookID: number) => String(bookID),
	},
	AUTOCOMPLETE: {
		DYNAMIC_ROUTE: (value: string) => `autocomplete/${value}`,
	},
};
