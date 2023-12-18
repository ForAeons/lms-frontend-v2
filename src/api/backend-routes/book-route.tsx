import { cqToUrl } from "@/util";

export const BookRoutes = {
	BASE: "book",
	LIST: {
		DYNAMIC_ROUTE: (q: CollectionQuery) => cqToUrl(q),
	},
	SPECIFIC: {
		DYNAMIC_ROUTE: (bookID: number) => String(bookID),
	},
};
