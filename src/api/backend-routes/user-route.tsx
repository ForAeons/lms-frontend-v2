import { cqToUrl } from "@/util";

export const UserRoutes = {
	BASE: "user",
	GET_CURRENT_USER: {
		ROUTE: "current",
	},
	LIST: {
		DYNAMIC_ROUTE: (q: CollectionQuery) => cqToUrl(q),
	},
	SPECIFIC_USER: {
		DYNAMIC_ROUTE: (id: number) => `${id}`,
	},
	UDPATE_USER: {
		DYNAMIC_ROUTE: (id: number) => `${id}`,
	},
	UDPATE_ROLE: {
		DYNAMIC_ROUTE: (id: number) => `${id}/role`,
	},
	AUTOCOMPLETE: {
		DYNAMIC_ROUTE: (value: string) => `autocomplete/${value}`,
	},
};
