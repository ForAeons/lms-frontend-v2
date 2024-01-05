export const UserRoutes = {
	BASE: "user",
	GET_CURRENT_USER: {
		ROUTE: "current",
	},
	UDPATE_ROLE: {
		BASE: "role",
	},
	AUTOCOMPLETE: {
		BASE: "autocomplete",
		DYNAMIC_ROUTE: (value: string) => `autocomplete/${value}`,
	},
};
