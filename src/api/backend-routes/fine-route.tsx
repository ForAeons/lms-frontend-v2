import { cqToUrl } from "@/util";

export const FineRoutes = {
	BASE: "fine",
	LIST: {
		DYNAMIC_ROUTE: (q: CollectionQuery) => cqToUrl(q),
	},
	SPECIFIC: {
		DYNAMIC_ROUTE: (fineID: number) => String(fineID),
	},
	SETTLE: {
		ROUTE: "settle",
	},
};
