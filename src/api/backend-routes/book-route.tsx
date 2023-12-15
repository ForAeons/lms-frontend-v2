import { Query } from "@/util";

export const BookRoutes = {
	BASE: "book",
	LIST: {
		DYNAMIC_ROUTE: (q: Query) => q.toString(),
	},
	SPECIFIC: {
		DYNAMIC_ROUTE: (bookID: number) => String(bookID),
	},
};
