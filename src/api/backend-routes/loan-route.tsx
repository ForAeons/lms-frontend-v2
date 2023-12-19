import { cqToUrl } from "@/util";

export const LoanRoutes = {
	BASE: "loan",
	LIST: {
		DYNAMIC_ROUTE: (q: CollectionQuery) => cqToUrl(q),
	},
	SPECIFIC: {
		DYNAMIC_ROUTE: (loanID: number) => String(loanID),
	},
	RETURN: {
		ROUTE: "return",
	},
	RENEW: {
		ROUTE: "renew",
	},
};
