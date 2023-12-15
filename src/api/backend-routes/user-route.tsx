export const UserRoutes = {
	BASE: "user",
	GET_CURRENT_USER: {
		ROUTE: "current",
	},
	SEARCH_USER: {
		DYNAMIC_ROUTE: (username: string) => `filter[username]=${username}`,
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
};
