export const UserRoutes = {
	BASE: "user",
	GET_CURRENT_USER: {
		ROUTE: "current",
	},
	UDPATE_ROLE: {
		DYNAMIC_ROUTE: (id: number) => `${id}/role`,
	},
	AUTOCOMPLETE: {
		DYNAMIC_ROUTE: (value: string) => `autocomplete/${value}`,
	},
};
